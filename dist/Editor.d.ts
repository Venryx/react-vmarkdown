/// <reference types="react" />
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/addon/edit/continuelist.js";
import "codemirror/addon/scroll/simplescrollbars.js";
import { BaseComponent } from "react-vextensions";
export declare class MarkdownEditor extends BaseComponent<{
    value: string;
    onChange?: Function;
    options: any;
    toolbar?: boolean;
}, {
    cursorState: any;
    isFocused: boolean;
}> {
    static defaultProps: {
        toolbar: boolean;
    };
    codeMirror: any;
    _currentCodemirrorValue: any;
    getInitialState(): {
        isFocused: boolean;
        cursorState: {};
    };
    ComponentDidMount(): void;
    getOptions(): any;
    ComponentWillUnmount(): void;
    ComponentWillReceiveProps(nextProps: any): void;
    focus(): void;
    focusChanged(focused: any): void;
    updateCursorState(): void;
    codemirrorValueChanged(doc: any, change: any): void;
    render(): JSX.Element;
}
