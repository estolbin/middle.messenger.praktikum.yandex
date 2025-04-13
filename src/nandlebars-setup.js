import Handlebars from 'handlebars';

// Статический импорт всех компонентов
import AvatarTemplate from './components/Avatar/Avatar.hbs?raw';
import ButtonTemplate from './components/Button/Button.hbs?raw';
import ChatItemTemplate from './components/ChatItem/ChatItem.hbs?raw';
import ChatListTemplate from './components/ChatList/ChatList.hbs?raw';
import ErrorPageTemplate from './components/ErrorPage/ErrorPage.hbs?raw';
import FormCardTemplate from './components/FormCard/FormCard.hbs?raw';
import InputTemplate from './components/Input/Input.hbs?raw';
import MessageTemplate from './components/Message/Message.hbs?raw';
import SearchTemplate from './components/Search/Search.hbs?raw';
import MessagetInputTempalete from './components/MessageInput/MessageInput.hbs?raw';

export function registerPartials() {
  // Синхронная регистрация всех partials
  const partials = {
    Avatar: AvatarTemplate,
    Button: ButtonTemplate,
    ChatItem: ChatItemTemplate,
    ChatList: ChatListTemplate,
    ErrorPage: ErrorPageTemplate,
    FormCard: FormCardTemplate,
    Input: InputTemplate,
    Message: MessageTemplate,
    Search: SearchTemplate,
    MessageInput: MessagetInputTempalete,
  };

  Object.entries(partials).forEach(([name, template]) => {
    Handlebars.registerPartial(name, Handlebars.compile(template));
  });

}