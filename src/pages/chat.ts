import Handlebars from 'handlebars';
import chatTemplate from '../templates/chat.hbs?raw';

// Подключаем стили компонентов
import '../components/ChatList/ChatList.css';
import '../components/ChatItem/ChatItem.css';
import '../components/Search/Search.css';
import '../components/Message/Message.css';
import '../components/Button/Button.css';
import '../components/MessageInput/MessageInput.css';

export function renderChatPage() {
  const app = document.getElementById('app');

  const data = {
    chats: [
      {
        id: 1,
        avatarSrc: 'https://avatar.iran.liara.run/public/boy',
        name: 'Андрей',
        lastMessageText: 'Изображение',
        lastMessageTime: '10:49',
        unreadCount: 2,
        active: true,
      },
      {
        id: 2,
        avatarSrc:
                    'https://avatar.iran.liara.run/username?username=Киноклуб',
        name: 'Киноклуб',
        lastMessageText: 'Стикер',
        lastMessageTime: '12:00',
        unreadCount: 0,
        active: false,
      },
      // Добавьте больше тестовых чатов
    ],
    messages: [
      {
        id: 1,
        content: 'Привет! Как дела?',
        time: '11:56',
        isMine: false,
        isRead: true,
      },
      {
        id: 2,
        content: 'Отправляю тебе изображение',
        time: '12:01',
        isMine: true,
        isRead: true,
      },
      // Добавьте больше тестовых сообщений
    ],
    currentUser: {
      avatarSrc: 'https://via.placeholder.com/34',
      name: 'Вы',
    },
  };

  // Компилируем шаблон с данными
  const template = Handlebars.compile(chatTemplate);
  if (app) {
    app.innerHTML = template(data);
  }

  // Добавляем обработчики событий
  document.querySelectorAll('.chat-item').forEach((item) => {
    item.addEventListener('click', () => {
      console.log('Чат выбран:', item);
      // Здесь будет логика загрузки сообщений чата
    });
  });
}
