import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './MessageInput.css';

export default class MessageInput extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      class: 'message-input',
      AttachButton: new Button({
        type: 'button',
        class: 'message-input__attach-button',
        children: `
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.18662 12.5L13.7628 4.92389L14.7056 5.8667L7.12943 13.4428L6.18662 12.5Z" fill="#999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.70067 15.0141L16.2768 7.43793L17.2196 8.38074L9.64348 15.9569L8.70067 15.0141Z" fill="#999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0433 20.3567L21.6195 12.7806L22.5623 13.7234L14.9861 21.2995L14.0433 20.3567Z" fill="#999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5574 22.8708L24.1335 15.2946L25.0763 16.2374L17.5002 23.8136L16.5574 22.8708Z" fill="#999"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5574 22.8709C13.9423 25.486 9.71181 25.4954 7.10831 22.8919C4.50482 20.2884 4.51424 16.0579 7.12936 13.4428L6.18655 12.5C3.0484 15.6381 3.0371 20.7148 6.16129 23.839C9.28549 26.9632 14.3621 26.9518 17.5002 23.8137L16.5574 22.8709Z" fill="#999"/>
                    </svg>
                `,
      }),
      Input: new Input({
        type: 'text',
        class: 'message-input__field',
        placeholder: 'Сообщение',
        'aria-label': 'Введите сообщение',
      }),
      SendButton: new Button({
        type: 'submit',
        class: 'message-input__send-button',
        children: `
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.03137 3.34914L25.3805 12.532C26.7095 13.0685 26.7095 14.9315 25.3805 15.468L4.03138 24.6509C2.76683 25.1616 1.75 23.9927 1.75 22.6829V5.31709C1.75 4.00731 2.76683 2.83838 4.03137 3.34914Z" fill="#3369F3"/>
                    <path d="M1.75 22.6829L1.75 5.31709C1.75 4.00731 2.76683 2.83838 4.03138 3.34914L25.3805 12.532C26.7095 13.0685 26.7095 14.9315 25.3805 15.468L4.03137 24.6509C2.76683 25.1616 1.75 23.9927 1.75 22.6829Z" stroke="white" stroke-width="2"/>
                    </svg>
                `,
      }),
    });
  }

  protected render(): string {
    return `
            {{ AttachButton }}
            {{ Input }}
            {{ SendButton }}
        `;
  }
}
