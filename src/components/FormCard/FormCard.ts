import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import './FormCard.css'

export default class FormCard extends Block {
  constructor(props: Props) {
    super('div', { ...props,
     });
  }

  protected render(): string {
    return `
            <div class="form-card">
                <h2 class="form-card__title">{{title}}</h2>
                <form id="login-form">
                    {{#each inputs}}
                        {{{this}}}
                    {{/each}}
                    <div class="form-actions">
                        {{{ button }}}
                    </div>
                    <div class="form-footer">
                        <a href="{{link.href}}">{{link.text}}</a>
                    </div>
                </form>
            </div>
        `;
  }
}
