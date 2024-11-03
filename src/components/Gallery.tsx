export default function Gallery() {
  const proyectos = [
    {
      titulo: "Proyecto 1",
      imagen: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400",
      descripcion: "Desarrollo web full stack"
    },
    {
      titulo: "Proyecto 2",
      imagen: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400",
      descripcion: "Aplicación móvil"
    },
    {
      titulo: "Proyecto 3",
      imagen: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&h=400",
      descripcion: "Consultoría digital"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Mi Trabajo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img src={proyecto.imagen} alt={proyecto.titulo} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{proyecto.titulo}</h3>
                <p className="text-gray-600">{proyecto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}