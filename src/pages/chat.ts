import ChatList from '../components/ChatList/ChatList';
import Message from '../components/Message/Message';
import MessageInput from '../components/MessageInput/MessageInput';
import chats from '../templates/chatsTemplate';
import messages from '../templates/messageTemplates';
import Block from '../utils/block';
import { Props } from '../utils/types';

export default class ChatPage extends Block {
  constructor() {
    super('div', {
      className: 'chat-page',
      ListChat: new ChatList({ chats }),
      Messages: messages.map((props: Props) => new Message({
        id: props.id,
        content: props.content,
        time: props.time,
        isMine: props.isMine,
        isRead: props.isRead,
      })),
      MessageInput: new MessageInput({

      }),
    });
  }

  protected render(): string {
    return `
            <div class="chat-list-panel">
                {{{ ListChat }}}
            </div>
            <div class="chat-content">
                <div class="messages-container">
                    {{#each Messages}}
                        {{{ this }}}
                    {{/each}}
                </div>
                {{{ MessageInput }}}
            </div>
            
        `;
  }
}
