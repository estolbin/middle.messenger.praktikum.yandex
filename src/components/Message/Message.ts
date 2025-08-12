import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import './Message.css';

export default class Message extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      class: 'message',
      isMine: props.isMine || false,
      isRead: props.isRead || false,
    });
  }

  protected render(): string {
    const messageClass = this.props.isMine ? 'message message--mine' : 'message';

    return `
          <div class="${messageClass}">
            <div class="message__content">
              ${this.props.content}
              <div class="message__meta">
                <time class="message__time">${this.props.time}</time>
                ${this.props.isRead
    ? '<span class="message__status message__status--read">✓✓</span>'
    : '<span class="message__status">✓</span>'
}
              </div>
            </div>
          </div>
        `;
  }
}

/* <div class="message {{#if isMine}}message--mine{{/if}}">
  <div class="message__content">
    {{content}}
    <div class="message__meta">
      <time class="message__time">{{time}}</time>
      {{#if isRead}}
        <span class="message__status message__status--read">✓✓</span>
      {{else}}
        <span class="message__status">✓</span>
      {{/if}}
    </div>
  </div>
</div> */
