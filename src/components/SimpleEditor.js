import React, { PureComponent } from 'react';
import ItemNameDisplay from './ItemNameDisplay';
import ItemValueDisplay from './ItemValueDisplay';

const urlPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function isUrl(value) { return !!urlPattern.test(value?.trim()); }

class SimpleEditor extends PureComponent {
    valueChanged = (value) => this.props.onChange(value, this.props.name);
    nameChanged = (value) => this.props.onNameChange(value, this.props.name);

    render() {
        let { name, value, displayName, displayValue, onAddClicked, onRemoveClicked } = this.props;
        let type = typeof value;

        if (value === null) {
            type = 'null';
            value = 'null';
            displayValue = value;
        }
        else if (value === undefined) {
            value = 'undefined';
            displayValue = value;
        }
        else if (type !== "string") {
            displayValue = value.toString();
        }

        if (type === "string" && !displayValue) {
            if (isUrl(value)) {
                displayValue = (<>
                    "<span className="je-url-display">{value}</span>"
                    <a href={value.trim()} target="_blank"
                        rel="noreferrer" className="url-value">
                        <span className="je-icon je-launch-url" title="Click to launch the url" />
                    </a>
                </>);
            }
            else {
                displayValue = <>"<span className="string-value">{value}</span>"</>
            }
        }

        const { allowEditValue, allowEditKey } = this.props;

        return (
            <div className={"je-item-block je-simple-" + type}>
                <span>
                    <ItemNameDisplay name={name} display={displayName}
                        allowEdit={allowEditKey}
                        onChange={this.nameChanged}
                        onAddClicked={onAddClicked} onRemoveClicked={onRemoveClicked} />
                    <ItemValueDisplay
                        allowEdit={allowEditValue} type={type}
                        displayValue={displayValue} value={value}
                        onChange={this.valueChanged} />
                </span>
            </div>
        );
    }
}

export default SimpleEditor;