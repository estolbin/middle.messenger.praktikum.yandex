import '../css/main.css';

// Импортируем классы страниц
import LoginPage from '../pages/login';
/* import RegisterPage from '../pages/RegisterPage';
import Page404 from '../pages/Page404';
import Page500 from '../pages/Page500';
import ProfilePage from '../pages/ProfilePage';
import ChatPage from '../pages/ChatPage'; */

// Определяем текущий путь
const path = window.location.pathname;

// Создаем экземпляр страницы в зависимости от пути
let page: any; // Используем `any`, пока не определены общие интерфейсы для страниц
switch (path) {
  case '/login':
  case '/':
    page = new LoginPage();
    break;
  default:
    page = {
      getContent: () => {
        const div = document.createElement('div');
        div.innerHTML = '<h1>Страница не найдена</h1>';
        return div;
      },
    };
    /* case '/register':
        page = new RegisterPage();
        break;
    case '/profile':
        page = new ProfilePage();
        break;
    case '/404':
        page = new Page404();
        break;
    case '/500':
        page = new Page500();
        break;
    case '/chat':
        page = new ChatPage();
        break;
    default:
        page = new Page404();
        break; */
}

// Рендерим страницу в DOM
const app = document.getElementById('app');
if (app) {
    app.innerHTML = '';
    app.appendChild(page.getContent());
}
