import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const SubmitForm = ({ handleFormSubmit, formValue, handleFormChange, label, buttonStyle }) => (
  <div>
    {label}: <input type="text"  style={{ height: '20px'}} onChange={handleFormChange} value={formValue} />
    <span style={buttonStyle} onClick={handleFormSubmit}>Submit</span>
  </div> 
)

const Table = ({ values }) => (
  <div>
    {values.map(function(currentValue, index) {
      return(<div style={{ algin: "left"}} key={index}>
        {currentValue}        
      </div>)
    })}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textValue: '',
      formValue: '',
      submittedValue: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ textValue: e.target.value });
  }

  handleFormSubmit(e) {
    const newState = this.state.submittedValue;
    newState.push(this.state.formValue);
    this.setState({ submittedValue: newState, formValue: '' });
  }

  handleFormChange(e) {
    this.setState({ formValue: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <div style={{ fontSize: '75px', textAlign: 'center' }}>Show Me the Money!</div>
        <Table values={this.state.submittedValue} />
        <SubmitForm
          handleFormSubmit={this.handleFormSubmit}
          formValue={this.state.formValue}
          handleFormChange={this.handleFormChange}
          label="Label"
          buttonStyle={{ backgroundColor: 'blue', color: 'white', height: '20px', padding: '3px 10px', borderRadius: '4px' }}
        />
      </div>
    );
  }
}

export default App;
