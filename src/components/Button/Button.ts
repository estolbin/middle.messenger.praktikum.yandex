import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import './Button.css';

export default class Button extends Block {
  constructor(props: Props) {
    super('button', {
      ...props,
      type: props.type || 'submit',
      className: props.className || 'button',
      icon: props.icon || '',
      events: props.events || {}
    });
  }

  protected render(): string {
    return ` {{#if icon}}
            <span class="button__icon">{{icon}}</span>
            {{/if}}
            {{text}}
            `;
  }
}

