import React, { PureComponent } from 'react';
import ItemNameDisplay from './ItemNameDisplay';
import { getComponent } from './Selector';
import SimpleEditor from './SimpleEditor';

class ArrayEditor extends PureComponent {
    state = { show: false };

    nameChanged = (value) => this.props.onNameChange(value, this.props.name);

    toggleItems = () => this.setState({ show: !this.state.show });

    itemChanged = (val, field) => {
        let { name, value } = this.props;
        value = [...value];
        value[field] = val;
        this.props.onChange(value, name);
    }

    getSubItems() {
        const { show } = this.state;
        if (!show && !this.keys) { return null; }

        const { value } = this.props;

        if (this.value !== value) {
            this.value = value;
            this.keys = value.map((val, k) => {
                const Component = getComponent(val);

                return <Component key={k}
                    name={k} displayName={k.toString()}
                    value={val}
                    onAddClicked={this.addClicked}
                    onRemoveClicked={this.removeClicked}
                    onChange={this.itemChanged}
                />
            });

            const newItem = <span className="je-icon je-add-new-item" />
            const displayValue = <span className="je-add-item-text" title="Double click to add new item">&lt;&lt;add new item&gt;&gt;</span>
            this.keys.push(<SimpleEditor key="newItem"
                name={value.length} displayName={newItem} value=""
                displayValue={displayValue}
                onChange={this.itemChanged}
            />)
        }

        return (<div className={"je-sub-items " + (show ? '' : ' closed')}>
            {this.keys}
        </div>);
    }

    addClicked = (index) => {
        let { name, value } = this.props;
        value = [...value];
        value.splice(index, 0, null);
        this.props.onChange(value, name);
    }

    removeClicked = (index) => {
        let { name, value } = this.props;
        value = [...value];
        value.splice(index, 1);
        this.props.onChange(value, name);
    }

    render() {
        const { name, value, displayName, onAddClicked, onRemoveClicked } = this.props;

        return (
            <div className="je-item-block je-array">
                <span>
                    <ItemNameDisplay name={name} display={displayName} expanded={this.state.show}
                        onChange={this.nameChanged}
                        onToggle={this.toggleItems}
                        onAddClicked={onAddClicked} onRemoveClicked={onRemoveClicked} />
                    <span className="je-item-value array">Array <span className="array-count" onClick={this.toggleItems}>[{value.length.toString()}]</span></span>
                </span>
                {this.getSubItems()}
            </div>
        );
    }
}

export default ArrayEditor;