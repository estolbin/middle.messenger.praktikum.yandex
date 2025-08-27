import Button from '../../components/Button/Button';
import FormCard from '../../components/FormCard/FormCard';
import Input from '../../components/Input/Input';
import { Routes } from '../../js/Routes';
import Block from '../../utils/block';
import {
  containsOnlyDigitsOrOptionalPlus, createValidator, hasDigit,
  hasNoSpaces, hasUppercaseLetter, isLatinWithOptionalNumbers,
  isLengthValid, isPasswordLengthValid, isPasswordMatch,
  isValidCharacters, isValidEmail, isValidName, validateForm,
} from '../../utils/validator';

export default class RegisterPage extends Block {
  constructor() {
    const loginInput = new Input({
      id: 'register-login',
      type: 'text',
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите ваш логин',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, loginInput);

            validate(() => !isLengthValid(value, 3, 20), 'Логин должен быть от 3 до 20 символов');
            validate(() => !hasNoSpaces(value), 'Логин не должен содержать пробелов');
            validate(() => !isLatinWithOptionalNumbers(value), 'Логин должен содержать только латинские буквы и цифры');
            validate(() => !isValidCharacters(value), 'Логин не должен содржать спецсимволы');
          }
        },
      },
    });

    const firstNameInput = new Input({
      id: 'register-name',
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Введите ваше имя',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, firstNameInput);

            validate(() => !isValidName(value), 'Имя должно содержать только буквы и начинаться с заглавной');
          }
        },
      },
    });
    const secondNameInput = new Input({
      id: 'register-surname',
      type: 'text',
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Введите вашу фамилию',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, secondNameInput);

            validate(() => !isValidName(value), 'Фамилия должна содержать только буквы и начинаться с заглавной');
          }
        },
      },
    });
    const emailInput = new Input({
      id: 'register-email',
      type: 'email',
      name: 'email',
      label: 'Логин',
      placeholder: 'Введите ваш email',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, emailInput);

            validate(() => !!isValidEmail(value), 'Неправильный формат email');
          }
        },
      },
    });
    const phoneInput = new Input({
      id: 'register-phone',
      type: 'tel',
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Введите ваш телефон',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, phoneInput);

            validate(() => !isLengthValid(value, 10, 15), 'Номер телефона должен быть от 10 до 15 символов');
            validate(() => !containsOnlyDigitsOrOptionalPlus(value), 'Номер телефона должен содержать только цифры и +');
          }
        },
      },
    });
    const passwordInput = new Input({
      id: 'register-password',
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

            validate(() => !isPasswordLengthValid(value), 'Пароль должен быть от 8 до 40 символов');
            validate(() => !hasUppercaseLetter(value), 'Пароль должен содержать хотя бы одну заглавную букву');
            validate(() => !hasDigit(value), 'Пароль должен содержать хотя бы одну цифру');
          }
        },
      },
    });
    const confirmPasswordInput = new Input({
      id: 'register-confirm',
      type: 'password',
      name: 'confirm',
      label: 'Повторите пароль',
      placeholder: 'Введите ваш пароль',
      required: true,
      events: {
        'input:blur': (event: Event) => {
          if (event.target instanceof HTMLInputElement) {
            const { value } = event.target;
            const validate = createValidator(event, confirmPasswordInput);

            const existingPassword = passwordInput.getProps().value;

            validate(() => !isPasswordMatch(existingPassword as string, value), 'Пароли не совпадают');
          }
        },
      },
    });
    super('div', {
      RegisterFormCard: new FormCard({
        form_id: 'register-form',
        title: 'Регистрация',
        items: [
          loginInput,
          firstNameInput,
          secondNameInput,
          emailInput,
          phoneInput,
          passwordInput,
          confirmPasswordInput,
        ],
        button: new Button({
          text: 'Зарегистрироваться',
          type: 'submit',
          class: 'button-primary',
        }),
        link: {
          text: 'Войти',
          href: Routes.LOGIN,
        },
        events: {
          'register-form:submit': (event: Event) => {
            event.preventDefault();
            if (event.target instanceof HTMLFormElement) {
              const formData = new FormData(event.target);
              const login = formData.get('login');
              const firstName = formData.get('first_name');
              const secondName = formData.get('second_name');
              const email = formData.get('email');
              const phone = formData.get('phone');
              const password = formData.get('password');

              const fields = {
                login: loginInput,
                first_name: firstNameInput,
                second_name: secondNameInput,
                email: emailInput,
                phone: phoneInput,
                password: passwordInput,
                confirm: confirmPasswordInput,
              };

              const isFormValid = validateForm(fields);

              if (isFormValid) {
                // eslint-disable-next-line no-console
                console.log(
                  'login',
                  login,
                  'first_name',
                  firstName,
                  'second_name',
                  secondName,
                  'email',
                  email,
                  'phone',
                  phone,
                  'password',
                  password,
                );
              } else {
                // eslint-disable-next-line no-console
                console.log('Form is not valid');
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
                {{{ RegisterFormCard }}}
            </div>
        `;
  }
}
