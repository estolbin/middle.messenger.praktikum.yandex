import '../css/main.css';
import { renderLoginPage } from '../pages/login.js';
import { render404Page } from '../pages/404.js';
import { render500Page } from '../pages/500.js';

//import { renderRegisterPage } from '../pages/register.js';

const path = window.location.pathname;

if (path.includes('login')) {
    renderLoginPage();
} else {
    render404Page();
}