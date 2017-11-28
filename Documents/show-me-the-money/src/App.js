import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import PieChart from 'react-simple-pie-chart';
import logo from './logo.svg';
import './App.css';

// options for Category DDL (and their values)
const ddlOptions = [
  { value: 'Grocery', label: 'Grocery' },
  { value: 'Venmo', label: 'Venmo' },
  { value: 'EatOut', label: 'Eat Out' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Entertainment', label: 'Entertainment' }
]

// default option to populate in Category DDL (can't be an actual selection)
const defaultOption = { value: '-Select-', label: '-Select-'};

// Fields to capture User input (including Submit button)
const SubmitForm = (
  { handleFormSubmit, formValueName, formValueCategory, formValueAmount, 
    handleFormChangeName, handleFormChangeCategoryDDL, handleFormChangeAmount, 
    labelName, labelCategory, labelAmount, totalSpent,
    buttonStyle
  }) => (
    <div style={{ paddingLeft: '10px' }}>
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
  <div style={{ display:'inline-block' }}>
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
      totalSpent: 0,          // running tally of all amounts
      catValues: {
        Grocery: 0,             // counts of all category types (initialized to zero)
        Venmo: 0,
        EatOut: 0,
        Bills: 0,
        Entertainment: 0
      },
      catTotals: {
        Grocery: 0,
        Venmo: 0,
        EatOut: 0,
        Bills: 0,
        Entertainment: 0
      }
    };

    // Bindings
    this.handleFormChangeName = this.handleFormChangeName.bind(this);
    this.handleFormChangeCategoryDDL = this.handleFormChangeCategoryDDL.bind(this);
    this.handleFormChangeAmount = this.handleFormChangeAmount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // Handling functions
  
  handleFormSubmit(e) { // When Submit is clicked
    if(!(this.state.formValueName) ||
        !(this.state.formValueCategory) ||
        !(this.state.formValueAmount)) {
      window.alert("Please enter all required fields marked with an '*'.");
      return false;
    }
    else if(!(parseFloat(this.state.formValueAmount))) {
      window.alert("Amount must be a number.");
      return false;
    }

    const newState = this.state.submittedValues; // create a new state (to change values without affecting the original state accidentally)
    if (this.state.formValueAmount.indexOf('.') === -1) {
      this.state.formValueAmount += '.00';
    }
    const newTotal = this.state.totalSpent + parseFloat(this.state.formValueAmount); // update total
    
    const newCatValues = this.state.catValues; // new object of category values (to record number of categories)
    newCatValues[this.state.formValueCategory] += 1; // increment the specified category as needed

    const newCatTotals = this.state.catTotals; // new object of category totals (to record totals spent in a given category)
    newCatTotals[this.state.formValueCategory] += parseFloat(this.state.formValueAmount); // update given category with new amount

    newState.push({ 
      name: this.state.formValueName, 
      category: this.state.formValueCategory, 
      amount: this.state.formValueAmount
    }); // Push data entered by user into the new state array
    
    this.setState({ 
      submittedValues: newState, 
      formValueName: '', 
      formValueCategory: '', 
      formValueAmount: '', 
      totalSpent: newTotal,
      catValues: newCatValues,
      catTotals: newCatTotals
    }); // Reset submittedValues to be empty for next set of data
  }

  handleFormChangeName(e) { // When data is entered in Name field, save somewhere
    this.setState({ formValueName: e.target.value });
  }

  handleFormChangeCategoryDDL(valueObj) { // When data is entered in Category field, save somewhere
    this.setState({ formValueCategory: valueObj.value });

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
          labelName="Name *"
          labelCategory="Category *"
          labelAmount="Amount ($) *"
          buttonStyle={{ backgroundColor: 'blue', color: 'white', height: '20px', padding: '3px 10px', borderRadius: '4px' }}
        />
        <br /><br /><br /> 
        <div style={{ width: '100%', textAlign: 'left', paddingLeft: '10px' }}>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Name</div>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block' }}>Category</div>
          <div style={{ fontWeight: 'bold', width: '100px', display: 'inline-block', textAlign: 'right' }}>Amount ($)</div>
          <div style={{ width: '100%', display: 'inline-block' }}><Table values={this.state.submittedValues} /></div>
          <div >
            Legend goes here.
            <div style={{ width: '10px', height: '10px', backgroundColor: '#b300b3' }}>
            </div>
          </div>         
        </div> { /* Values submitted by User appear in this table. */ }
        <br /><br />
        <div style={{ width: '100%', textAlign: 'left', paddingLeft: '10px' }}>
          <div style={{ width: '16%', fontWeight: 'bold', display: 'inline-block', textAlign: 'right' }}>Total $$ Spent:</div>
          <div style={{ width: '16%', fontWeight: 'bold', display: 'inline-block', textAlign: 'left', paddingLeft: '43px' }}>{parseFloat(this.state.totalSpent).toFixed(2)}</div>
        </div>
        
        <div style={{ width: '25%', display: 'inline-block' }} ><PieChart slices={[
                {
                  name: 'Grocery',
                  color: '#b300b3',
                  value: ( Object.values(this.state.catValues)[0]/(this.state.submittedValues.length) )*100,
                },
                {
                  name: 'Venmo',
                  color: '#e60000',
                  value: ( Object.values(this.state.catValues)[1]/(this.state.submittedValues.length) )*100,
                },
                {
                  name: 'EatOut',
                  color: '#3366cc',
                  value: ( Object.values(this.state.catValues)[2]/(this.state.submittedValues.length) )*100,
                },
                {
                  name: 'Bills',
                  color: '#00b300',
                  value: ( Object.values(this.state.catValues)[3]/(this.state.submittedValues.length) )*100,
                },
                {
                  name: 'Entertainment',
                  color: '#ff8c1a',
                  value: ( Object.values(this.state.catValues)[4]/(this.state.submittedValues.length) )*100,
                }
              ]}
            />
          </div>
          <div style={{ width: '25%', display: 'inline-block' }}>
            <PieChart slices={[
              {
                name: 'Grocery',
                color: '#b300b3',
                value: ( Object.values(this.state.catTotals)[0]/(this.state.totalSpent) )*100,
              },
              {
                name: 'Venmo',
                color: '#e60000',
                value: ( Object.values(this.state.catTotals)[1]/(this.state.totalSpent) )*100,
              },
              {
                name: 'EatOut',
                color: '#3366cc',
                value: ( Object.values(this.state.catTotals)[2]/(this.state.totalSpent) )*100,
              },
              {
                name: 'Bills',
                color: '#00b300',
                value: ( Object.values(this.state.catTotals)[3]/(this.state.totalSpent) )*100,
              },
              {
                name: 'Entertainment',
                color: '#ff8c1a',
                value: ( Object.values(this.state.catTotals)[4]/(this.state.totalSpent) )*100,
              }
            ]}
            />
          </div>
                 
        
        <br /><br />
          { /*<div> Grocery: { Object.values(this.state.catTotals)[0] } </div>
          <div> Venmo: { Object.values(this.state.catTotals)[1] } </div>
          <div> Eat Out: { Object.values(this.state.catTotals)[2] } </div>
          <div> Bills: { Object.values(this.state.catTotals)[3] } </div>
          <div> Entertainment: { Object.values(this.state.catTotals)[4] } </div> */ }
        </div>
    );
  }
}

export default App;
