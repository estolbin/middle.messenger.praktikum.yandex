import ProfileCard from '../components/FormCard/ProfileCard';
import Input from '../components/Input/Input';
import Block from '../utils/block';
import {
  containsOnlyDigitsOrOptionalPlus, createValidator, hasDigit, hasUppercaseLetter, isLengthValid, isPasswordLengthValid, isPasswordMatch, isValidName,
} from '../utils/validator';

export default class ProfilePage extends Block {
  constructor() {
    const firstNameInput = new Input({
      id: 'register-name',
      type: 'text',
      name: 'first_name',
      label: 'Имя',
      value: 'Иван',
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
      value: 'Иванов',
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
    const nickNameInput = new Input({
      id: 'profile-displayname',
      type: 'text',
      name: 'display_name',
      label: 'Имя в чате',
      value: 'Иван',
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
    const phoneInput = new Input({
      id: 'register-phone',
      type: 'tel',
      name: 'phone',
      label: 'Телефон',
      value: '+7 (123) 456-78-90',
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
      id: 'profile-new-password',
      type: 'password',
      name: 'newPassword',
      label: 'Новый пароль',
      placeholder: '••••••••',
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
      id: 'profile-repeat-password',
      type: 'password',
      name: 'repeatPassword',
      label: 'Повторите пароль',
      placeholder: '••••••••',
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
          firstNameInput,
          secondNameInput,
          nickNameInput,
          phoneInput,
        ],
        passwordFields: [
          new Input({
            id: 'profile-old-password',
            type: 'password',
            name: 'oldPassword',
            label: 'Старый пароль',
            placeholder: '••••••••',
          }),
          passwordInput,
          confirmPasswordInput,
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
