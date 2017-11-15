import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import PieChart from 'react-simple-pie-chart';
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
    labelName, labelCategory, labelAmount, totalSpent,
    buttonStyle
  }) => (
    <div>
      {labelName}: <input type="text"  style={{ display: 'inline-block', height: '20px', marginRight: '5px'}} onChange={handleFormChangeName} value={formValueName} />
      {labelCategory}: 
        <div style={{ display: 'inline-block', border: '1px solid black', marginRight: '5px', paddingLeft: '5px', paddingRight: '5px' }}>
          <Dropdown options= {ddlOptions} onChange={handleFormChangeCategoryDDL} value={defaultOption} />
        </div>
      {labelAmount} : <input type="text" style={{ display: 'inline-block', height: '20px', marginRight: '5px' }} onChange={handleFormChangeAmount} value={formValueAmount} />
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
          <div style={{ width: '100px', display: 'inline-block', textAlign: 'right' }}>{currentValue.amount}</div>
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
      submittedValues: [],    // All of the above, used to easily capture all values and pass to Table
      totalSpent: 0           // running tally of all amounts
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
    const newTotal = this.state.totalSpent + parseFloat(this.state.formValueAmount);

    newState.push({ 
      name: this.state.formValueName, 
      category: this.state.formValueCategory, 
      amount: this.state.formValueAmount
    }); // Push data entered by user into the new state array
    
    this.setState({ submittedValues: 
      newState, 
      formValueName: '', 
      formValueCategory: '', 
      formValueAmount: '', 
      totalSpent: newTotal
    }); // Reset submittedValues to be empty for next set of data
    
    this.state.totalSpent = newState.total;
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
        <br /><br /><br />
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
        <br /><br /><br />
        <div style={{ width: '300px', textAlign: 'left' }}>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Name</div>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Category</div>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block', textAlign: 'right' }}>Amount ($)</div>
        </div>
        <Table values={this.state.submittedValues} /> { /* Values submitted by User appear in this table. */ }
        <br /><br />
        <div style={{ width: '300px', textAlign: 'left' }}>
          <div style={{ width: '75%', fontWeight: 'bold', display: 'inline-block', textAlign: 'right' }}>Total $$ Spent:</div>
          <div style={{ width: '25%', fontWeight: 'bold', display: 'inline-block', textAlign: 'right' }}>{this.state.totalSpent}</div>    
        </div>
        <div style={{ width: '250px', display: 'inline-block' }}>
            <PieChart slices={[
              {
                color: '#00000',
                value: 10,
              },
              {
                color: '#ff0000',
                value: 35,
              },
              {
                color: '#f0f',
                value: 55,
              },
            ]}
            />
          </div>
      </div>
    );
  }
}

export default App;
