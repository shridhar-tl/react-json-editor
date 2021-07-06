import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getComponent } from './Selector';
import './Style.scss';

class JSONEditor extends PureComponent {
    valueChanged = (value) => {
        const { onChange, args } = this.props;

        if (onChange) {
            onChange(value, args);
        }
    }

    render() {
        const {
            value, onChange,
            allowEditValue = true, allowEditKey = true,
            allowRemove = true, allowInsert = true
        } = this.props;
        const Component = getComponent(value);

        return (
            <div className="je-object-editor">
                <Component value={value} onChange={this.valueChanged}
                    allowEditKey={onChange && allowEditKey}
                    allowEditValue={onChange && allowEditValue}
                    allowRemove={onChange && allowRemove}
                    allowInsert={onChange && allowInsert}
                />
            </div>
        );
    }
}

JSONEditor.propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired
};

export { JSONEditor };