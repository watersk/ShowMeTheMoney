import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const SubmitForm = (
  { handleFormSubmit, formValueName, formValueCategory, formValueAmount, 
    handleFormChangeName, handleFormChangeCategory, handleFormChangeAmount, 
    labelName, labelCategory, labelAmount, 
    buttonStyle }) => (
  <div>
    {labelName}: <input type="text"  style={{ height: '20px', marginRight: '5px'}} onChange={handleFormChangeName} value={formValueName} />
    {labelCategory}: <input type="text" style={{ height: '20px', marginRight: '5px' }} onChange={handleFormChangeCategory} value={formValueCategory} />
    {labelAmount} : <input type="text" style={{ height: '20px', marginRight: '5px' }} onChange={handleFormChangeAmount} value={formValueAmount} />
    <span style={buttonStyle} onClick={handleFormSubmit}>Submit</span>
  </div> 
)

const Table = ({ values }) => (
  <div>
    {values.map(function(currentValue, index) {
      return(<div style={{ align: "left"}} key={index}>
        {currentValue.name}        
      </div>)
    })}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textValue: '',
      formValueName: '',
      formValueCategory: '',
      formValueAmount: '',
      submittedValues: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleFormChangeName = this.handleFormChangeName.bind(this);
    this.handleFormChangeCategory = this.handleFormChangeCategory.bind(this);
    this.handleFormChangeAmount = this.handleFormChangeAmount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInput(e) {
    this.setState({ textValue: e.target.value });
  }

  handleFormSubmit(e) {
    const newState = this.state.submittedValues;
    newState.push({ name: this.state.formValueName, category: this.state.formValueCategory, amount:this.state.formValueAmount });
    this.setState({ submittedValues: newState, formValueName: '', formValueCategory: '', formValueAmount: '' });
  }

  handleFormChangeName(e) {
    this.setState({ formValueName: e.target.value });
  }

  handleFormChangeCategory(e) {
    this.setState({ formValueCategory: e.target.value });
  }

  handleFormChangeAmount(e) {
    this.setState({ formValueAmount: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <div style={{ fontSize: '75px', textAlign: 'center' }}>Show Me the Money!</div>
        <Table values={this.state.submittedValues} />
        <SubmitForm
          handleFormSubmit={this.handleFormSubmit}
          formValueName={this.state.formValueName}
          formValueCategory={this.state.formValueCategory}
          formValueAmount={this.state.formValueAmount}
          handleFormChangeName={this.handleFormChangeName}
          handleFormChangeCategory={this.handleFormChangeCategory}
          handleFormChangeAmount={this.handleFormChangeAmount}
          labelName="Name"
          labelCategory="Category"
          labelAmount="Amount ($)"
          buttonStyle={{ backgroundColor: 'blue', color: 'white', height: '20px', padding: '3px 10px', borderRadius: '4px' }}
        />
      </div>
    );
  }
}

export default App;
