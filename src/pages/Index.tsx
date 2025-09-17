import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';


const Index = () => {
  const [address, setAddress] = useState('');
  const [checkingCoverage, setCheckingCoverage] = useState(false);

  const handleCoverageCheck = () => {
    setCheckingCoverage(true);
    setTimeout(() => {
      setCheckingCoverage(false);
    }, 2000);
  };

  const services = [
    {
      icon: 'Wifi',
      title: 'Интернет-подключение',
      description: 'Высокоскоростной интернет до 1 Гбит/с через беспроводные технологии',
      features: ['До 1000 Мбит/с', 'Стабильное соединение', '24/7 поддержка']
    },
    {
      icon: 'Satellite',
      title: 'Спутниковый интернет',
      description: 'Надежное покрытие в отдаленных районах Московской области',
      features: ['Покрытие 99%', 'Низкая задержка', 'Защита от помех']
    },
    {
      icon: 'Router',
      title: 'Wi-Fi оборудование',
      description: 'Установка и настройка Wi-Fi сетей, усиление сигнала',
      features: ['Профессиональная установка', 'Настройка роуминга', 'Усиление сигнала']
    },
    {
      icon: 'Video',
      title: 'Видеонаблюдение',
      description: 'Системы безопасности с удаленным доступом и записью',
      features: ['HD качество', 'Облачное хранение', 'Мобильное приложение']
    },
    {
      icon: 'Shield',
      title: 'Системы охраны',
      description: 'Автоматизированные системы безопасности и контроля доступа',
      features: ['Датчики движения', 'Контроль доступа', 'Уведомления в реальном времени']
    },
    {
      icon: 'Signal',
      title: 'Усиление сотовой связи',
      description: 'Репитеры и усилители сигнала для стабильной мобильной связи',
      features: ['Все операторы', 'Увеличение зоны покрытия', 'Простая установка']
    }
  ];

  const tariffs = [
    {
      name: 'Базовый',
      speed: '100 Мбит/с',
      price: '990',
      features: ['Безлимитный трафик', 'Wi-Fi роутер в аренду', 'Техподдержка']
    },
    {
      name: 'Оптимальный',
      speed: '300 Мбит/с',
      price: '1490',
      features: ['Безлимитный трафик', 'Wi-Fi роутер в подарок', 'Приоритетная поддержка', 'Статический IP']
    },
    {
      name: 'Максимальный',
      speed: '1000 Мбит/с',
      price: '2490',
      features: ['Безлимитный трафик', 'Профессиональное оборудование', 'VIP поддержка', 'Статический IP', 'Резервный канал']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Satellite" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-primary">NetConnect</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
              <a href="#tariffs" className="text-sm font-medium hover:text-primary transition-colors">Тарифы</a>
              <a href="#coverage" className="text-sm font-medium hover:text-primary transition-colors">Покрытие</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button>Подключиться</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Высокоскоростной интернет в Московской области
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Подключение к сети интернет для частных лиц и бизнеса через беспроводные каналы связи, включая спутниковый интернет
            </p>
            
            {/* Coverage Check */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex gap-3">
                <Input
                  placeholder="Введите ваш адрес"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleCoverageCheck}
                  disabled={checkingCoverage || !address}
                  className="px-6"
                >
                  {checkingCoverage ? (
                    <Icon name="Loader2" size={16} className="animate-spin" />
                  ) : (
                    <Icon name="Search" size={16} />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Проверьте возможность подключения по вашему адресу
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Icon name="Zap" size={16} className="mr-2" />
                До 1 Гбит/с
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Icon name="Shield" size={16} className="mr-2" />
                99% надежность
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Icon name="Clock" size={16} className="mr-2" />
                24/7 поддержка
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр телекоммуникационных услуг для дома и бизнеса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-scale-in">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Icon name="Check" size={16} className="text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tariffs Section */}
      <section id="tariffs" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Тарифные планы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите оптимальный тариф для ваших потребностей
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tariffs.map((tariff, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${index === 1 ? 'border-primary shadow-lg scale-105' : ''}`}>
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="px-4 py-1">Популярный</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{tariff.name}</CardTitle>
                  <div className="py-4">
                    <div className="text-4xl font-bold text-primary">{tariff.price}</div>
                    <div className="text-sm text-muted-foreground">₽/месяц</div>
                  </div>
                  <div className="text-lg font-semibold text-secondary">{tariff.speed}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tariff.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Icon name="Check" size={16} className="text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                    Выбрать тариф
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section id="coverage" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Зона покрытия</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Карта покрытия нашей сети в Московской области и соседних регионах
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Map" size={64} className="text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Карта покрытия</h3>
                    <p className="text-muted-foreground mb-4">
                      Проверка покрытия доступна по телефону +7 (495) 123-45-67
                    </p>
                    <Button>Узнать о покрытии</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">О компании NetConnect</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Мы специализируемся на предоставлении высококачественных телекоммуникационных услуг 
              в Московской области и ближайших регионах. Наша компания использует передовые беспроводные 
              технологии, включая спутниковый интернет, для обеспечения стабильного и быстрого подключения 
              как для частных лиц, так и для бизнес-объектов.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">лет на рынке</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10000+</div>
                <div className="text-muted-foreground">довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                <div className="text-muted-foreground">время безотказной работы</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами для подключения или консультации
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Icon name="Phone" size={32} className="text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Icon name="Mail" size={32} className="text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">info@netconnect.ru</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Icon name="MapPin" size={32} className="text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">г. Москва, ул. Тверская, 1</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Icon name="Clock" size={32} className="text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Режим работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Satellite" size={24} className="text-primary" />
              <span className="text-lg font-semibold">NetConnect</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 NetConnect. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;