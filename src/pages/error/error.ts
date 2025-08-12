import Block from '../../utils/block';
import Button from '../../components/Button/Button';
import type { Props } from '../../utils/types';

export default class ErrorPage extends Block {
  constructor(props: Props | undefined) {
    super('div', {
      ...props,
      className: 'error-page',
      BackButton: new Button({
        text: 'Вернутся на главную',
        type: 'button',
        className: 'button-primary',
        onClick: () => { window.location.href = '/'; },
      }),
    });
  }

  protected render(): string {
    return `
            <h1 class="error-code">{{errorCode}}</h1>
            <h2 class="error-message">{{errorMessage}}</h2>
            {{{ BackButton }}}
        `;
  }
}
