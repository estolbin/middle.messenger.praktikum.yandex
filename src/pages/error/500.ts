import Block from '../../utils/block';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

export default class Page500 extends Block {
  constructor() {
    super('div', {
      ErrorPage: new ErrorPage({
        errorCode: 500,
        errorMessage: 'Мы уже работаем над этим!',
      }),
    });
  }

  protected render(): string {
    return `
            {{{ ErrorPage }}}
        `;
  }
}
