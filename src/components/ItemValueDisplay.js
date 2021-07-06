import React, { PureComponent } from 'react';

const jsonChars = ['{', '[', '"', "'"];

class ItemValueDisplay extends PureComponent {
    state = { editing: false };

    beginEdit = () => this.setState({ editing: true, editText: this.props.value });

    textChanged = ({ currentTarget: { value } }) => this.setState({ editText: value });

    keyPressed = (e) => {
        if (e.keyCode === 13 && (e.altKey || e.ctrlKey)) { // When Enter is pressed
            e.preventDefault();
            this.endEdit();
        }
        else if (e.keyCode === 27) { // When Esc is pressed
            this.setState({ editing: false, editText: null });
        }
    }

    endEdit = () => {
        const value = this.getFormattedValue();
        this.props.onChange(value, this.props.field);
        this.setState({ editing: false, editText: null });
    }

    getFormattedValue() {
        const { editText } = this.state;
        const { type } = this.props;

        switch (type) {
            case 'number':
                const num = Number(editText);
                if (editText && !isNaN(num)) {
                    return num;
                }
                break;
            case 'date':
                const date = new Date(editText);
                if (editText && !isNaN(date)) {
                    return date;
                }
                break;
            default:
                return this.autoFormatValue(editText);
        }

        return this.autoFormatValue(editText);
    }

    autoFormatValue(editText) {
        const trimmedText = editText.trim();
        if (trimmedText === 'null') {
            return null;
        } else if (trimmedText === 'undefined') {
            return undefined;
        } else if (trimmedText === 'true') {
            return true;
        } else if (trimmedText === 'false') {
            return false;
        }

        const firstChar = trimmedText[0];
        if (jsonChars.includes(firstChar)) {
            try {
                return JSON.parse(trimmedText);
            } catch { }
        }

        const num = Number(trimmedText);
        if (trimmedText && !isNaN(num)) {
            return num;
        }

        const date = new Date(trimmedText);
        if (trimmedText && !isNaN(date)) {
            return date;
        }

        return editText;
    }

    render() {
        const { value, displayValue = value, type, allowEdit } = this.props;
        const { editing, editText } = this.state;

        if (editing) {
            return <span className="je-value-input-container">
                <textarea className="je-value-editor-input"
                    value={editText}
                    onChange={this.textChanged}
                    onBlur={this.endEdit}
                    onKeyUp={this.keyPressed}
                    autoFocus
                ></textarea></span>
        }

        return (<span className={"je-item-value " + type} onDoubleClick={allowEdit && this.beginEdit}>{displayValue}</span>);
    }
}

export default ItemValueDisplay;