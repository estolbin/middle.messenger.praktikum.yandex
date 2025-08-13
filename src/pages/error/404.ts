import Block from '../../utils/block';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

export default class Page404 extends Block {
  constructor() {
    super('div', {
      ErrorPage: new ErrorPage({
        errorCode: 404,
        errorMessage: 'Страница не найдена',
      }),
    });
  }

  protected render(): string {
    return `
            {{{ ErrorPage }}}
        `;
  }
}
