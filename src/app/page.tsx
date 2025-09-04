import Header from '@/components/Header';
import DesignGallery from '@/components/DesignGallery';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      <main>
        <DesignGallery />
      </main>
      
      {/* Footer simples */}
      <footer className="bg-gray-100 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2024 Bobyegoods - Desenhos para Colorir 🎨
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Feito com ❤️ para estimular a criatividade
          </p>
        </div>
      </footer>
    </div>
  );
}