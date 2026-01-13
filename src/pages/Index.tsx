import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface Report {
  id: string;
  date: string;
  title: string;
  tasks: string;
  achievements: string;
  plans: string;
  hours: number;
  driver_name?: string;
  vehicle_number?: string;
  loading_place?: string;
  unloading_place?: string;
  material_name?: string;
  weight?: number;
  trips_count?: number;
  mileage?: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      date: '2026-01-12',
      title: 'Внедрение новой функции',
      tasks: 'Разработка модуля аутентификации',
      achievements: 'Реализован JWT токен, настроена база данных',
      plans: 'Тестирование системы входа',
      hours: 8
    },
    {
      id: '2',
      date: '2026-01-11',
      title: 'Исправление критических ошибок',
      tasks: 'Анализ багов в продакшене',
      achievements: 'Исправлено 5 критических багов',
      plans: 'Оптимизация производительности',
      hours: 7
    }
  ]);

  const [newReport, setNewReport] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    driver_name: '',
    vehicle_number: '',
    loading_place: '',
    unloading_place: '',
    material_name: '',
    weight: 0,
    trips_count: 0,
    mileage: 0,
    tasks: '',
    achievements: '',
    plans: '',
    hours: 8
  });

  const handleCreateReport = () => {
    if (!newReport.title || !newReport.tasks) {
      return;
    }

    const report: Report = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newReport
    };

    setReports([report, ...reports]);
    setNewReport({
      date: new Date().toISOString().split('T')[0],
      title: '',
      driver_name: '',
      vehicle_number: '',
      loading_place: '',
      unloading_place: '',
      material_name: '',
      weight: 0,
      trips_count: 0,
      mileage: 0,
      tasks: '',
      achievements: '',
      plans: '',
      hours: 8
    });
  };

  const totalHours = reports.reduce((sum, r) => sum + r.hours, 0);
  const avgHours = reports.length > 0 ? (totalHours / reports.length).toFixed(1) : 0;
  const thisWeekReports = reports.filter(r => {
    const reportDate = new Date(r.date);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return reportDate >= weekAgo && reportDate <= today;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-heading font-bold text-foreground">
              Ежедневные отчёты
            </h1>
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Icon name="User" size={24} />
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="text-muted-foreground text-lg">
            Отслеживайте свою продуктивность и достижения каждый день
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-card border shadow-sm">
            <TabsTrigger value="create" className="gap-2">
              <Icon name="PenSquare" size={18} />
              Отчёт
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Icon name="History" size={18} />
              История
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" size={18} />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="Settings" size={18} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6 animate-fade-in">
            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="FileText" size={24} className="text-primary" />
                  Создать новый отчёт
                </CardTitle>
                <CardDescription>
                  Заполните информацию о проделанной работе за сегодня
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-base font-medium">
                      Дата
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newReport.date}
                      onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="driver_name" className="text-base font-medium">
                      ФИО водителя
                    </Label>
                    <Input
                      id="driver_name"
                      placeholder="Иванов Иван Иванович"
                      value={newReport.driver_name}
                      onChange={(e) => setNewReport({ ...newReport, driver_name: e.target.value })}
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle_number" className="text-base font-medium">
                    Номер Т/С
                  </Label>
                  <Input
                    id="vehicle_number"
                    placeholder="А123БВ777"
                    value={newReport.vehicle_number}
                    onChange={(e) => setNewReport({ ...newReport, vehicle_number: e.target.value })}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Заголовок отчёта
                  </Label>
                  <Input
                    id="title"
                    placeholder="Краткое описание работы"
                    value={newReport.title}
                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                    className="text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="loading_place" className="text-base font-medium">
                      Место погрузки
                    </Label>
                    <Input
                      id="loading_place"
                      placeholder="Склад №1, г. Москва"
                      value={newReport.loading_place}
                      onChange={(e) => setNewReport({ ...newReport, loading_place: e.target.value })}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unloading_place" className="text-base font-medium">
                      Место выгрузки
                    </Label>
                    <Input
                      id="unloading_place"
                      placeholder="Объект №5, г. Санкт-Петербург"
                      value={newReport.unloading_place}
                      onChange={(e) => setNewReport({ ...newReport, unloading_place: e.target.value })}
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="material_name" className="text-base font-medium">
                    Наименование материала
                  </Label>
                  <Input
                    id="material_name"
                    placeholder="Щебень гранитный фракция 5-20"
                    value={newReport.material_name}
                    onChange={(e) => setNewReport({ ...newReport, material_name: e.target.value })}
                    className="text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-base font-medium">
                      Вес (тонн)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="15.5"
                      value={newReport.weight}
                      onChange={(e) => setNewReport({ ...newReport, weight: parseFloat(e.target.value) || 0 })}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="trips_count" className="text-base font-medium">
                      Количество рейсов
                    </Label>
                    <Input
                      id="trips_count"
                      type="number"
                      min="0"
                      placeholder="3"
                      value={newReport.trips_count}
                      onChange={(e) => setNewReport({ ...newReport, trips_count: parseInt(e.target.value) || 0 })}
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mileage" className="text-base font-medium">
                      Километраж (км)
                    </Label>
                    <Input
                      id="mileage"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="250.5"
                      value={newReport.mileage}
                      onChange={(e) => setNewReport({ ...newReport, mileage: parseFloat(e.target.value) || 0 })}
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tasks" className="text-base font-medium">
                    Выполненные задачи
                  </Label>
                  <Textarea
                    id="tasks"
                    placeholder="Опишите задачи, над которыми работали..."
                    value={newReport.tasks}
                    onChange={(e) => setNewReport({ ...newReport, tasks: e.target.value })}
                    rows={3}
                    className="text-base resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="achievements" className="text-base font-medium">
                    Достижения
                  </Label>
                  <Textarea
                    id="achievements"
                    placeholder="Что удалось достичь..."
                    value={newReport.achievements}
                    onChange={(e) => setNewReport({ ...newReport, achievements: e.target.value })}
                    rows={2}
                    className="text-base resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plans" className="text-base font-medium">
                    Планы на завтра
                  </Label>
                  <Textarea
                    id="plans"
                    placeholder="Что планируете сделать завтра..."
                    value={newReport.plans}
                    onChange={(e) => setNewReport({ ...newReport, plans: e.target.value })}
                    rows={2}
                    className="text-base resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours" className="text-base font-medium">
                    Отработано часов
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    max="24"
                    value={newReport.hours}
                    onChange={(e) => setNewReport({ ...newReport, hours: parseInt(e.target.value) || 0 })}
                    className="text-base w-32"
                  />
                </div>

                <Button
                  onClick={handleCreateReport}
                  size="lg"
                  className="w-full mt-6 text-base font-medium"
                  disabled={!newReport.title || !newReport.tasks}
                >
                  <Icon name="Save" size={20} className="mr-2" />
                  Сохранить отчёт
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="Clock" size={24} className="text-primary" />
                  История отчётов
                </CardTitle>
                <CardDescription>
                  Всего отчётов: {reports.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <Card key={report.id} className="transition-all hover:shadow-md border-border/50">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-xl font-heading">{report.title}</CardTitle>
                              <CardDescription className="flex items-center gap-2">
                                <Icon name="Calendar" size={14} />
                                {new Date(report.date).toLocaleDateString('ru-RU', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary" className="gap-1">
                              <Icon name="Clock" size={14} />
                              {report.hours}ч
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          {(report.driver_name || report.vehicle_number) && (
                            <div className="grid grid-cols-2 gap-3">
                              {report.driver_name && (
                                <div>
                                  <p className="font-medium text-muted-foreground mb-1">Водитель:</p>
                                  <p className="text-foreground">{report.driver_name}</p>
                                </div>
                              )}
                              {report.vehicle_number && (
                                <div>
                                  <p className="font-medium text-muted-foreground mb-1">Номер Т/С:</p>
                                  <p className="text-foreground">{report.vehicle_number}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {report.trips_count && (
                            <div>
                              <p className="font-medium text-muted-foreground mb-1">Количество рейсов:</p>
                              <p className="text-foreground">{report.trips_count}</p>
                            </div>
                          )}
                          
                          {(report.loading_place || report.unloading_place) && (
                            <div className="grid grid-cols-2 gap-3">
                              {report.loading_place && (
                                <div>
                                  <p className="font-medium text-muted-foreground mb-1">Погрузка:</p>
                                  <p className="text-foreground">{report.loading_place}</p>
                                </div>
                              )}
                              {report.unloading_place && (
                                <div>
                                  <p className="font-medium text-muted-foreground mb-1">Выгрузка:</p>
                                  <p className="text-foreground">{report.unloading_place}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {report.material_name && (
                            <div>
                              <p className="font-medium text-muted-foreground mb-1">Материал:</p>
                              <p className="text-foreground">{report.material_name}</p>
                            </div>
                          )}

                          {(report.weight || report.mileage) && (
                            <div className="grid grid-cols-2 gap-3">
                              {report.weight && (
                                <div>
                                  <p className="font-medium text-muted-foreground mb-1">Вес:</p>
                                  <p className="text-foreground">{report.weight} т</p>
                                </div>
                              )}
                              {report.mileage && (
                                <div>
                                  <p className="font-medium text-muted-foreground mb-1">Километраж:</p>
                                  <p className="text-foreground">{report.mileage} км</p>
                                </div>
                              )}
                            </div>
                          )}

                          <div>
                            <p className="font-medium text-muted-foreground mb-1">Задачи:</p>
                            <p className="text-foreground">{report.tasks}</p>
                          </div>
                          {report.achievements && (
                            <div>
                              <p className="font-medium text-muted-foreground mb-1">Достижения:</p>
                              <p className="text-foreground">{report.achievements}</p>
                            </div>
                          )}
                          {report.plans && (
                            <div>
                              <p className="font-medium text-muted-foreground mb-1">Планы:</p>
                              <p className="text-foreground">{report.plans}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="shadow-lg border-border/50">
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm">Всего отчётов</CardDescription>
                  <CardTitle className="text-4xl font-heading">{reports.length}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="FileText" size={16} />
                    За всё время
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-border/50">
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm">Отчётов за неделю</CardDescription>
                  <CardTitle className="text-4xl font-heading">{thisWeekReports}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="TrendingUp" size={16} />
                    Последние 7 дней
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-border/50">
                <CardHeader className="pb-3">
                  <CardDescription className="text-sm">Средняя нагрузка</CardDescription>
                  <CardTitle className="text-4xl font-heading">{avgHours}ч</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    Часов в день
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="Activity" size={24} className="text-primary" />
                  Еженедельная активность
                </CardTitle>
                <CardDescription>
                  Количество отработанных часов по дням
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.slice(0, 7).map((report) => (
                  <div key={report.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">
                        {new Date(report.date).toLocaleDateString('ru-RU', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        })}
                      </span>
                      <Badge variant="outline">{report.hours} часов</Badge>
                    </div>
                    <Progress value={(report.hours / 12) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="Target" size={24} className="text-primary" />
                  Цели и достижения
                </CardTitle>
                <CardDescription>
                  Ваш прогресс за текущий период
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Еженедельная цель: 40 часов</span>
                    <span className="text-muted-foreground">
                      {reports.slice(0, 7).reduce((sum, r) => sum + r.hours, 0)}/40ч
                    </span>
                  </div>
                  <Progress 
                    value={(reports.slice(0, 7).reduce((sum, r) => sum + r.hours, 0) / 40) * 100} 
                    className="h-3"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Отчётов в этом месяце</span>
                    <span className="text-muted-foreground">{reports.length}/20</span>
                  </div>
                  <Progress 
                    value={(reports.length / 20) * 100} 
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="User" size={24} className="text-primary" />
                  Профиль
                </CardTitle>
                <CardDescription>
                  Управление личными данными и настройками
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      ИФ
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-heading font-semibold">Иван Фёдоров</h3>
                    <p className="text-muted-foreground">Frontend разработчик</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Отдел</Label>
                    <Input id="department" placeholder="Разработка" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="Bell" size={24} className="text-primary" />
                  Уведомления
                </CardTitle>
                <CardDescription>
                  Настройте напоминания о создании отчётов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-medium">Ежедневные напоминания</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомление в конце рабочего дня
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Настроить
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-border/50">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-2">
                  <Icon name="Download" size={24} className="text-primary" />
                  Экспорт данных
                </CardTitle>
                <CardDescription>
                  Выгрузите отчёты в удобном формате
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Icon name="FileText" size={18} />
                  Экспорт в PDF
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Icon name="Sheet" size={18} />
                  Экспорт в Excel
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;