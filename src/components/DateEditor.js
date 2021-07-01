import React, { PureComponent } from 'react';
import ItemNameDisplay from './ItemNameDisplay';
import ItemValueDisplay from './ItemValueDisplay';

class DateEditor extends PureComponent {
    valueChanged = (value) => this.props.onChange(value, this.props.name);
    nameChanged = (value) => this.props.onNameChange(value, this.props.name);

    render() {
        let { name, value, displayName, onAddClicked, onRemoveClicked } = this.props;

        return (
            <div className="je-item-block je-date">
                <span>
                    <ItemNameDisplay name={name} display={displayName}
                        onChange={this.nameChanged}
                        onAddClicked={onAddClicked} onRemoveClicked={onRemoveClicked} />
                    <ItemValueDisplay type="date" value={value.toJSON()} onChange={this.valueChanged} />
                </span>
            </div>
        );
    }
}

export default DateEditor;