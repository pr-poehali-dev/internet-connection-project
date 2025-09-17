import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CoverageZone {
  id: string;
  name: string;
  type: 'fiber' | 'wireless' | 'satellite';
  quality: 'excellent' | 'good' | 'basic';
  coordinates: { x: number; y: number; width: number; height: number };
}

interface MapPoint {
  x: number;
  y: number;
  address: string;
  coverage: boolean;
  type?: 'fiber' | 'wireless' | 'satellite';
  speed?: string;
}

const InteractiveMap = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedZone, setSelectedZone] = useState<CoverageZone | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchResult, setSearchResult] = useState<MapPoint | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<SVGSVGElement>(null);

  // Данные зон покрытия (имитация реальных данных)
  const coverageZones: CoverageZone[] = [
    {
      id: '1',
      name: 'Центральный округ Москвы',
      type: 'fiber',
      quality: 'excellent',
      coordinates: { x: 180, y: 120, width: 80, height: 60 }
    },
    {
      id: '2', 
      name: 'Мытищи',
      type: 'wireless',
      quality: 'excellent',
      coordinates: { x: 200, y: 80, width: 60, height: 40 }
    },
    {
      id: '3',
      name: 'Подольск',
      type: 'wireless',
      quality: 'good',
      coordinates: { x: 160, y: 200, width: 70, height: 50 }
    },
    {
      id: '4',
      name: 'Сергиев Посад',
      type: 'satellite',
      quality: 'basic',
      coordinates: { x: 280, y: 60, width: 50, height: 45 }
    },
    {
      id: '5',
      name: 'Коломна',
      type: 'satellite',
      quality: 'good',
      coordinates: { x: 320, y: 180, width: 60, height: 40 }
    },
    {
      id: '6',
      name: 'Химки',
      type: 'fiber',
      quality: 'excellent',
      coordinates: { x: 160, y: 90, width: 45, height: 35 }
    }
  ];

  const getZoneColor = (type: string, quality: string) => {
    const baseColors = {
      fiber: '#2563eb',
      wireless: '#059669', 
      satellite: '#dc2626'
    };
    
    const opacity = {
      excellent: '0.8',
      good: '0.6',
      basic: '0.4'
    };

    return baseColors[type as keyof typeof baseColors] + 
           (opacity[quality as keyof typeof opacity] || '0.5');
  };

  const filteredZones = filterType === 'all' 
    ? coverageZones 
    : coverageZones.filter(zone => zone.type === filterType);

  const handleSearch = async () => {
    if (!searchAddress.trim()) return;
    
    setIsSearching(true);
    
    // Имитация поиска адреса
    setTimeout(() => {
      const mockResults: MapPoint[] = [
        { x: 220, y: 140, address: 'Москва, ул. Тверская, 1', coverage: true, type: 'fiber', speed: '1000 Мбит/с' },
        { x: 180, y: 160, address: 'Москва, Красная площадь, 1', coverage: true, type: 'fiber', speed: '1000 Мбит/с' },
        { x: 230, y: 100, address: 'Мытищи, ул. Мира, 10', coverage: true, type: 'wireless', speed: '300 Мбит/с' },
        { x: 190, y: 220, address: 'Подольск, ул. Ленина, 5', coverage: true, type: 'wireless', speed: '300 Мбит/с' },
        { x: 350, y: 250, address: 'Раменское, ул. Гурьева, 3', coverage: false }
      ];

      const result = mockResults.find(point => 
        point.address.toLowerCase().includes(searchAddress.toLowerCase().split(',')[0])
      ) || mockResults[0];

      setSearchResult(result);
      setIsSearching(false);
    }, 1500);
  };

  const handleZoneClick = (zone: CoverageZone) => {
    setSelectedZone(zone);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fiber': return 'Cable';
      case 'wireless': return 'Wifi';
      case 'satellite': return 'Satellite';
      default: return 'MapPin';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fiber': return 'Оптоволокно';
      case 'wireless': return 'Беспроводная связь';
      case 'satellite': return 'Спутниковый интернет';
      default: return type;
    }
  };

  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'Отличное';
      case 'good': return 'Хорошее';
      case 'basic': return 'Базовое';
      default: return quality;
    }
  };

  return (
    <div className="space-y-6">
      {/* Поиск и фильтры */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Search" size={20} />
            Поиск покрытия по адресу
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Введите адрес (например: Москва, Тверская)"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={isSearching || !searchAddress.trim()}>
                  {isSearching ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Search" size={16} />
                  )}
                </Button>
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы подключения</SelectItem>
                <SelectItem value="fiber">Оптоволокно</SelectItem>
                <SelectItem value="wireless">Беспроводная связь</SelectItem>
                <SelectItem value="satellite">Спутниковый интернет</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Результат поиска */}
          {searchResult && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{searchResult.address}</h4>
                  {searchResult.coverage ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Icon name="Check" size={14} className="mr-1" />
                        Покрытие доступно
                      </Badge>
                      {searchResult.type && (
                        <Badge variant="outline">
                          <Icon name={getTypeIcon(searchResult.type)} size={14} className="mr-1" />
                          {getTypeLabel(searchResult.type)}
                        </Badge>
                      )}
                      {searchResult.speed && (
                        <Badge variant="outline">
                          <Icon name="Zap" size={14} className="mr-1" />
                          {searchResult.speed}
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <Badge variant="destructive" className="mt-2">
                      <Icon name="X" size={14} className="mr-1" />
                      Покрытие недоступно
                    </Badge>
                  )}
                </div>
                <Button size="sm">Подключиться</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Карта */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Map" size={20} />
            Карта покрытия Московской области
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* SVG карта */}
            <svg
              ref={mapRef}
              width="100%"
              height="400"
              viewBox="0 0 500 320"
              className="border rounded-lg bg-gradient-to-br from-slate-50 to-blue-50"
            >
              {/* Фон карты (контуры Московской области) */}
              <path
                d="M100 100 L120 80 L160 70 L200 75 L240 65 L280 70 L320 80 L360 90 L380 120 L390 160 L385 200 L370 240 L350 270 L320 285 L280 290 L240 285 L200 280 L160 275 L120 260 L100 220 L95 180 L100 140 Z"
                fill="#e2e8f0"
                stroke="#94a3b8"
                strokeWidth="2"
                className="opacity-60"
              />
              
              {/* Москва (центр) */}
              <circle
                cx="200"
                cy="150"
                r="8"
                fill="#dc2626"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="210" y="155" className="text-xs font-semibold fill-slate-700">
                Москва
              </text>

              {/* Зоны покрытия */}
              {filteredZones.map((zone) => (
                <g key={zone.id}>
                  <rect
                    x={zone.coordinates.x}
                    y={zone.coordinates.y}
                    width={zone.coordinates.width}
                    height={zone.coordinates.height}
                    fill={getZoneColor(zone.type, zone.quality)}
                    stroke="#ffffff"
                    strokeWidth="1"
                    rx="4"
                    className="cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleZoneClick(zone)}
                  />
                  <text
                    x={zone.coordinates.x + zone.coordinates.width / 2}
                    y={zone.coordinates.y + zone.coordinates.height / 2}
                    textAnchor="middle"
                    className="text-xs fill-white font-medium pointer-events-none"
                  >
                    {zone.name}
                  </text>
                </g>
              ))}

              {/* Результат поиска на карте */}
              {searchResult && (
                <g>
                  <circle
                    cx={searchResult.x}
                    cy={searchResult.y}
                    r="6"
                    fill={searchResult.coverage ? "#22c55e" : "#ef4444"}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <circle
                    cx={searchResult.x}
                    cy={searchResult.y}
                    r="12"
                    fill="none"
                    stroke={searchResult.coverage ? "#22c55e" : "#ef4444"}
                    strokeWidth="2"
                    opacity="0.5"
                    className="animate-ping"
                  />
                </g>
              )}
            </svg>

            {/* Легенда */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg">
              <h4 className="text-sm font-semibold mb-2">Типы подключения:</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-3 rounded" style={{ backgroundColor: getZoneColor('fiber', 'excellent') }}></div>
                  <Icon name="Cable" size={12} />
                  <span>Оптоволокно</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-3 rounded" style={{ backgroundColor: getZoneColor('wireless', 'excellent') }}></div>
                  <Icon name="Wifi" size={12} />
                  <span>Беспроводная связь</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-4 h-3 rounded" style={{ backgroundColor: getZoneColor('satellite', 'excellent') }}></div>
                  <Icon name="Satellite" size={12} />
                  <span>Спутниковый интернет</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Информация о выбранной зоне */}
      {selectedZone && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Icon name={getTypeIcon(selectedZone.type)} size={20} />
                {selectedZone.name}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedZone(null)}>
                <Icon name="X" size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-semibold text-sm text-muted-foreground">Тип подключения</h5>
                <p className="flex items-center gap-1">
                  <Icon name={getTypeIcon(selectedZone.type)} size={16} />
                  {getTypeLabel(selectedZone.type)}
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-sm text-muted-foreground">Качество сигнала</h5>
                <p>{getQualityLabel(selectedZone.quality)}</p>
              </div>
              <div>
                <h5 className="font-semibold text-sm text-muted-foreground">Максимальная скорость</h5>
                <p>
                  {selectedZone.type === 'fiber' ? '1000 Мбит/с' :
                   selectedZone.type === 'wireless' ? '300 Мбит/с' : '100 Мбит/с'}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button>Подключиться в этой зоне</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveMap;