import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getComponent } from './Selector';
import './Style.scss';

class JSONEditor extends PureComponent {
    valueChanged = (value) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(value);
        }
    }

    render() {
        const { value } = this.props;
        const Component = getComponent(value);

        return (
            <div className="je-object-editor">
                <Component value={value} onChange={this.valueChanged} />
            </div>
        );
    }
}

JSONEditor.propTypes = {
    value: PropTypes.object
};

export default JSONEditor;