This package contains a JSON Editor component which can be used to edit any JSON compatible JavaScript object from within the browser. Currently this implementation is available only for react projects. This is a simple and tiny react component which is just ~16kb (~4kb gz) package and do not have any external dependency except React.

# Live demo:

This component is used in following chrome extension for viewing and editing the objects stored in index db by any websites:

https://chrome.google.com/webstore/detail/dev-assistant-modify-requ/omjocblcimogflgejnnadnmbfmngblmd?utm_source=jec

# Installation:

If you have an existing react application, run the following commands to download the JSON Editor component.
```
npm i react-json-editor@latest --save
```
Once installed you can import this component along with its styles and you are done.

## Sample usage

```jsx
import React, { PureComponent } from 'react';
import JSONEditor from 'react-json-editor';
import 'react-json-editor/css/style.css';

class App extends PureComponent {
    state = {
        objectToEdit: {
            aString: 'Some string',
            aNumber: 123.45,
            aLink: 'https://www.google.com',
            aNull: null,
            anUndefined: undefined,
            object: {
                anArray: [
                    new Date(),
                    { string: 'Some other string' }
                ]
            }
        }
    };

    setValue = (value) => this.setState({ objectToEdit: value });

    render() {
        const { objectToEdit } = this.state;

        return (
            <JSONEditor
                value={objectToEdit}
                onChange={this.setValue}
            />
        );
    }
}

export default App;
```

## Sample Output

![alt](/JE_Sample.PNG)

## Features:
* Supports viewing JS Object / JSON in tree format.
* Supports editing datatypes like String, Number, DateTime, Object, Array, null & undefined.
* Supports expanding and collapsing of Array and Objects
* Can automatically identify what type of data is being entered by the user and automatically convert the data to appropriate datatype.
* Support editing any property name or values of both objects and array's.
* Support inserting of new item or removing an existing item from an array.
* Support adding a new property or remove an existing property from an object.
* Identify the url stored as value and highlight it for visual difference.
* Easily customize colors, styles, size and icons by just overriding the css.

## Usage:

This component can be used in your page where you would like the JSON Editor to be rendered to the end user. This component would expect the JavaScript object to be passed as value. Raw JSON is not accepted and instad would be considered as a string. If you currently have the JSON string, then use JSON.parse() function to parse the JSON and then pass the resulting object to this component.

| Params | Type | Default | Usage | Description |
| ------ | ---- | ------------- | ----- | ----------- |
| value | any | - | required | The Javascript object to be edited. This can be any object which is JSON compatible |
| onChange | function | - | required | A callback function which would be called everytime the object is edited by the user |
| ***editable* | bool | - | optional | This would let you to disable editing of the object and make the object readonly  |
| ***allowRemove* | bool | - | optional | This would let you control if the user is allowed to remove the existing properties or not.  |
| ***allowInsert* | bool | - | optional | This would let you control if the user is allowed to create a new property or not.  |
| ***isValidName* | function | - | optional | This callback would help to validate if the user had provided a valid key name. This function would receive two params (i.e. name and path). Should return a boolean value indicating if the name is accepted or can return a modified name to set the new name |
| ***parseValue* | function | - | optional | This callback would be called with the data the user has provided. You can parse the data and return appropriate object back. If this callback is used then datatype will not be auto detected. Instead, the value returned will be set. |

** Marked properties are not yet available for usage in the current version and is planned for implementation in upcomming versions. For prioritizing the mentioned features or to suggest a new feature please raise a ticket in GitHub repository.


## Inspiration

Styles are inspired from JSON Viewer component available for Angular: https://www.npmjs.com/package/jsonformatter