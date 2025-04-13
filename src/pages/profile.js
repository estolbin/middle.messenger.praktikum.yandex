import Handlebars from 'handlebars';
import profileTemplateRaw from '../templates/profile.hbs?raw';

import '../components/Button/Button.css';
import '../components/Input/Input.css';
import '../components/Avatar/Avatar.css';

const profileTemplate = Handlebars.compile(profileTemplateRaw);


export function renderProfilePage() {
  const app = document.getElementById('app');
  
  const data = {
    avatar: {
        src: 'https://avatar.iran.liara.run/public/boy',
        alt: 'Аватар пользователя',
        editable: true
    },
    fields: [
        { id: 'profile-email', type: 'email', name: 'email', label: 'Почта', value: 'example@mail.ru', readonly: true },
        { id: 'profile-login', type: 'text', name: 'login', label: 'Логин', value: 'user123', readonly: true },
        { id: 'profile-firstname', type: 'text', name: 'first_name', label: 'Имя', value: 'Иван' },
        { id: 'profile-lastname', type: 'text', name: 'last_name', label: 'Фамилия', value: 'Иванов' },
        { id: 'profile-displayname', type: 'text', name: 'display_name', label: 'Имя в чате', value: 'Иван' },
        { id: 'profile-phone', type: 'tel', name: 'phone', label: 'Телефон', value: '+7 (123) 456-78-90' }
      ],
      passwordFields: [
        { id: 'profile-old-password', type: 'password', name: 'oldPassword', label: 'Старый пароль', placeholder: '••••••••' },
        { id: 'profile-new-password', type: 'password', name: 'newPassword', label: 'Новый пароль', placeholder: '••••••••' },
        { id: 'profile-repeat-password', type: 'password', name: 'repeatPassword', label: 'Повторите пароль', placeholder: '••••••••' }
      ],        
    primaryButton: { text: 'Сохранить', type: 'submit', class: 'button-primary' },
  };
  
  const html = profileTemplate(data);
  app.innerHTML = html;
  
}