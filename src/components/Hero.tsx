import { Github, Linkedin, Mail, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
          alt="Perfil"
          className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-white"
        />
        <h1 className="text-5xl font-bold mb-4">Juan Pérez</h1>
        <p className="text-xl mb-8">Desarrollador Full Stack & Consultor Digital</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-blue-300 transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="hover:text-blue-300 transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="#" className="hover:text-blue-300 transition-colors">
            <Mail size={24} />
          </a>
          <a href="#calendar" className="hover:text-blue-300 transition-colors">
            <Calendar size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}