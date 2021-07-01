import React, { PureComponent } from 'react';
import ItemNameDisplay from './ItemNameDisplay';
import ItemValueDisplay from './ItemValueDisplay';

const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

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

        return (
            <div className={"je-item-block je-simple-" + type}>
                <span>
                    <ItemNameDisplay name={name} display={displayName}
                        onChange={this.nameChanged}
                        onAddClicked={onAddClicked} onRemoveClicked={onRemoveClicked} />
                    <ItemValueDisplay type={type} displayValue={displayValue} value={value} onChange={this.valueChanged} />
                </span>
            </div>
        );
    }
}

export default SimpleEditor;