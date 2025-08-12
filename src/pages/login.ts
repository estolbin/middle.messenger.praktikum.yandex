import Block from '../utils/block';
import FormCard from '../components/FormCard/FormCard';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

export default class LoginPage extends Block {
  constructor() {
    super('div', {
      LoginFormCard: new FormCard({
        title: 'Вход в систему',
        inputs: [
          new Input({
            id: 'login-email',
            type: 'email',
            name: 'login',
            label: 'Логин',
            placeholder: 'Введите ваш email',
            required: true,
          }),
          new Input({
            id: 'login-password',
            type: 'password',
            name: 'password',
            label: 'Пароль',
            placeholder: 'Введите ваш пароль',
            required: true,
          }),
        ],
        button: new Button({
          text: 'Войти',
          type: 'submit',
          class: 'button-primary',
          events: {
            click: (event: Event) => {
                event.preventDefault();
                console.log('it worked')
            }
          }
        }),
        link: {
          text: 'Зарегистрироваться',
          href: '/register',
        },
      }),
    });
  }

  protected render(): string {
    return `
            <div>
                {{{ LoginFormCard }}}
            </div>
        `;
  }
}
