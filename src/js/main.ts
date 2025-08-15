import '../css/main.css';
import ChatPage from '../pages/chat';
import Page404 from '../pages/error/404';
import Page500 from '../pages/error/500';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import RegisterPage from '../pages/register/register';
import Block from '../utils/block';
import { Routes } from './Routes';

const path = window.location.pathname;

let page: Block;
switch (path) {
  case Routes.LOGIN:
  case '/':
    page = new LoginPage();
    break;
  case Routes.ERROR_404:
    page = new Page404();
    break;
  case Routes.ERROR_500:
    page = new Page500();
    break;
  case Routes.REGISTER:
    page = new RegisterPage();
    break;
  case Routes.CHAT:
    page = new ChatPage();
    break;
  case Routes.PROFILE:
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
