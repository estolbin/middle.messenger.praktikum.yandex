import Button from '../../components/Button/Button';
import FormCard from '../../components/FormCard/FormCard';
import Input from '../../components/Input/Input';
import Block from '../../utils/block';

export default class RegisterPage extends Block {
  constructor() {
    super('div', {
      RegisterFormCard: new FormCard({
        form_id: 'register-form',
        title: 'Регистрация',
        items: [
          new Input({
            id: 'register-login',
            type: 'text',
            name: 'login',
            label: 'Логин',
            placeholder: 'Введите ваш логин',
            required: true,
          }),
          new Input({
            id: 'register-name',
            type: 'text',
            name: 'first_name',
            label: 'Имя',
            placeholder: 'Введите ваше имя',
            required: true,
          }),
          new Input({
            id: 'register-surname',
            type: 'text',
            name: 'second_name',
            label: 'Фамилия',
            placeholder: 'Введите вашу фамилию',
            required: true,
          }),
          new Input({
            id: 'register-email',
            type: 'email',
            name: 'email',
            label: 'Логин',
            placeholder: 'Введите ваш email',
            required: true,
          }),
          new Input({
            id: 'register-phone',
            type: 'tel',
            name: 'phone',
            label: 'Телефон',
            placeholder: 'Введите ваш телефон',
            required: true,
          }),
          new Input({
            id: 'register-password',
            type: 'password',
            name: 'password',
            label: 'Пароль',
            placeholder: 'Введите ваш пароль',
            required: true,
          }),
        ],
        button: new Button({
          text: 'Зарегистрироваться',
          type: 'submit',
          class: 'button-primary',
        }),
        link: {
          text: 'Войти',
          href: '/login',
        },
      }),
    });
  }

  protected render(): string {
    return `
            <div>
                {{{ RegisterFormCard }}}
            </div>
        `;
  }
}
