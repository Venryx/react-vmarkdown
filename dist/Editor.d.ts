import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/edit/continuelist";
import { BaseComponent } from "react-vextensions";
export declare class MarkdownEditor extends BaseComponent<{
    value: string;
    onChange?: Function;
    options: any;
}, {
    cursorState: any;
    isFocused: boolean;
}> {
    codeMirror: any;
    _currentCodemirrorValue: any;
    getInitialState(): {
        isFocused: boolean;
        cursorState: {};
    };
    componentDidMount(): void;
    getOptions(): any;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: any): void;
    focus(): void;
    focusChanged(focused: any): void;
    updateCursorState(): void;
    codemirrorValueChanged(doc: any, change: any): void;
    render(): JSX.Element;
}
