import Block from '../../utils/block';
import { Props } from '../../utils/types';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import './FormCard.css';

export default class ProfileCard extends Block {
  constructor(props: Props) {
    super('div', {
      ...props,
      className: 'form-card',
      title: props.title || 'Профиль пользователя',
      Avatar: new Avatar({
        src: 'https://avatar.iran.liara.run/public/boy',
        alt: 'Аватар пользователя',
        editable: true,
      }),
      Button: new Button({
        text: 'Сохранить',
        type: 'submit',
        className: 'button-primary',
      }),
    });
  }

  protected render(): string {
    return `
        <h2 class="from-title">{{ title }}</h2>
        <div class="form-content">
            <div class="profile">
                {{{ Avatar }}}
                <form id="{{form_id}}">
                    {{#each items}}
                        {{{ this }}}
                    {{/each}}
                    <div class="profile-password">
                        <h3>Изменить пароль</h3>
                        {{#each passwordFields}}
                            {{{ this }}}
                        {{/each}}
                    </div>
                    <div class="profile-actions">
                        {{{ Button }}}
                    </div>
                </form>
            </div>        
        </div>
        `;
  }
}
