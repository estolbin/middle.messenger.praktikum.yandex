import '../css/main.css';
import ChatPage from '../pages/chat';

import Page404 from '../pages/error/404';
import Page500 from '../pages/error/500';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import RegisterPage from '../pages/register/register';
/*
import ProfilePage from '../pages/ProfilePage';
import ChatPage from '../pages/ChatPage'; */

const path = window.location.pathname;

let page: any;
switch (path) {
  case '/login':
  case '/':
    page = new LoginPage();
    break;
  case '/404':
    page = new Page404();
    break;
  case '/500':
    page = new Page500();
    break;
  case '/register':
    page = new RegisterPage();
    break;
  case '/chat':
    page = new ChatPage();
    break;
  case '/profile':
    page = new ProfilePage();
    break;
  default:
    page = new Page404();
}

const app = document.getElementById('app');
if (app) {
  app.innerHTML = '';
  app.appendChild(page.getContent());
}
