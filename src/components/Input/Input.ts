import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import './Input.css';

export default class Input extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      className: props.className || 'input-field',
      name: props.name || '',
      type: props.type || 'text',
      value: props.value || '',
      placeholder: props.placeholder || '',
      readonly: props.readonly || false,
      error: props.error || '',
      id: props.id || '',
      events: props.events,
    });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.error !== newProps.error && this._element) {
      const errorElement = this._element.querySelector('.input-field__error');
      if (errorElement) {
        errorElement.textContent = newProps.error || ''; // Обновляем текст ошибки
      }
    }

    if (oldProps.value !== newProps.value && this._element) {
      const inputElement = this._element.querySelector('input');
      if (inputElement instanceof HTMLInputElement) {
        inputElement.value = newProps.value || ''; // Обновляем значение ввода
      }
    }

    return true;
  }

  protected render(): string {
    return `
            <span class="input-field__label">{{ label }}</span>
            <input
                type="{{type}}"
                name="{{name}}"
                value="{{value}}"
                placeholder="{{placeholder}}"
                class="input-field__input"
                {{#if readonly}}readonly{{/if}}
                ref="input"
            >
            {{#if error}}
            <span class="input-field__error">{{error}}</span>
            {{/if}}
          `;
  }
}
