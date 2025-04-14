import Handlebars from 'handlebars';
import ErrorPageTemplate from '../components/ErrorPage/ErrorPage.hbs?raw';
import '../components/ErrorPage/ErrorPage.css';

const template = Handlebars.compile(ErrorPageTemplate);

export function render500Page() {
  const main = document.getElementById('main');
  main.innerHTML = template({
    errorCode: '500',
    errorMessage: 'Ошибка сервера',
  });
}
