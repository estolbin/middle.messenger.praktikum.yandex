import Handlebars from 'handlebars';
import loginTemplateRaw from '../templates/login.hbs?raw';
import InputTemplate from '../components/Input/Input.hbs?raw';
import ButtonTemplate from '../components/Button/Button.hbs?raw';
import FormCardTemplate from '../components/FormCard/FormCard.hbs?raw';

import '../components/Button/Button.css';
import '../components/Input/Input.css';
import '../components/FormCard/FormCard.css';

Handlebars.registerPartial('Input', Handlebars.compile(InputTemplate));
Handlebars.registerPartial('Button', Handlebars.compile(ButtonTemplate));
Handlebars.registerPartial('FormCard', Handlebars.compile(FormCardTemplate));

const loginTemplate = Handlebars.compile(loginTemplateRaw);


export function renderLoginPage() {
  const app = document.getElementById('app');
  
  const data = {
    title: 'Вход в систему',
    inputs: [
      { id: 'login-email', type: 'email', name: 'email', label: 'Логин', placeholder: 'Введите ваш email', required: true },
      { id: 'login-password', type: 'password', name: 'password', label: 'Пароль', placeholder: 'Введите ваш пароль', required: true }
    ],
    primaryButton: { text: 'Войти', type: 'submit', class: 'button-primary' },
    link: { text: 'Зарегистрироваться', href: '/register' }
  };
  
  const html = loginTemplate(data);
  app.innerHTML = html;
  
}
