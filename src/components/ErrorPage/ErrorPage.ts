import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import Button from '../Button/Button';

export default class ErrorPage extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      class: 'error-page',
      Button: new Button({
        class: 'button-primary',
        text: 'Вернутся на главную',
        type: 'button',
        events: {
          onclick: () => { window.location.href = '/'; },
        },
      }),
    });
  }

  protected render(): string {
    return `
            <h1 class="error-code">${this.props.errorCode}</h1>
            <h2 class="error-messae">${this.props.errorMessage}</h2>
            {{ Button }}
        `;
  }
}
