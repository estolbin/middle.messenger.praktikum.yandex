import ProfileCard from '../components/FormCard/ProfileCard';
import Input from '../components/Input/Input';
import Block from '../utils/block';

export default class ProfilePage extends Block {
  constructor() {
    super('div', {
      Profile: new ProfileCard({
        items: [
          new Input({
            id: 'profile-email',
            type: 'email',
            name: 'email',
            label: 'Почта',
            value: 'example@mail.ru',
            readonly: true,
          }),
          new Input({
            id: 'profile-login',
            type: 'text',
            name: 'login',
            label: 'Логин',
            value: 'user123',
            readonly: true,
          }),
          new Input({
            id: 'profile-firstname',
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            value: 'Иван',
          }),
          new Input({
            id: 'profile-lastname',
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            value: 'Иванов',
          }),
          new Input({
            id: 'profile-displayname',
            type: 'text',
            name: 'display_name',
            label: 'Имя в чате',
            value: 'Иван',
          }),
          new Input({
            id: 'profile-phone',
            type: 'tel',
            name: 'phone',
            label: 'Телефон',
            value: '+7 (123) 456-78-90',
          }),
        ],
        passwordFields: [
          new Input({
            id: 'profile-old-password',
            type: 'password',
            name: 'oldPassword',
            label: 'Старый пароль',
            placeholder: '••••••••',
          }),
          new Input({
            id: 'profile-new-password',
            type: 'password',
            name: 'newPassword',
            label: 'Новый пароль',
            placeholder: '••••••••',
          }),
          new Input({
            id: 'profile-repeat-password',
            type: 'password',
            name: 'repeatPassword',
            label: 'Повторите пароль',
            placeholder: '••••••••',
          }),
        ],

      }),
    });
  }

  protected render(): string {
    return `
            {{{ Profile }}}
        `;
  }
}
