import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import logo from './logo.svg';
import './App.css';

const ddlOptions = [
  { value: 'Grocery', label: 'Grocery' },
  { value: 'Venmo', label: 'Venmo' },
  { value: 'Eat Out', label: 'Eat Out' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Entertainment', label: 'Entertainment' }
]

const defaultOption = { value: '-Select-', label: '-Select-'};

// Fields to capture User input (including Submit button)
const SubmitForm = (
  { handleFormSubmit, formValueName, formValueCategory, formValueAmount, 
    handleFormChangeName, handleFormChangeCategoryDDL, handleFormChangeAmount, 
    labelName, labelCategory, labelAmount, 
    buttonStyle
  }) => (
    <div>
      {labelName}: <input type="text"  style={{ height: '20px', marginRight: '5px'}} onChange={handleFormChangeName} value={formValueName} />
      {labelCategory}: <Dropdown options= {ddlOptions} onChange={handleFormChangeCategoryDDL} value={defaultOption} style={{ border: '1px solid black', height: '20px', marginRight: '5px' }}/>
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
    this.handleFormChangeName = this.handleFormChangeName.bind(this);
    this.handleFormChangeCategoryDDL = this.handleFormChangeCategoryDDL.bind(this);
    this.handleFormChangeAmount = this.handleFormChangeAmount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // Handling functions
   handleFormSubmit(e) { // When Submit is clicked
    const newState = this.state.submittedValues; // Create a new state (empty array)
    newState.push({ name: this.state.formValueName, category: this.state.formValueCategory, amount:this.state.formValueAmount }); // Push data entered by user into the new state array
    this.setState({ submittedValues: newState, formValueName: '', formValueCategory: '', formValueAmount: '' }); // Reset submittedValues to be empty for next set of data
  }

  handleFormChangeName(e) { // When data is entered in Name field, save somewhere
    this.setState({ formValueName: e.target.value });
  }

  handleFormChangeCategoryDDL(valueObj) { // When data is entered in Category field, save somewhere
    this.setState({ formValueCategory: valueObj.value });
    //console.log(e)
  }

  handleFormChangeAmount(e) { // When data is entered in Amount field save somewhere
    this.setState({ formValueAmount: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <div style={{ fontSize: '75px', textAlign: 'center' }}>Show Me the Money!</div> { /* Title */ }
        <SubmitForm
          handleFormSubmit={this.handleFormSubmit}
          formValueName={this.state.formValueName}
          formValueCategory={this.state.formValueCategory}
          formValueAmount={this.state.formValueAmount}
          handleFormChangeName={this.handleFormChangeName}
          handleFormChangeCategoryDDL={this.handleFormChangeCategoryDDL}
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
