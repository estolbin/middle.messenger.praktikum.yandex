import Block from '../../utils/block';
import type { Props } from '../../utils/types';
import './FormCard.css';

export default class FormCard extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      form_id: props.form_id || 'login-form',
    });
  }

  protected render(): string {
    return `
            <div class="form-card">
                <h2 class="form-card__title">{{title}}</h2>
                <form id="{{form_id}}" ref="{{form_id}}">
                    {{#each items}}
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
