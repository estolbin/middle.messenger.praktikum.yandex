import Handlebars from 'handlebars';
import registerTemplateRaw from '../templates/register.hbs?raw';

import '../components/Button/Button.css';
import '../components/Input/Input.css';
import '../components/FormCard/FormCard.css';

const registerTemplate = Handlebars.compile(registerTemplateRaw);


export function renderRegisterPage() {
  const main = document.getElementById('main');
  
  const data = {
    title: 'Регистрация',
    inputs: [
        { id: 'register-login', type: 'text', name: 'login', label: 'Логин', placeholder: 'Введите ваш логин', required: true },
        { id: 'register-name', type: 'text', name: 'first_name', label: 'Имя', placeholder: 'Введите ваше имя', required: true },
        { id: 'register-surname', type: 'text', name: 'second_name', label: 'Фамилия', placeholder: 'Введите вашу фамилию', required: true },
        { id: 'register-email', type: 'email', name: 'email', label: 'Логин', placeholder: 'Введите ваш email', required: true },
        { id: 'register-phone', type: 'tel', name: 'phone', label: 'Телефон', placeholder: 'Введите ваш телефон', required: true },
        { id: 'register-password', type: 'password', name: 'password', label: 'Пароль', placeholder: 'Введите ваш пароль', required: true },
        { id: 'register-confirm', type: 'password', name: 'confirm', label: 'Повторите пароль', placeholder: 'Введите ваш пароль', required: true }
    ],
    primaryButton: { text: 'Зарегистрироваться', type: 'submit', class: 'button-primary' },
    link: { text: 'Войти', href: '/login' }
  };
  
  const html = registerTemplate(data);
  main.innerHTML = html;
  
}
