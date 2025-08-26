/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Input from '../components/Input/Input';
import Block from './block';

type Condition = () => boolean;

export const createValidator = (e: Event, component: Block):
    ((condition: Condition, errorMessage: string) => boolean) => (condition: Condition, errorMessage: string): boolean => {
  if (e.target instanceof HTMLInputElement) {
    const { value } = e.target;

    if (condition()) {
      e.preventDefault();
      component.setProps({ error: errorMessage, value }); // Передаем ошибку и значение
      return false;
    }
    component.setProps({ error: '', value }); // Очищаем ошибку и обновляем значение
    return true;
  }
  return false;
};

// login
export const isLengthValid = (value: string, min: number, max: number): boolean => value.length >= min && value.length <= max;

export const isLatinWithOptionalNumbers = (value: string): boolean => {
  const latinWithNumbersRegex = /^[a-zA-Z0-9]*$/;
  const onlyNumbersRegex = /^[0-9]+$/;

  return latinWithNumbersRegex.test(value) && !onlyNumbersRegex.test(value);
};

export const hasNoSpaces = (value: string): boolean => {
  const noSpacesRegex = /^[^\s]+$/;
  return noSpacesRegex.test(value);
};

export const isValidCharacters = (value: string): boolean => {
  const validCharactersRegex = /^[a-zA-Z0-9_-]+$/;
  return validCharactersRegex.test(value);
};

// password
export const isPasswordLengthValid = (value: string): boolean => value.length >= 8 && value.length <= 40;

export const hasUppercaseLetter = (value: string): boolean => {
  const uppercaseRegex = /[A-Z]/; // Хотя бы одна заглавная буква
  return uppercaseRegex.test(value);
};

export const hasDigit = (value: string): boolean => {
  const digitRegex = /\d/; // Хотя бы одна цифра
  return digitRegex.test(value);
};

export const isPasswordMatch = (password: string, confirmPassword: string): boolean => password === confirmPassword;

// phone
export const isValidPhone = (value: string): boolean => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  return phoneRegex.test(value);
};

export const containsOnlyDigitsOrOptionalPlus = (value: string): boolean => {
  const digitsAndOptionalPlusRegex = /^\+?[0-9]+$/; // Плюс в начале (опционально), затем только цифры
  return digitsAndOptionalPlusRegex.test(value);
};

// message
export const isValidMessage = (value: string): boolean => value.trim().length > 0;

// email
export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
};

// name
export const isValidName = (value: string): boolean => {
  const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё-]+$/; // Заглавная буква, затем буквы или дефис
  return nameRegex.test(value);
};

export const validateForm = (fields: { [key: string]: Input }): boolean => {
  let isValid = true;

  Object.entries(fields).forEach(([name, field]) => {
    const { value } = field.getProps();
    const validate = createValidator(new Event('blur'), field);

    switch (name) {
      case 'login':
        if (!isLengthValid(value as string, 3, 20)) {
          validate(() => true, 'Логин должен содержать от 3 до 20 символов, состоять из латиницы, цифр, дефиса и нижнего подчёркивания.');
          isValid = false;
        }
        break;
      case 'first_name':
        if (!isValidName(value as string)) {
          validate(() => true, 'Имя должно начинаться с заглавной буквы и содержать только буквы, дефисы или пробелы.');
          isValid = false;
        }
        break;
      case 'second_name':
        if (!isValidName(value as string)) {
          validate(() => true, 'Фамилия должна начинаться с заглавной буквы и содержать только буквы, дефисы или пробелы.');
          isValid = false;
        }
        break;
      case 'phone':
        if (!isLengthValid(value as string, 10, 15)) {
          validate(() => true, 'Номер телефона должен быть от 10 до 15 символов');
          isValid = false;
        } else if (!containsOnlyDigitsOrOptionalPlus(value as string)) {
          validate(() => true, 'Номер телефона должен содержать только цифры и +');
          isValid = false;
        }
        break;
      case 'password':
        if (!isPasswordLengthValid(value as string)) {
          validate(() => true, 'Пароль должен быть от 8 до 40 символов.');
          isValid = false;
        } else if (!hasUppercaseLetter(value as string)) {
          validate(() => true, 'Пароль должен содержать хотя бы одну заглавную букву.');
          isValid = false;
        } else if (!hasDigit(value as string)) {
          validate(() => true, 'Пароль должен содержать хотя бы одну цифру.');
          isValid = false;
        }
        break;

      case 'confirm':
        // eslint-disable-next-line no-case-declarations
        const passwordValue = fields.password?.getProps().value || '';
        if (!isPasswordMatch(passwordValue as string, value as string)) {
          validate(() => true, 'Пароли не совпадают.');
          isValid = false;
        }
        break;
      case 'email':
        if (!isValidEmail(value as string)) {
          validate(() => true, 'Некорректный email.');
          isValid = false;
        }
      // eslint-disable-next-line no-fallthrough
      default:
        isValid = true;
        break;
    }
  });

  return isValid;
};
