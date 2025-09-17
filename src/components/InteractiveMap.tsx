import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface CoverageLayer {
  id: string;
  name: string;
  type: '4G' | '5G' | 'fiber' | 'wireless';
  enabled: boolean;
  color: string;
  zones: CoverageZone[];
}

interface CoverageZone {
  id: string;
  name: string;
  signal: 'excellent' | 'good' | 'fair' | 'poor';
  speed: string;
  path: string;
}

interface SearchResult {
  address: string;
  coordinates: { lat: number; lng: number };
  coverage: {
    '4G': { available: boolean; signal: string; speed: string };
    '5G': { available: boolean; signal: string; speed: string };
    fiber: { available: boolean; speed: string };
    wireless: { available: boolean; speed: string };
  };
}

const InteractiveMap = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{ x: number; y: number } | null>(null);
  const [layers, setLayers] = useState<CoverageLayer[]>([
    {
      id: '4g',
      name: '4G покрытие',
      type: '4G',
      enabled: true,
      color: '#00C853',
      zones: [
        { id: '4g-moscow', name: 'Москва центр', signal: 'excellent', speed: '100 Мбит/с', path: 'M180,120 L260,120 L260,180 L180,180 Z' },
        { id: '4g-suburbs', name: 'Пригороды', signal: 'good', speed: '50 Мбит/с', path: 'M120,80 L350,80 L380,100 L390,160 L370,240 L120,240 Z' },
        { id: '4g-outskirts', name: 'Окраины', signal: 'fair', speed: '20 Мбит/с', path: 'M80,60 L420,60 L450,300 L80,300 Z' }
      ]
    },
    {
      id: '5g',
      name: '5G покрытие',
      type: '5G',
      enabled: true,
      color: '#FF4081',
      zones: [
        { id: '5g-center', name: 'Москва центр', signal: 'excellent', speed: '1 Гбит/с', path: 'M190,130 L250,130 L250,170 L190,170 Z' },
        { id: '5g-business', name: 'Деловые центры', signal: 'good', speed: '500 Мбит/с', path: 'M160,100 L280,100 L280,200 L160,200 Z' }
      ]
    },
    {
      id: 'fiber',
      name: 'Оптоволокно',
      type: 'fiber',
      enabled: false,
      color: '#2196F3',
      zones: [
        { id: 'fiber-moscow', name: 'Москва', signal: 'excellent', speed: '1 Гбит/с', path: 'M170,110 L270,110 L270,190 L170,190 Z' },
        { id: 'fiber-cities', name: 'Крупные города', signal: 'excellent', speed: '500 Мбит/с', path: 'M100,70 L150,70 L150,120 L100,120 Z M300,70 L350,70 L350,120 L300,120 Z M150,220 L200,220 L200,270 L150,270 Z' }
      ]
    }
  ]);

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  const handleSearch = async () => {
    if (!searchAddress.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          address: 'Москва, ул. Тверская, 1',
          coordinates: { lat: 55.7558, lng: 37.6176 },
          coverage: {
            '4G': { available: true, signal: 'отличный', speed: '100 Мбит/с' },
            '5G': { available: true, signal: 'отличный', speed: '1 Гбит/с' },
            fiber: { available: true, speed: '1 Гбит/с' },
            wireless: { available: true, speed: '300 Мбит/с' }
          }
        },
        {
          address: 'Мытищи, ул. Мира, 10',
          coordinates: { lat: 55.9116, lng: 37.7307 },
          coverage: {
            '4G': { available: true, signal: 'хороший', speed: '50 Мбит/с' },
            '5G': { available: false, signal: '', speed: '' },
            fiber: { available: false, speed: '' },
            wireless: { available: true, speed: '100 Мбит/с' }
          }
        },
        {
          address: 'Подольск, ул. Ленина, 5',
          coordinates: { lat: 55.4297, lng: 37.5447 },
          coverage: {
            '4G': { available: true, signal: 'удовлетворительный', speed: '20 Мбит/с' },
            '5G': { available: false, signal: '', speed: '' },
            fiber: { available: false, speed: '' },
            wireless: { available: true, speed: '50 Мбит/с' }
          }
        }
      ];

      const result = mockResults.find(point => 
        point.address.toLowerCase().includes(searchAddress.toLowerCase().split(',')[0])
      ) || mockResults[0];

      setSearchResult(result);
      setSelectedPoint({ x: 220, y: 150 });
      setIsSearching(false);
    }, 1500);
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#FF9800';
      case 'fair': return '#FF5722';
      case 'poor': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getSignalBars = (signal: string) => {
    switch (signal) {
      case 'excellent': return 4;
      case 'good': return 3;
      case 'fair': return 2;
      case 'poor': return 1;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Поиск */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MapPin" size={20} />
            Проверка покрытия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <Input
              placeholder="Введите адрес или населенный пункт"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !searchAddress.trim()}
              className="px-6"
            >
              {isSearching ? (
                <Icon name="Loader2" size={16} className="animate-spin" />
              ) : (
                'Проверить'
              )}
            </Button>
          </div>

          {/* Результат поиска */}
          {searchResult && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-3">{searchResult.address}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(searchResult.coverage).map(([tech, data]) => (
                  <div key={tech} className="text-center">
                    <div className="text-sm font-medium mb-1">{tech.toUpperCase()}</div>
                    {data.available ? (
                      <div className="space-y-1">
                        <div className="flex justify-center">
                          {tech.includes('G') && (
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4].map((bar) => (
                                <div
                                  key={bar}
                                  className={`w-1 h-3 rounded-sm ${
                                    bar <= getSignalBars(data.signal) 
                                      ? 'bg-green-500' 
                                      : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {data.speed}
                        </Badge>
                        {data.signal && (
                          <div className="text-xs text-muted-foreground">
                            {data.signal}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Недоступно
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">Подключиться</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Карта с контролами */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Боковая панель с слоями */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Слои покрытия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: layer.color }}
                  />
                  <Label htmlFor={layer.id} className="text-sm">
                    {layer.name}
                  </Label>
                </div>
                <Switch
                  id={layer.id}
                  checked={layer.enabled}
                  onCheckedChange={() => toggleLayer(layer.id)}
                />
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Легенда сигнала</h4>
              <div className="space-y-2">
                {[
                  { label: 'Отличный', color: '#4CAF50', bars: 4 },
                  { label: 'Хороший', color: '#FF9800', bars: 3 },
                  { label: 'Удовлетворительный', color: '#FF5722', bars: 2 },
                  { label: 'Слабый', color: '#F44336', bars: 1 }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs">{item.label}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((bar) => (
                        <div
                          key={bar}
                          className={`w-1 h-2 rounded-sm`}
                          style={{
                            backgroundColor: bar <= item.bars ? item.color : '#E0E0E0'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Основная карта */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Map" size={20} />
              Карта покрытия Московская область
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
              <svg
                width="100%"
                height="500"
                viewBox="0 0 500 400"
                className="border rounded-lg"
              >
                {/* Фон карты */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                  </pattern>
                  
                  {/* Градиенты для зон покрытия */}
                  <radialGradient id="excellentGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.8"/>
                    <stop offset="70%" stopColor="#4CAF50" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.1"/>
                  </radialGradient>
                  
                  <radialGradient id="goodGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF9800" stopOpacity="0.6"/>
                    <stop offset="70%" stopColor="#FF9800" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#FF9800" stopOpacity="0.1"/>
                  </radialGradient>

                  <radialGradient id="fairGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF5722" stopOpacity="0.4"/>
                    <stop offset="70%" stopColor="#FF5722" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#FF5722" stopOpacity="0.1"/>
                  </radialGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#grid)"/>

                {/* Контур Московской области */}
                <path
                  d="M80,80 L180,60 L280,70 L380,90 L420,140 L410,220 L380,280 L320,320 L220,340 L140,320 L80,280 L60,200 L70,140 Z"
                  fill="#ffffff"
                  stroke="#ccc"
                  strokeWidth="2"
                />

                {/* Отображение активных слоев покрытия */}
                {layers
                  .filter(layer => layer.enabled)
                  .map((layer) => (
                    <g key={layer.id}>
                      {layer.zones.map((zone) => (
                        <g key={zone.id}>
                          <path
                            d={zone.path}
                            fill={`url(#${zone.signal}Gradient)`}
                            stroke={layer.color}
                            strokeWidth="1"
                            opacity="0.7"
                            className="hover:opacity-90 transition-opacity cursor-pointer"
                          />
                        </g>
                      ))}
                    </g>
                  ))}

                {/* Города и населенные пункты */}
                <g>
                  {/* Москва */}
                  <circle cx="220" cy="150" r="6" fill="#dc2626" stroke="#fff" strokeWidth="2"/>
                  <text x="230" y="155" className="text-xs font-semibold fill-gray-700">Москва</text>
                  
                  {/* Мытищи */}
                  <circle cx="240" cy="120" r="3" fill="#666" stroke="#fff" strokeWidth="1"/>
                  <text x="245" y="125" className="text-xs fill-gray-600">Мытищи</text>
                  
                  {/* Подольск */}
                  <circle cx="200" cy="200" r="3" fill="#666" stroke="#fff" strokeWidth="1"/>
                  <text x="205" y="205" className="text-xs fill-gray-600">Подольск</text>
                  
                  {/* Химки */}
                  <circle cx="200" cy="130" r="3" fill="#666" stroke="#fff" strokeWidth="1"/>
                  <text x="155" y="135" className="text-xs fill-gray-600">Химки</text>
                  
                  {/* Королёв */}
                  <circle cx="260" cy="140" r="3" fill="#666" stroke="#fff" strokeWidth="1"/>
                  <text x="265" y="145" className="text-xs fill-gray-600">Королёв</text>
                  
                  {/* Люберцы */}
                  <circle cx="250" cy="170" r="3" fill="#666" stroke="#fff" strokeWidth="1"/>
                  <text x="255" y="175" className="text-xs fill-gray-600">Люберцы</text>
                </g>

                {/* Маркер результата поиска */}
                {selectedPoint && (
                  <g>
                    <circle
                      cx={selectedPoint.x}
                      cy={selectedPoint.y}
                      r="8"
                      fill="#2563eb"
                      stroke="#fff"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                    <circle
                      cx={selectedPoint.x}
                      cy={selectedPoint.y}
                      r="16"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-ping"
                    />
                  </g>
                )}

                {/* Базовые станции */}
                <g>
                  {[
                    { x: 220, y: 150, type: '5G' },
                    { x: 200, y: 130, type: '4G' },
                    { x: 240, y: 120, type: '4G' },
                    { x: 250, y: 170, type: '4G' },
                    { x: 200, y: 200, type: '4G' },
                    { x: 180, y: 100, type: '4G' },
                    { x: 300, y: 140, type: '4G' }
                  ].map((station, index) => (
                    <g key={index}>
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r="2"
                        fill={station.type === '5G' ? '#FF4081' : '#00C853'}
                      />
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r="8"
                        fill="none"
                        stroke={station.type === '5G' ? '#FF4081' : '#00C853'}
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    </g>
                  ))}
                </g>
              </svg>

              {/* Масштаб и навигация */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                  <Icon name="Plus" size={16} />
                </Button>
                <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                  <Icon name="Minus" size={16} />
                </Button>
              </div>

              {/* Координаты курсора */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded px-2 py-1 text-xs">
                55.7558° N, 37.6176° E
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;