var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { BaseComponent } from "react-vextensions";
import * as Icons from "./Icons/index.js";
import { ApplyFormat } from "./Formatter.js";
import { Button, Row } from "react-vcomponents";
export class MarkdownToolbar extends BaseComponent {
    render() {
        let { enabled, editor, excludeCommands, children } = this.props;
        excludeCommands = excludeCommands || [];
        let commands = [
            { name: "h1", label: "H1" },
            { name: "h2", label: "H2" },
            { name: "h3", label: "H3" },
            { name: "h4", label: "H4" },
            { name: "bold", label: "b" },
            { name: "italic", label: "i" },
            { name: "oList", label: "ol" },
            { name: "uList", label: "ul" },
            { name: "quote", label: "q" },
            { name: "link", label: "a" },
        ];
        return (React.createElement(Row, { style: { marginTop: 3, marginBottom: 3 } },
            commands.filter(a => excludeCommands.indexOf(a.name) == -1).map((command, index) => {
                return React.createElement(ToolBarButton, { key: index, enabled: enabled, editor: editor, command: command.name, label: command.label, first: index == 0 });
            }),
            children));
    }
}
class ToolBarButton extends BaseComponent {
    render() {
        let _a = this.props, { editor, command, label, first } = _a, rest = __rest(_a, ["editor", "command", "label", "first"]);
        let icon = Icons[command];
        return (React.createElement(Button, Object.assign({}, rest, { width: 24, height: 24, ml: first ? 0 : 5, style: { whiteSpace: "pre" }, onClick: () => {
                ApplyFormat(editor().codeMirror, command);
            } }), icon
            ? React.createElement("span", { dangerouslySetInnerHTML: { __html: icon }, className: "MDEditor_toolbarButton_icon", style: { position: "relative" } })
            : label));
    }
}
//# sourceMappingURL=Toolbar.js.map