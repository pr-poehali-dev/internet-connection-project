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
      name: 'Старт',
      speed: '100 Мбит/с',
      price: '1490',
      description: 'Оптимальный вариант для серфинга, мессенджеров, социальных сетей и просмотра видео в HD.',
      features: ['Безлимитный трафик', 'Wi-Fi роутер в аренду', 'Техподдержка']
    },
    {
      name: 'Продвинутый',
      speed: '150 Мбит/с',
      price: '1990',
      description: 'Для активного использования интернета: потоковое видео в Full HD, онлайн-игры, работа из дома.',
      features: ['Безлимитный трафик', 'Wi-Fi роутер в подарок', 'Приоритетная поддержка', 'Статический IP']
    },
    {
      name: 'Премиум',
      speed: '240 Мбит/с',
      price: '2590',
      description: 'Высокая скорость для больших потоков данных: 4K видео, видеоконференции, стриминг, умный дом и все устройства одновременно.',
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
              <a href="#services" className="text-sm font-medium hover:text-success transition-colors">Услуги</a>
              <a href="#tariffs" className="text-sm font-medium hover:text-success transition-colors">Тарифы</a>
              <a href="#coverage" className="text-sm font-medium hover:text-success transition-colors">Покрытие</a>
              <a href="#about" className="text-sm font-medium hover:text-success transition-colors">О компании</a>
              <a href="#contacts" className="text-sm font-medium hover:text-success transition-colors">Контакты</a>
            </nav>
            <Button>Подключиться</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Высокоскоростной интернет в Московской области
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Подключение к сети интернет для частных лиц и бизнеса через беспроводные каналы связи, включая спутниковый интернет
            </p>
            


            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 bg-success/10 text-success border-success/20">
                <Icon name="Zap" size={16} className="mr-2" />
                До 1 Гбит/с
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-success/10 text-success border-success/20">
                <Icon name="Shield" size={16} className="mr-2" />
                99% надежность
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 bg-success/10 text-success border-success/20">
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
                    <Icon name={service.icon} size={24} className="text-success" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Icon name="Check" size={16} className="text-success mr-2 flex-shrink-0" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Тарифная политика NetConnect</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
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
                  <div className="flex items-center justify-center mb-4">
                    <Icon name={tariff.name === 'Премиум' ? 'Zap' : 'Wifi'} size={24} className="text-success mr-2" />
                    <span className="font-semibold">до {tariff.speed}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tariff.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tariff.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Icon name="Check" size={16} className="text-success mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-left text-muted-foreground space-y-4">
            <p>
              В компании NetConnect тарифы на интернет-подключение разрабатываются с учетом разнообразия условий подключения в различных районах Московской области и ближайших регионов, включая частные дома и дачи. Все представленные тарифные планы носят примерный характер, поскольку доступ к услугам различных операторов может отличаться, и реальные параметры скорости или стоимости могут немного варьироваться в зависимости от места подключения.
            </p>
            <p>
              Особое внимание мы уделяем спутниковому интернету, который является критически важным для подключения интернет на даче, в загородных домах и удалённых объектах, где традиционные сети недоступны или нестабильны. Тарифы на спутниковый интернет подбираются индивидуально под конкретные задачи клиента, исходя из особенностей его объекта и требований к надежности соединения.
            </p>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Примеры индивидуальных задач для спутникового интернета:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Icon name="Camera" size={16} className="text-success mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Системы видеонаблюдения и охраны объектов</strong> — круглосуточная передача данных без перебоев, чтобы обеспечить постоянный контроль и оперативное реагирование.</span>
                </li>
                <li className="flex items-start">
                  <Icon name="AlertTriangle" size={16} className="text-success mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Системы пожаротушения и датчики безопасности</strong> — бесперебойная передача сигналов датчиков, предотвращение ложных срабатываний и своевременное уведомление служб экстренной помощи.</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Shield" size={16} className="text-success mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Датчики проникновения и умный дом</strong> — надежное соединение для автоматизации процессов и удаленного управления системами безопасности.</span>
                </li>
                <li className="flex items-start">
                  <Icon name="Building" size={16} className="text-success mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Критически важные корпоративные задачи</strong> — резервное подключение для обеспечения работы офисов, филиалов и удаленных объектов в условиях перебоев связи.</span>
                </li>
              </ul>
            </div>
            <p>
              Благодаря резервному подключению через спутниковый интернет, наши клиенты получают защиту от глушения и перебоев сигнала, что обеспечивает постоянную онлайн-связь и стабильный поток данных даже в экстремальных условиях.
            </p>
            <p>
              Таким образом, тарифы NetConnect позволяют клиентам гибко выбирать оптимальное решение для подключения интернет на даче, подключения интернет в Подмосковье и подключения интернет в Московской области, сочетая скорость, надежность и стоимость в зависимости от конкретного расположения объекта и его потребностей. Наш подход обеспечивает максимальную стабильность работы интернета, вне зависимости от условий и задач, которые стоят перед пользователем.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section id="coverage" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Карта покрытия высокоскоростного интернета в Московской области</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы предоставляем доступ к высокоскоростному интернету в различных районах Московской области, включая крупные города, пригороды и удалённые населённые пункты.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-card border rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Основные регионы и города <span className="text-muted-foreground text-lg">(список минимальный, для примера)</span></h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                {[
                  'Москва', 'Подольск', 'Красногорск', 'Химки', 'Мытищи', 'Люберцы',
                  'Домодедово', 'Сергиев Посад', 'Коломна', 'Пушкино', 'Зеленоград', 'Щёлково',
                  'Видное', 'Дубна', 'Истра', 'Орехово-Зуево', 'Клин', 'Фрязино',
                  'Лобня', 'Ногинск', 'Реутов', 'Красноармейск', 'Дмитров', 'Серпухов',
                  'Егорьевск', 'Лыткарино', 'Солнечногорск', 'Жуковский', 'Старая Купавна'
                ].map((city) => (
                  <div key={city} className="bg-accent/30 rounded-lg p-3 border">
                    <div className="flex items-center justify-center">
                      <Icon name="MapPin" size={16} className="text-success mr-2" />
                      <span className="font-medium">{city}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted/50 border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <Icon name="Info" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong>Обратите внимание:</strong> полную карту покрытия мы не публикуем, так как в разных районах существуют различные тарифные зоны, а также разный уровень приема связи и сигналов, который может незначительно отличаться от места к месту.
                  </p>
                  <p>
                    На самом деле, покрытие осуществляется по всей территории Московской области, поэтому даже на самой удаленной даче или на удаленном складе связь работает.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border-2 border-primary/20 rounded-lg p-8">
              <div className="text-center">
                <Icon name="Phone" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Получите персональную консультацию</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Для получения подробной информации о качестве и скорости работы сети конкретно на вашем объекте, рекомендуем обратиться по телефону. Наши специалисты в индивидуальном режиме предоставят развернутую консультацию и помогут подобрать оптимальный тариф.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <div className="bg-card border rounded-lg p-4 flex items-center space-x-3">
                    <Icon name="Phone" size={24} className="text-success" />
                    <div className="text-left">
                      <div className="font-semibold text-lg">+7 (901) 500-00-78</div>
                      <div className="text-sm text-muted-foreground">Основная линия</div>
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-4 flex items-center space-x-3">
                    <Icon name="Phone" size={24} className="text-success" />
                    <div className="text-left">
                      <div className="font-semibold text-lg">+7 (901) 500-00-87</div>
                      <div className="text-sm text-muted-foreground">Дополнительная линия</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Консультации и подключение • 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">О компании NetConnect</h2>
            <div className="text-lg text-muted-foreground mb-8 leading-relaxed space-y-4 text-left">
              <p>
                NetConnect — это ваш надежный партнер в мире современных телекоммуникаций. Мы предоставляем быстрый, стабильный и безопасный интернет для жителей Московской области и ближайших регионов, обеспечивая удобное подключение как для частных пользователей, так и для бизнеса любого масштаба.
              </p>
              <p>
                Мы используем передовые беспроводные технологии и спутниковый интернет, чтобы гарантировать доступ к сети даже в труднодоступных районах. Благодаря инновационным решениям наши клиенты получают высокую скорость соединения и непрерывный доступ к интернету, независимо от погодных условий или технических ограничений локальных сетей.
              </p>
              <p>
                Особое преимущество NetConnect — эффективная защита от глушения интернет-сигнала. Мы внедряем резервное подключение через спутниковый интернет, что обеспечивает постоянную онлайн-связь даже при попытках блокировки сигнала или перебоях в локальных сетях.
              </p>
              <p>
                С NetConnect вы получаете не просто интернет, а современное, надежное и адаптированное под ваши потребности решение связи, позволяющее работать, учиться и развлекаться без ограничений.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">5+</div>
                <div className="text-muted-foreground">лет на рынке</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">10000+</div>
                <div className="text-muted-foreground">довольных клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">99%</div>
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
                <div className="space-y-1">
                  <p className="text-muted-foreground">+7 (901) 500-00-78</p>
                  <p className="text-muted-foreground">+7 (901) 500-00-87</p>
                </div>
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