import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import './Avatar.css';

export default class Avatar extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      editable: props.editable || false,
    });
  }

  render(): string {
    const { editable, src, alt } = this.props;
    return `
            <img src="${src}" alt="${alt}" class="avatar__image small">
            {{#if ${editable}}}
                <div class="avatar__overlay">
                    <span class="avatar__edit-text">Поменять аватар</span>
                </div>
            {{/if}}
        `;
  }
}
