import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Fields to capture User input (including Submit button)
const SubmitForm = (
  { handleFormSubmit, formValueName, formValueCategory, formValueAmount, 
    handleFormChangeName, handleFormChangeCategory, handleFormChangeAmount, 
    labelName, labelCategory, labelAmount, 
    buttonStyle
  }) => (
    <div>
      {labelName}: <input type="text"  style={{ height: '20px', marginRight: '5px'}} onChange={handleFormChangeName} value={formValueName} />
      {labelCategory}: <input type="text" style={{ height: '20px', marginRight: '5px' }} onChange={handleFormChangeCategory} value={formValueCategory} />
      {labelAmount} : <input type="text" style={{ height: '20px', marginRight: '5px' }} onChange={handleFormChangeAmount} value={formValueAmount} />
      <span style={buttonStyle} onClick={handleFormSubmit}>Submit</span>
    </div> 
)

// Table component maps values entered into a table to show records
const Table = ({ values }) => (
  <div>
    {values.map(function(currentValue, index) {
      return(<div style={{ align: "left", marginRight:'5px'}} key={index}>
        <div style={{ width: '300px', textAlign: 'left' }}>
          <div style={{ width: '100px', display: 'inline-block' }}>{currentValue.name}</div>
          <div style={{ width: '100px', display: 'inline-block' }}>{currentValue.category}</div>
          <div style={{ width: '100px', display: 'inline-block' }}>{currentValue.amount}</div>
        </div>
      </div>)
    })}
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);

    // Various state items needed throughout code
    this.state = {
      formValueName: '',      // Name
      formValueCategory: '',  // Category
      formValueAmount: '',    // Amount
      submittedValues: []     // All of the above, used to easily capture all values and pass to Table
    };

    // Bindings
    this.handleInput = this.handleInput.bind(this);
    this.handleFormChangeName = this.handleFormChangeName.bind(this);
    this.handleFormChangeCategory = this.handleFormChangeCategory.bind(this);
    this.handleFormChangeAmount = this.handleFormChangeAmount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // Handling functions
  handleInput(e) {  // Adjusts the state
    this.setState({ textValue: e.target.value });
  }

  handleFormSubmit(e) { // When Submit is clicked
    const newState = this.state.submittedValues; // Create a new state (empty array)
    newState.push({ name: this.state.formValueName, category: this.state.formValueCategory, amount:this.state.formValueAmount }); // Push data entered by user into the new state array
    this.setState({ submittedValues: newState, formValueName: '', formValueCategory: '', formValueAmount: '' }); // Reset submittedValues to be empty for next set of data
  }

  handleFormChangeName(e) { // When data is entered in Name field, save somewhere
    this.setState({ formValueName: e.target.value });
  }

  handleFormChangeCategory(e) { // When data is entered in Category field, save somewhere
    this.setState({ formValueCategory: e.target.value });
  }

  handleFormChangeAmount(e) { // When data is entered in Amount field save somewhere
    this.setState({ formValueAmount: e.target.value });
  }

  render() {
    return (
      <div className="App">8
        <div style={{ fontSize: '75px', textAlign: 'center' }}>Show Me the Money!</div> { /* Title */ }
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
        <div style={{ width: '300px', textAlign: 'left' }}>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Name</div>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Category</div>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Amount</div>
        </div>
        <Table values={this.state.submittedValues} /> { /* Values submitted by User appear in this table. */ }
      </div>
    );
  }
}

export default App;
