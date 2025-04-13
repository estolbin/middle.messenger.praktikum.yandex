import '../css/main.css';
import { registerPartials } from '../nandlebars-setup.js';
registerPartials();


import { renderLoginPage } from '../pages/login.js';
import { renderRegisterPage } from '../pages/register.js';
import { render404Page } from '../pages/404.js';
import { render500Page } from '../pages/500.js';
import { renderProfilePage } from '../pages/profile.js';
import { renderChatPage } from '../pages/chat.js';


const path = window.location.pathname;

switch (path) {
    case '/login':
    case '/':
        renderLoginPage();
        break;
    case '/register':
        renderRegisterPage();
        break;
    case '/profile':
        renderProfilePage();
        break;
    case '/404':
        render404Page();
        break;
    case '/500':
        render500Page();
        break;
    case '/chat':
        renderChatPage();
        break;
    default:
        render404Page();
        break;
}

