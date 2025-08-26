import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import './Button.css';

export default class Button extends Block {
  constructor(props: Props) {
    super('button', {
      ...props,
      className: props.className || 'button',
      icon: props.icon || '',
      svgIcon: props.svgIcon || '',
      events: props.events || {},
      attrs: {
        type: props.type || 'submit',
      },
    });
  }

  protected render(): string {
    return `
            {{#if svgIcon}}
            {{{this.svgIcon}}}
            {{/if}}
            {{#if icon}}
            <span class="button__icon">{{icon}}</span>
            {{/if}}
            {{text}}
            `;
  }
}
