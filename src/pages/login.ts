import Block from '../utils/block';
import FormCard from '../components/FormCard/FormCard';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {
  createValidator, hasDigit, hasUppercaseLetter, isPasswordLengthValid, isValidEmail, validateForm,
} from '../utils/validator';

export default class LoginPage extends Block {
  constructor() {
    const loginInput = new Input({
      id: 'login-email',
      type: 'email',
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите ваш email',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, loginInput);

            validate(() => !isValidEmail(value), 'Неправильный формат email');
          }
        },
      },
    });
    const passwordInput = new Input({
      id: 'login-password',
      type: 'password',
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите ваш пароль',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, passwordInput);

            validate(() => !isPasswordLengthValid(value), 'Пароль должен быть от 8 до 20 символов');
            validate(() => !hasUppercaseLetter(value), 'Пароль должен содержать хотя бы одну заглавную букву');
            validate(() => !hasDigit(value), 'Пароль должен содержать хотя бы одну цифру');
          }
        },
      },
    });

    super('div', {
      LoginFormCard: new FormCard({
        title: 'Вход в систему',
        items: [
          loginInput,
          passwordInput,
        ],
        button: new Button({
          text: 'Войти',
          type: 'submit',
          class: 'button-primary',
        }),
        link: {
          text: 'Зарегистрироваться',
          href: '/register',
        },
        events: {
          'login-form:submit': (event: Event) => {
            event.preventDefault();
            if (event.target instanceof HTMLFormElement) {
              const formData = new FormData(event.target);
              const login = formData.get('login');
              const password = formData.get('password');

              const fields = {
                email: loginInput,
                password: passwordInput,
              };

              const isFormValid = validateForm(fields);

              if (isFormValid) {
                console.log('login', login, 'password', password);
              } else {
                console.log('Ошибка валидации формы');
              }
            }
          },
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
