import Handlebars from 'handlebars';
import { nanoid } from 'nanoid'; // генератор id
import EventBus from './event-bus';
import type { Meta, Props } from './types';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  protected _element: HTMLElement | null = null;

  private _refs: Record<string, HTMLElement> = {};

  private _meta: Meta = {
    tagName: 'div',
  };

  private _id = nanoid(6);

  protected props: Props;

  private eventBus: () => EventBus;

  children: Record<string, Block | Block[]> = {};

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected _init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _getChildrenAndProps(childrenAndProps: Props): { props: Props; children: Record<string, Block | Block[]> } {
    const children: Record<string, Block | Block[]> = {};
    const props: Props = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const blockChildren = value.filter((item) => item instanceof Block);
        const otherProps = value.filter((item) => !(item instanceof Block));

        if (blockChildren.length > 0) {
          children[key] = blockChildren;
        }
        if (otherProps.length > 0) {
          props[key] = otherProps;
        }
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName, props } = this._meta;
    this._element = this._createDocumentElement(tagName);
    if (typeof props?.className === 'string') {
      const classes = props.className.split(' ');
      this._element.classList.add(...classes);
    }
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  protected componentDidMount(): void {}

  public dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  public setProps = (nextProps: Props): void => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);

    this.componentDidUpdate(oldProps, this.props);
  };

  public getProps(): Props {
    return this.props;
  }

  get element() {
    return this._element;
  }

  private _render(): void {
    this._removeEvents();
    const block = this._compile();

    if (this._element?.childNodes.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element?.replaceChildren(block);
    }

    this._addEvents();
    this._addEventsToRefs();
    this._addAttrs();
    this.componentDidMount();
  }

  private _removeEvents(): void {
    const { events = {} } = this.props;

    if (events && this._element) {
      Object.entries(events).forEach(([eventName, handler]) => {
        // const eventType = eventName.toLowerCase().replace('on', '');
        this._element?.removeEventListener(eventName, handler as (event: Event) => void);
      });
    }
  }

  private _compile() {
    const propsAndStubs: Record<string, unknown> = { ...this.props } as Record<string, unknown>;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
          if (stub) {
            const element = component.getContent();
            element && stub?.replaceWith(element);
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
          const element = child.getContent();
          element && stub.replaceWith(element);
        }
      }
    });

    Object.values(this._refs).forEach((ref) => ref.remove());
    this._refs = {};

    Array.from(fragment.content.querySelectorAll('[ref]')).forEach((el) => {
      const refName = el.getAttribute('ref');
      if (refName) {
        this._refs[refName] = el as HTMLElement;
      }
    });

    return fragment.content;
  }

  private _addEvents(): void {
    const { events } = this.props;

    if (events && this._element) {
      Object.entries(events).forEach(([eventName, handler]) => {
        const eventType = eventName.toLowerCase();
        this._element?.addEventListener(eventType, handler as (event: Event) => void);
      });
    }
  }

  private _addEventsToRefs(): void {
    const { events } = this.props;

    if (events && this._refs) {
      Object.entries(events).forEach(([eventName, handler]) => {
        const refName = eventName.split(':')[0];
        const eventType = eventName.split(':')[1];

        if (this._refs[refName] instanceof HTMLElement) {
          this._refs[refName].addEventListener(eventType, handler as (event: Event) => void);
        }
      });
    }
  }

  private _addAttrs(): void {
    const { attrs } = this.props;

    if (attrs && this._element) {
      Object.entries(attrs).forEach(([attrName, attrValue]) => {
        this._element?.setAttribute(attrName, attrValue as string);
      });
    }
  }

  protected render(): string {
    return '';
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element not created');
    }
    return this._element;
  }

  private _makePropsProxy(props: Props): Props {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props as any, {
      get(target: Props, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Props, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    if (this.props.settings?.withInternalID) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  public show(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  public hide(): void {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
