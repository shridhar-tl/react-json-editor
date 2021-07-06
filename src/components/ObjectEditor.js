import React, { PureComponent } from 'react';
import ItemNameDisplay from './ItemNameDisplay';
import { getComponent } from './Selector';

class ObjectEditor extends PureComponent {
    state = { show: false };

    nameChanged = (value) => this.props.onNameChange(value, this.props.name);

    toggleItems = () => this.setState({ show: !this.state.show });

    propChanged = (val, field) => {
        let { name, value } = this.props;
        value = { ...value };
        value[field] = val;
        this.props.onChange(value, name);
    }

    nameChanged = (newName, oldName) => {
        newName = newName?.trim();
        if (oldName?.trim() === newName) {
            return false;
        }

        let { name, value } = this.props;

        // If its a duplicate name, then ignore it
        if (value.hasOwnProperty(newName)) {
            return;
        }

        value = { ...value };

        if (oldName) {
            value[newName] = value[oldName];
            delete value[oldName];
        } else {
            value[newName] = null;
        }

        this.props.onChange(value, name);
    }

    removeClicked = (field) => {
        let { name, value } = this.props;
        value = { ...value };
        delete value[field];
        this.props.onChange(value, name);
    }

    getSubItems() {
        const { show } = this.state;
        if (!show && !this.keys) { return null; }

        const {
            value,
            allowEditValue, allowEditKey,
            allowRemove, allowInsert
        } = this.props;

        if (this.value !== value) {
            this.value = value;
            this.keys = Object.keys(value).map(k => {
                const val = value[k];
                const Component = getComponent(val);

                return <Component key={k} name={k} value={val}
                    onChange={this.propChanged}
                    onNameChange={this.nameChanged}
                    onRemoveClicked={allowRemove && this.removeClicked}
                    allowEditValue={allowEditValue}
                    allowEditKey={allowEditKey}
                    allowRemove={allowRemove}
                    allowInsert={allowInsert}
                />
            });

            if (allowInsert) {
                const newItem = <span className="je-icon je-add-new-item" />
                const displayName = <span className="je-add-item-text" title="Double click to add new property">{newItem} &lt;&lt;add new prop&gt;&gt;</span>

                this.keys.push(<div className="je-item-block je-object" key="je-newProp001">
                    <span>
                        <ItemNameDisplay
                            display={displayName}
                            onChange={this.nameChanged}
                            allowEdit={true}
                        />
                        <span className="je-item-value null">null</span>
                    </span>
                </div>);
            }
        }

        return (<div className={"je-sub-items " + (show ? '' : ' closed')}>
            {this.keys}
        </div>);
    }

    render() {
        const {
            name, displayName, onAddClicked, onRemoveClicked,
            allowEditKey, allowRemove, allowInsert
        } = this.props;

        return (
            <div className="je-item-block je-object">
                <span>
                    <ItemNameDisplay name={name} display={displayName} expanded={this.state.show}
                        allowEdit={allowEditKey}
                        onChange={this.nameChanged}
                        onToggle={this.toggleItems}
                        onAddClicked={allowInsert && onAddClicked}
                        onRemoveClicked={allowRemove && onRemoveClicked}
                    />
                    <span className="je-item-value object">Object <span className="object-curly" onClick={this.toggleItems}>{'{'}&hellip;{'}'}</span></span>
                </span>
                {this.getSubItems()}
            </div>
        );
    }
}

export default ObjectEditor;