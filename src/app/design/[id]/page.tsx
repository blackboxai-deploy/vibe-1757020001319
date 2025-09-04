'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { designsData } from '@/lib/designs-data';

export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [imageScale, setImageScale] = useState(1);
  
  const design = designsData.find(d => d.id === params.id);

  if (!design) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Desenho não encontrado</h2>
            <Button onClick={() => router.push('/')}>
              Voltar à Galeria
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const complexityLabels = {
    easy: 'Fácil',
    medium: 'Médio', 
    hard: 'Difícil'
  };

  const complexityColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botão Voltar */}
        <Button 
          variant="outline" 
          onClick={() => router.push('/')}
          className="mb-6 hover:bg-purple-50"
        >
          ← Voltar à Galeria
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visualizador de Imagem */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-white">
                <div 
                  className="relative overflow-hidden"
                  style={{ minHeight: '500px' }}
                >
                  <Image
                    src={design.imageUrl}
                    alt={design.name}
                    fill
                    className="object-contain transition-transform duration-300"
                    style={{ transform: `scale(${imageScale})` }}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                
                {/* Controles de Zoom */}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setImageScale(Math.max(0.5, imageScale - 0.25))}
                    disabled={imageScale <= 0.5}
                  >
                    🔍−
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setImageScale(1)}
                  >
                    100%
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setImageScale(Math.min(3, imageScale + 0.25))}
                    disabled={imageScale >= 3}
                  >
                    🔍+
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações do Desenho */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{design.name}</CardTitle>
                  <Badge className={`${complexityColors[design.complexity]} text-white`}>
                    {complexityLabels[design.complexity]}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-gray-600">{design.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Categoria</h3>
                  <Badge variant="outline" className="text-sm">
                    {design.category}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {design.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Dicas para Colorir</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use lápis de cor ou canetinhas</li>
                    <li>• Comece pelas bordas e depois preencha</li>
                    <li>• Experimente diferentes combinações de cores</li>
                    <li>• Seja criativo e divirta-se! 🎨</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                onClick={() => router.push(`/print/${design.id}`)}
              >
                🖨️ Imprimir Este Desenho
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="hover:bg-purple-50">
                  💾 Salvar Favorito
                </Button>
                <Button variant="outline" className="hover:bg-purple-50">
                  📤 Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}