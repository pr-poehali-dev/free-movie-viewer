import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface User {
  email: string;
  name: string;
  settings: {
    theme: 'light' | 'dark';
    language: 'ru' | 'en';
    fontSize: 'sm' | 'base' | 'lg';
  };
}

interface Movie {
  id: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;
  year: number;
  rating: number;
  duration: string;
  category: string;
  videoUrl: string;
}

const translations = {
  ru: {
    search: 'Поиск фильмов...',
    home: 'Главная',
    history: 'История',
    profile: 'Профиль',
    settings: 'Настройки',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    trending: 'Популярное',
    categories: 'Категории',
    action: 'Боевики',
    drama: 'Драмы',
    comedy: 'Комедии',
    scifi: 'Фантастика',
    thriller: 'Триллеры',
    theme: 'Тема',
    language: 'Язык',
    fontSize: 'Размер шрифта',
    dark: 'Тёмная',
    light: 'Светлая',
    small: 'Маленький',
    medium: 'Средний',
    large: 'Большой',
    email: 'Email',
    password: 'Пароль',
    name: 'Имя',
    signIn: 'Войти',
    signUp: 'Создать аккаунт',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    noAccount: 'Нет аккаунта?',
    watchHistory: 'История просмотров',
    noHistory: 'Вы ещё ничего не смотрели',
    year: 'год',
    rating: 'Рейтинг',
    play: 'Смотреть',
    close: 'Закрыть',
  },
  en: {
    search: 'Search movies...',
    home: 'Home',
    history: 'History',
    profile: 'Profile',
    settings: 'Settings',
    login: 'Login',
    register: 'Sign Up',
    logout: 'Logout',
    trending: 'Trending Now',
    categories: 'Categories',
    action: 'Action',
    drama: 'Drama',
    comedy: 'Comedy',
    scifi: 'Sci-Fi',
    thriller: 'Thriller',
    theme: 'Theme',
    language: 'Language',
    fontSize: 'Font Size',
    dark: 'Dark',
    light: 'Light',
    small: 'Small',
    medium: 'Medium',
    large: 'Large',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    watchHistory: 'Watch History',
    noHistory: "You haven't watched anything yet",
    year: 'year',
    rating: 'Rating',
    play: 'Watch',
    close: 'Close',
  }
};

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Космическая одиссея',
    titleEn: 'Space Odyssey',
    description: 'Эпическое путешествие через галактику',
    descriptionEn: 'Epic journey across the galaxy',
    thumbnail: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800',
    year: 2023,
    rating: 8.5,
    duration: '2ч 15м',
    category: 'scifi',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 2,
    title: 'Последний герой',
    titleEn: 'The Last Hero',
    description: 'Битва за будущее человечества',
    descriptionEn: 'Battle for the future of humanity',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    year: 2024,
    rating: 9.1,
    duration: '2ч 30м',
    category: 'action',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 3,
    title: 'Тени прошлого',
    titleEn: 'Shadows of the Past',
    description: 'Психологический триллер о памяти',
    descriptionEn: 'Psychological thriller about memory',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    year: 2023,
    rating: 8.3,
    duration: '1ч 55м',
    category: 'thriller',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 4,
    title: 'Смех сквозь слёзы',
    titleEn: 'Laughter Through Tears',
    description: 'Трогательная комедия о жизни',
    descriptionEn: 'Touching comedy about life',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    year: 2024,
    rating: 7.8,
    duration: '1ч 40м',
    category: 'comedy',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 5,
    title: 'Путь домой',
    titleEn: 'The Way Home',
    description: 'Драма о семейных ценностях',
    descriptionEn: 'Drama about family values',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    year: 2023,
    rating: 8.9,
    duration: '2ч 5м',
    category: 'drama',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
  },
  {
    id: 6,
    title: 'Квантовый скачок',
    titleEn: 'Quantum Leap',
    description: 'Научная фантастика о параллельных мирах',
    descriptionEn: 'Sci-fi about parallel worlds',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800',
    year: 2024,
    rating: 8.7,
    duration: '2ч 20м',
    category: 'scifi',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  }
];

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'history' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showSettings, setShowSettings] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [watchHistory, setWatchHistory] = useState<number[]>([]);
  
  const [settings, setSettings] = useState({
    theme: 'dark' as 'light' | 'dark',
    language: 'ru' as 'ru' | 'en',
    fontSize: 'base' as 'sm' | 'base' | 'lg'
  });

  const t = translations[settings.language];

  useEffect(() => {
    const savedUser = localStorage.getItem('streamUser');
    const savedSettings = localStorage.getItem('streamSettings');
    const savedHistory = localStorage.getItem('watchHistory');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.settings) {
        setSettings(parsedUser.settings);
      }
    }
    if (savedSettings && !savedUser) {
      setSettings(JSON.parse(savedSettings));
    }
    if (savedHistory) {
      setWatchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  useEffect(() => {
    if (user) {
      const updatedUser = { ...user, settings };
      localStorage.setItem('streamUser', JSON.stringify(updatedUser));
    } else {
      localStorage.setItem('streamSettings', JSON.stringify(settings));
    }
  }, [settings, user]);

  const handleAuth = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string || email.split('@')[0];
    
    const newUser: User = {
      email,
      name,
      settings
    };
    
    setUser(newUser);
    localStorage.setItem('streamUser', JSON.stringify(newUser));
    setShowAuthDialog(false);
    toast.success(authMode === 'login' ? t.signIn : t.signUp);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('streamUser');
    setCurrentPage('home');
    toast.success(t.logout);
  };

  const handlePlayMovie = (movie: Movie) => {
    setCurrentMovie(movie);
    setShowPlayer(true);
    
    if (!watchHistory.includes(movie.id)) {
      const newHistory = [movie.id, ...watchHistory];
      setWatchHistory(newHistory);
      localStorage.setItem('watchHistory', JSON.stringify(newHistory));
    }
  };

  const filteredMovies = mockMovies.filter(movie => {
    const matchesSearch = settings.language === 'ru' 
      ? movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      : movie.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const historyMovies = mockMovies.filter(movie => watchHistory.includes(movie.id));

  return (
    <div className={`min-h-screen bg-background transition-all duration-300 font-size-${settings.fontSize}`}>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                StreamFlix
              </h1>
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setCurrentPage('home')}
                  className={`transition-colors ${currentPage === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {t.home}
                </button>
                <button
                  onClick={() => setCurrentPage('history')}
                  className={`transition-colors ${currentPage === 'history' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {t.history}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-[200px] lg:w-[300px]"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(true)}
              >
                <Icon name="Settings" size={20} />
              </Button>

              {user ? (
                <button onClick={() => setCurrentPage('profile')}>
                  <Avatar className="hover:ring-2 ring-primary transition-all cursor-pointer">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      {user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              ) : (
                <Button onClick={() => setShowAuthDialog(true)} variant="default">
                  {t.login}
                </Button>
              )}
            </div>
          </div>

          <div className="sm:hidden mt-3">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className="animate-fade-in"
              >
                {t.trending}
              </Button>
              {['action', 'drama', 'comedy', 'scifi', 'thriller'].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className="animate-fade-in"
                >
                  {t[cat as keyof typeof t]}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMovies.map((movie, index) => (
                <div
                  key={movie.id}
                  className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handlePlayMovie(movie)}
                >
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={movie.thumbnail}
                      alt={settings.language === 'ru' ? movie.title : movie.titleEn}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <Button size="sm" className="w-full gap-2">
                          <Icon name="Play" size={16} />
                          {t.play}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {settings.language === 'ru' ? movie.title : movie.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {settings.language === 'ru' ? movie.description : movie.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{movie.year} {t.year}</span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Icon name="Star" size={14} fill="currentColor" />
                        <span>{movie.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'history' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{t.watchHistory}</h2>
            {historyMovies.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Icon name="Film" size={64} className="mx-auto mb-4 opacity-50" />
                <p>{t.noHistory}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {historyMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="group relative rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => handlePlayMovie(movie)}
                  >
                    <div className="aspect-[2/3] relative overflow-hidden">
                      <img
                        src={movie.thumbnail}
                        alt={settings.language === 'ru' ? movie.title : movie.titleEn}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">
                        {settings.language === 'ru' ? movie.title : movie.titleEn}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === 'profile' && user && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-3xl">
                    {user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="destructive" className="w-full">
                <Icon name="LogOut" size={18} className="mr-2" />
                {t.logout}
              </Button>
            </div>
          </div>
        )}
      </main>

      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{authMode === 'login' ? t.signIn : t.signUp}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'register' && (
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <Input id="name" name="name" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {authMode === 'login' ? t.signIn : t.signUp}
            </Button>
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-sm text-primary hover:underline w-full text-center"
            >
              {authMode === 'login' ? t.noAccount : t.alreadyHaveAccount}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t.settings}</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-3">
              <Label>{t.theme}</Label>
              <div className="flex items-center gap-4">
                <Switch
                  checked={settings.theme === 'dark'}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, theme: checked ? 'dark' : 'light' })
                  }
                />
                <span className="text-sm">{settings.theme === 'dark' ? t.dark : t.light}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>{t.language}</Label>
              <Select
                value={settings.language}
                onValueChange={(value: 'ru' | 'en') => setSettings({ ...settings, language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>{t.fontSize}</Label>
              <Select
                value={settings.fontSize}
                onValueChange={(value: 'sm' | 'base' | 'lg') => setSettings({ ...settings, fontSize: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sm">{t.small}</SelectItem>
                  <SelectItem value="base">{t.medium}</SelectItem>
                  <SelectItem value="lg">{t.large}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={showPlayer} onOpenChange={setShowPlayer}>
        <DialogContent className="max-w-6xl w-full p-0 bg-black border-none">
          {currentMovie && (
            <div className="relative">
              <button
                onClick={() => setShowPlayer(false)}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <Icon name="X" size={24} className="text-white" />
              </button>
              <VideoPlayer movie={currentMovie} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function VideoPlayer({ movie }: { movie: Movie }) {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState([80]);
  const [playbackRate, setPlaybackRate] = useState('1');
  const [quality, setQuality] = useState('auto');

  return (
    <div className="relative bg-black aspect-video group">
      <video
        src={movie.videoUrl}
        className="w-full h-full"
        controls={false}
        autoPlay
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        style={{ 
          objectFit: 'contain',
          WebkitPlaybackRate: parseFloat(playbackRate)
        }}
      />
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              const video = document.querySelector('video');
              if (video) {
                if (playing) {
                  video.pause();
                } else {
                  video.play();
                }
              }
            }}
            className="text-white hover:bg-white/20"
          >
            <Icon name={playing ? 'Pause' : 'Play'} size={24} />
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <Icon name="Volume2" size={20} className="text-white" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-24"
            />
          </div>

          <Select value={playbackRate} onValueChange={setPlaybackRate}>
            <SelectTrigger className="w-24 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">0.5x</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1">1x</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x</SelectItem>
              <SelectItem value="2">2x</SelectItem>
            </SelectContent>
          </Select>

          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger className="w-28 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="1080p">1080p</SelectItem>
              <SelectItem value="720p">720p</SelectItem>
              <SelectItem value="480p">480p</SelectItem>
              <SelectItem value="360p">360p</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              const video = document.querySelector('video');
              if (video) {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  video.requestFullscreen();
                }
              }
            }}
            className="text-white hover:bg-white/20"
          >
            <Icon name="Maximize" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
