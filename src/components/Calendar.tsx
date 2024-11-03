import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';

export default function Calendar() {
  const [selected, setSelected] = useState<Date>();
  const [horario, setHorario] = useState('');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const API_URL = 'http://localhost:3000/api';

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !horario || !nombre || !email) return;

    setCargando(true);
    setMensaje('');

    try {
      const respuesta = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: format(selected, 'yyyy-MM-dd'),
          time: horario,
          name: nombre,
          email: email,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const datos = await respuesta.json();

      if (datos.success) {
        setMensaje('¡Cita agendada con éxito! Revisa tu correo para más detalles.');
        setSelected(undefined);
        setHorario('');
        setNombre('');
        setEmail('');
      } else {
        setMensaje(datos.error || 'Error al agendar la cita. Por favor intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMensaje('Error al conectar con el servidor. Por favor intenta más tarde.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <section id="calendar" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Agenda una Cita</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              locale={es}
              className="border rounded-lg p-4"
              disabled={{ before: new Date() }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <form onSubmit={manejarEnvio} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Horario Disponible
                </label>
                <select
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Selecciona un horario</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                </select>
              </div>
              {mensaje && (
                <div className={`p-3 rounded ${mensaje.includes('éxito') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {mensaje}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={cargando || !selected || !horario || !nombre || !email}
              >
                {cargando ? 'Agendando...' : 'Agendar Cita'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}