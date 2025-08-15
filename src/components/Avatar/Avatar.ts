import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import Input from '../Input/Input';
import './Avatar.css';

export default class Avatar extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      className: 'avatar medium',
      editable: props.editable || false,
      alt: props.alt || 'avatar',
      AvatarInput: new Input({
        type: 'file',
        attrs: {
          name: 'avatar',
          accept: 'image/*',
          style: 'display: none;',
          ref: 'avatarInput',
        },
        events: {
          'avatarInput:change': (event: Event) => this.handleFileUpload(event),
        },
      }),
    });
  }

  protected componentDidMount(): void {
    const avatarImage = this._element?.querySelector('.avatar__image');
    const avatarInput = this._element?.querySelector('input[type="file"]');

    if (!avatarImage || !avatarInput) {
      // eslint-disable-next-line no-console
      console.error('Avatar image or input not found!');
      return;
    }

    avatarImage.addEventListener('click', () => {
      // eslint-disable-next-line no-console
      console.log('Avatar image clicked!');
      (avatarInput as HTMLInputElement).click();
    });
  }

  private handleFileUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      // eslint-disable-next-line no-console
      console.log('Selected file:', file);
    }
  }

  render(): string {
    const { editable, src, alt } = this.props;
    return `
            <img src="${src}" alt="${alt}" class="avatar__image small">
            {{#if ${editable}}}
                {{{ AvatarInput }}}
                <div class="avatar__overlay">
                    <span class="avatar__edit-text">Поменять аватар</span>
                </div>
            {{/if}}
        `;
  }
}
