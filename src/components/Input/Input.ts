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
    });
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
            >
            {{#if error}}
            <span class="input-field__error">{{error}}</span>
            {{/if}}
          `;
  }
}
