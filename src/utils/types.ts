export type Props = {
    [key: string]: any;
    events?: {
        [key: string]: (event: Event) => void;
    };
};
export type Meta = {
    tagName: string;
    props?: Props;
};
