'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { designsData } from '@/lib/designs-data';

interface PrintOptions {
  size: string;
  orientation: string;
  quality: string;
  paperType: string;
  copies: number;
}

export default function PrintConfigPage() {
  const params = useParams();
  const router = useRouter();
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    size: 'A4',
    orientation: 'portrait',
    quality: 'normal',
    paperType: 'regular',
    copies: 1
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
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

  const handlePrintSubmit = async () => {
    setIsProcessing(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`Pedido de impressão enviado com sucesso!
    
Desenho: ${design.name}
Tamanho: ${printOptions.size}
Orientação: ${printOptions.orientation === 'portrait' ? 'Retrato' : 'Paisagem'}
Qualidade: ${printOptions.quality}
Papel: ${printOptions.paperType}
Cópias: ${printOptions.copies}

Seu pedido será processado em breve! 🎨`);
    
    setIsProcessing(false);
    router.push('/');
  };

  const estimatedTime = printOptions.quality === 'draft' ? '2-3 min' : 
                       printOptions.quality === 'normal' ? '5-8 min' : '10-15 min';
  
  const estimatedCost = (printOptions.copies * 
    (printOptions.size === 'A3' ? 3 : 2) * 
    (printOptions.quality === 'high' ? 1.5 : 1) *
    (printOptions.paperType === 'photo' ? 2 : 1)).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Botão Voltar */}
        <Button 
          variant="outline" 
          onClick={() => router.push(`/design/${design.id}`)}
          className="mb-6 hover:bg-purple-50"
        >
          ← Voltar aos Detalhes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview da Impressão */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🖨️ Preview da Impressão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <div 
                  className={`relative mx-auto border-2 border-gray-300 bg-white ${
                    printOptions.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  } ${printOptions.size === 'A3' ? 'max-w-md' : 'max-w-sm'}`}
                >
                  <Image
                    src={design.imageUrl}
                    alt={`Preview - ${design.name}`}
                    fill
                    className="object-contain p-2"
                    sizes="400px"
                  />
                </div>
                
                <div className="text-center mt-4 space-y-2">
                  <h3 className="font-semibold">{design.name}</h3>
                  <div className="text-sm text-gray-600">
                    <span>{printOptions.size} • </span>
                    <span>{printOptions.orientation === 'portrait' ? 'Retrato' : 'Paisagem'} • </span>
                    <span>{printOptions.quality === 'draft' ? 'Rascunho' : 
                           printOptions.quality === 'normal' ? 'Normal' : 'Alta Qualidade'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Impressão */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Configurações de Impressão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tamanho */}
                <div className="space-y-2">
                  <Label htmlFor="size">Tamanho do Papel</Label>
                  <Select 
                    value={printOptions.size} 
                    onValueChange={(value) => setPrintOptions({...printOptions, size: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4 (21 x 29,7 cm)</SelectItem>
                      <SelectItem value="A3">A3 (29,7 x 42 cm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Orientação */}
                <div className="space-y-2">
                  <Label htmlFor="orientation">Orientação</Label>
                  <Select 
                    value={printOptions.orientation} 
                    onValueChange={(value) => setPrintOptions({...printOptions, orientation: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">📄 Retrato (Vertical)</SelectItem>
                      <SelectItem value="landscape">📄 Paisagem (Horizontal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Qualidade */}
                <div className="space-y-2">
                  <Label htmlFor="quality">Qualidade de Impressão</Label>
                  <Select 
                    value={printOptions.quality} 
                    onValueChange={(value) => setPrintOptions({...printOptions, quality: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">🏃 Rascunho (Rápido)</SelectItem>
                      <SelectItem value="normal">⚡ Normal (Recomendado)</SelectItem>
                      <SelectItem value="high">⭐ Alta Qualidade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tipo de Papel */}
                <div className="space-y-2">
                  <Label htmlFor="paperType">Tipo de Papel</Label>
                  <Select 
                    value={printOptions.paperType} 
                    onValueChange={(value) => setPrintOptions({...printOptions, paperType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">📄 Papel Comum (75g/m²)</SelectItem>
                      <SelectItem value="photo">📸 Papel Fotográfico</SelectItem>
                      <SelectItem value="special">✨ Papel Especial (180g/m²)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quantidade */}
                <div className="space-y-2">
                  <Label htmlFor="copies">Número de Cópias</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={printOptions.copies}
                    onChange={(e) => setPrintOptions({...printOptions, copies: parseInt(e.target.value) || 1})}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Resumo do Pedido */}
            <Card>
              <CardHeader>
                <CardTitle>📋 Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Tempo estimado:</span>
                    <span className="font-medium">⏱️ {estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custo estimado:</span>
                    <span className="font-medium">💰 R$ {estimatedCost}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Desenho:</span>
                    <span>{design.name}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Configuração:</span>
                    <span>{printOptions.size} • {printOptions.copies} cópia(s)</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg py-6"
                  onClick={handlePrintSubmit}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>⏳ Processando...</>
                  ) : (
                    <>🖨️ Confirmar Impressão</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}