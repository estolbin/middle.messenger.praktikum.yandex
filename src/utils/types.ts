export type Props<T = Record<string, unknown>> = {
    [key: string]: T[keyof T];
} & {
    events?: {
        [key: string]: (event: Event) => void;
    };
};
export type Meta = {
    tagName: string;
    props?: Props;
};
