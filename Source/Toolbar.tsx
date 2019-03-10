import React from "react";
import {BaseComponent} from "react-vextensions";
import Icons from "./Icons";
import {ApplyFormat} from "./Formatter";
import {Button, Row} from "react-vcomponents";

export class MarkdownToolbar extends BaseComponent<{enabled?: boolean, editor: ()=>any, excludeCommands?: string[]}, {}> {
	render() {
		let {enabled, editor, excludeCommands, children} = this.props;
		excludeCommands = excludeCommands || [];

		let commands = [
			{name: "h1", label: "H1"},
			{name: "h2", label: "H2"},
			{name: "h3", label: "H3"},
			{name: "h4", label: "H4"},
			{name: "bold", label: "b"},
			{name: "italic", label: "i"},
			{name: "oList", label: "ol"},
			{name: "uList", label: "ul"},
			{name: "quote", label: "q"},
			{name: "link", label: "a"},
		];
		return (
			<Row style={{marginTop: 3, marginBottom: 3}}>
				{commands.filter(a=>excludeCommands.indexOf(a.name) == -1).map((command, index)=> {
					return <ToolBarButton key={index} enabled={enabled} editor={editor} command={command.name} label={command.label} first={index == 0}/>;
				})}
				{children}
			</Row>
		);
	}
}

type ButtonProps = {enabled: boolean}; // "import" approach causes typescript rebuilds to fail (for some reason)
class ToolBarButton extends BaseComponent<{editor: ()=>any, command: string, label: string, first?: boolean} & ButtonProps, {}> {
	render() {
		let {editor, command, label, first, ...rest} = this.props;
		let icon = Icons[command];
		return (
			<Button {...rest as any} width={24} height={24} ml={first ? 0 : 5} style={{whiteSpace: "pre"}}
					onClick={()=> {
						ApplyFormat(editor().codeMirror, command);
					}}>
				{icon
					? <span dangerouslySetInnerHTML={{__html: icon}} className="MDEditor_toolbarButton_icon"
						style={{position: "relative"}} // fix for odd icon-disappearing issue
					/>
					: label}
			</Button>
		);
	}
}