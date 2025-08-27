import Block from './block';

export type Props = {
  [key: string]: unknown | Record<string, Block[]>;
  settings?: {
    withInternalId?: boolean;
  };
  attr?: object;
  events?: {
        [key: string]: (event: Event) => void;
    };
};

export type Meta = {
    tagName: string;
    props?: Props;
};
