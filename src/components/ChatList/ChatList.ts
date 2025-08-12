import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import ChatItem from '../ChatItem/ChatItem';
import Search from '../Search/Search';

export default class ChatList extends Block {
  constructor(props: Props) {
    super('div', ({
      ...props,
      class: 'chat-list',
      Search: new Search({
        placeholder: 'Поиск',
      }),
    }));
  }

  protected render(): string {
    const chatItems = this.props.chats?.map((chat: any) => new ChatItem({
      avatarSrc: chat.avatarSrc,
      name: chat.name,
      lastMessageText: chat.lastMessageText,
      lastMessageTime: chat.lastMessageTime,
      unreadCount: chat.unreadCount,
      active: chat.active,
    }).render()).join('') || '';

    return `
            <div class="chat-list">
                {{ Search }}
                <div class="chat-list__items">
                    ${chatItems}
                </div>
            </div>
        `;
  }
}
