import classNames from "classnames";
import CM from "codemirror";
import {GetCursorState, ApplyFormat} from "./Formatter";

import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import "codemirror/addon/edit/continuelist";
import "codemirror/addon/scroll/simplescrollbars";
import {MarkdownToolbar} from "./Toolbar";
import {BaseComponent} from "react-vextensions";
import React from "react";
import ReactDOM from "react-dom";

export class MarkdownEditor extends BaseComponent<{value: string, onChange?: Function, options: any, toolbar?: boolean}, {cursorState: any, isFocused: boolean}> {
	static defaultProps = {toolbar: true};
	
	codeMirror;
	_currentCodemirrorValue;
	
	getInitialState() {
		return {
			isFocused: false,
			cursorState: {},
		};
	}

	componentDidMount() {
		this.codeMirror = CM.fromTextArea(ReactDOM.findDOMNode(this.refs.codemirror), this.getOptions());
		this.codeMirror.on("change", this.codemirrorValueChanged);
		this.codeMirror.on("focus", this.focusChanged.bind(this, true));
		this.codeMirror.on("blur", this.focusChanged.bind(this, false));
		this.codeMirror.on("cursorActivity", this.updateCursorState);
		this._currentCodemirrorValue = this.props.value;
	}

	getOptions() {
		return Object.assign({
			mode: "markdown",
			lineNumbers: false,
			indentWithTabs: true,
			tabSize: "2",
		}, this.props.options);
	}

	componentWillUnmount() {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	}

	focus() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	}

	focusChanged(focused) {
		this.SetState({isFocused: focused});
	}

	updateCursorState() {
		this.SetState({cursorState: GetCursorState(this.codeMirror)});
	}

	codemirrorValueChanged(doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange && this.props.onChange(newValue);
	}

	render() {
		let {toolbar} = this.props;
		var editorClassName = classNames("MDEditor_editor", {"MDEditor_editor--focused": this.state.isFocused});
		return (
			<div className="MDEditor">
				{toolbar && <MarkdownToolbar editor={()=>this}/>}
				<div className={editorClassName}>
					<textarea ref="codemirror" defaultValue={this.props.value} autoComplete="off" />
				</div>
			</div>
		);
	}
}