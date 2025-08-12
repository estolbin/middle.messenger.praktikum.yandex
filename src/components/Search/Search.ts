import type { Props } from '../../utils/types';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Block from '../../utils/block';

export default class Search extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      className: 'search',
      Input: new Input({
        label: 'Поиск',
        type: 'text',
        name: 'search',
        placeholder: 'Поиск',
        readonly: false,
      }),
      Button: new Button({
        className: 'search__button',
      }),
    });
  }

  protected render(): string {
    return `
            {{{ Input }}}
            {{{ Button}}}
            {{#if error}}
            <span class="input-field__error">{{error}}</span>
            {{/if}}*/             
        `;
  }
}
