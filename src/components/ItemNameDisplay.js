import React, { PureComponent } from 'react';

class ItemNameDisplay extends PureComponent {
    state = { editing: false };

    beginEdit = () => this.setState({ editing: true, editText: this.props.name });

    textChanged = ({ currentTarget: { value } }) => this.setState({ editText: value });

    keyPressed = (e) => {
        if (e.keyCode === 13) { // When Enter is pressed
            this.endEdit();
        }
        else if (e.keyCode === 27) { // When Esc is pressed
            this.setState({ editing: false, editText: null });
        }
    }

    endEdit = () => {
        this.props.onChange(this.state.editText, this.props.field);
        this.setState({ editing: false, editText: null });
    }

    onAddClicked = () => this.props.onAddClicked(this.props.name);
    onRemoveClicked = () => this.props.onRemoveClicked(this.props.name);

    render() {
        const { name, display = name, expanded, onToggle, onAddClicked, onRemoveClicked } = this.props;
        const { editing, editText } = this.state;

        const expander = onToggle && <span className={"je-expander" + (expanded ? ' open' : '')} onClick={onToggle} />;

        if (!display) { return expander || null; }

        if (editing) {
            return <span className="je-name-input-container">
                <input type="text" className="je-name-editor-input" autoFocus
                    value={editText}
                    onChange={this.textChanged}
                    onBlur={this.endEdit}
                    onKeyUp={this.keyPressed}
                /> : </span>
        }

        return (
            <span className="je-item-name">
                {expander}
                {!!onAddClicked && <span className="je-icon je-add-new-item" onClick={this.onAddClicked} title="Add new item" />}
                {!!onRemoveClicked && <span className="je-icon je-remove-item" onClick={this.onRemoveClicked} title="Remove this item" />}
                <span onDoubleClick={this.beginEdit}>{display}:</span>
            </span>
        );
    }
}

export default ItemNameDisplay;