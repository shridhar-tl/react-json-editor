import React, { PureComponent } from 'react';
import { JSONEditor } from './components/JSONEditor';
import './App.css';

const sampleObject = {
  string: 'Some string for testing.',
  url: 'https://www.google.com',
  integer: 123456,
  float: 12457.678,
  object: {
    'string': 'Some other testing string'
  },
  datetime: new Date(),
  boolean: false,
  anUndefined: undefined,
  aNull: null,
  anArray: [
    "String inside array",
    12475,
    new Date(),
    null,
    undefined,
    true,
    {
      string: 'Some other testing string inside object',
      aNumber: 124,
      aDate: new Date()
    }
  ]
};

class App extends PureComponent {
  state = { jsObject: sampleObject };

  jsObjChanged = (jsObject) => this.setState({ jsObject });

  render() {
    const { jsObject } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <JSONEditor value={jsObject} onChange={this.jsObjChanged} />
        </header>
      </div>
    );
  }
}

export default App;