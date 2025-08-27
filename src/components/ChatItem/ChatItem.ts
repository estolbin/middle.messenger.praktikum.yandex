import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import Avatar from '../Avatar/Avatar';
import './ChatItem.css';

export default class ChatItem extends Block {
  constructor(props: Props) {
    const className = `chat-item ${props.isActive ? 'chat-item--active' : ''}`.trim();
    super('div', {
      ...props,
      className: className || 'chat-item',
      'data-chat-id': props.id,
      isActive: props.isActive || false,
      Avatar: new Avatar({
        src: props.avatarSrc,
        size: 'medium',
        class: 'chat-item__avatar',
      }),
    });
  }

  protected render(): string {
    return `
        {{{ Avatar }}}
        <div class="chat-item__content">
            <div class="chat-item__header">
                <h3 class="chat-item__name">${this.props.name}</h3>
                <time class="chat-item__time">${this.props.lastMessageTime}</time>
            </div>
            <div class="chat-item__preview">
                <p class="chat-item__text">${this.props.lastMessageText}</p>
                {{#if ${this.props.unreadCount} }}
                    <span class="chat-item__badge">${this.props.unreadCount}</span>
                {{/if}}
            </div>
        </div>
        `;
  }
}
