import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import ChatItem from '../ChatItem/ChatItem';
import Search from '../Search/Search';
import './ChatList.css';

export default class ChatList extends Block {
  constructor(props: Props) {
    super('div', ({
      ...props,
      className: 'chat-list',
      chatItems: props?.chats.map((props: Props) => new ChatItem({
        id: props.id,
        avatarSrc: props.avatarSrc,
        name: props.name,
        lastMessageText: props.lastMessageText,
        unreadCount: props.unreadCount,
        lastMessageTime: props.lastMessageTime,
        isActive: props.isActive,
        attrs: {
          ...props.attrs,
          'data-chat-id': props.id,
        },

      })),
      Search: new Search({
        placeholder: 'Поиск',
      }),
      events: {
        click: (e: Event) => {
          const target = e.target as HTMLElement;

          const chatItem = target.closest('.chat-item');
          if (!chatItem) return;

          const allChatItems = this.getContent().querySelectorAll('.chat-item');
          allChatItems?.forEach((item) => item.classList.remove('chat-item--active'));

          chatItem.classList.add('chat-item--active');
          console.log(chatItem);
        },
      },
    }));
  }

  protected render(): string {
    return `
            <div class="chat-list">
                {{{ Search }}}
                <div class="chat-list__items">
                    {{#each chatItems}}
                        {{{ this }}}
                    {{/each}}
                </div>
            </div>
        `;
  }
}
