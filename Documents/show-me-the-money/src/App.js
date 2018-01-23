import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Popover from 'material-ui/Popover';
import {List, ListItem} from 'material-ui/List';
import logo from './logo.svg';
import './App.css';

// options for Category DDL (and their values)
const ddlOptions = [
  { value: 'Grocery', label: 'Grocery' },
  { value: 'Venmo', label: 'Venmo' },
  { value: 'EatOut', label: 'Eat Out' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Entertainment', label: 'Entertainment' }
];

// array of objects for colors associated with the pie chart
const pieColors = 
  { Grocery: '#b300b3', 
    Venmo: '#e60000',
    EatOut: '#3366cc',
    Bills: '#00b300' ,
    Entertainment: '#ff8c1a'
  };

const styles = {
  cardWidth: {
    marginLeft: '10%',
    marginRight: '10%'
  },
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    textAlign: 'center'
  },
  other: {
    marginLeft:20
  },
  displayList: {
    initiallyOpen: SVGComponentTransferFunctionElement
  }
};

// Fields to capture User input (including Submit button)
const SubmitForm = (
  { handleFormSubmit, formValueName, formValueCategory, formValueAmount, 
    handleFormChangeName, handleFormChangeCategoryDDL, handleFormChangeAmount, totalSpent
  }) => (
    <div>
      <Paper zDepth={2}>
        <TextField
          id='name'
          name='Name'
          type='Name'
          hintText="Name"
          style={styles.other}
          underlineShow={false}
          onChange={handleFormChangeName}
          value={formValueName}
        />
        <Divider />
        <SelectField
          hintText="Category"
          style={styles.other}
          underlineShow={false}
          value={formValueCategory}
          onChange={handleFormChangeCategoryDDL}>
          <MenuItem value={ddlOptions[0].value} primaryText={ddlOptions[0].label} />
          <MenuItem value={ddlOptions[1].value} primaryText={ddlOptions[1].label} />
          <MenuItem value={ddlOptions[2].value} primaryText={ddlOptions[2].label} />
          <MenuItem value={ddlOptions[3].value} primaryText={ddlOptions[3].label} />
          <MenuItem value={ddlOptions[4].value} primaryText={ddlOptions[4].label} />
        </SelectField>
        <Divider />
        <TextField
          id='amount'
          name='Amount'
          type='amount'
          hintText="Amount"
          style={styles.other}
          underlineShow={false}
          onChange={handleFormChangeAmount}
          value={formValueAmount}
        />
        <Divider />
      </Paper>
      <br />
      <RaisedButton label="Add"
        primary={true}
        onClick={handleFormSubmit}
        fullWidth={true}
      />
    </div> 
)

// Table component maps values entered into a table to show records
const TableData = ({ values }) => (
  <Table fixedHeader={true}>
    <TableHeader enableSelectAll={true}>
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Category</TableHeaderColumn>
        <TableHeaderColumn>Amount</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={true} stripedRows={true}>
    {values.map(function(currentValue, index) {
      return(
          <TableRow striped={true}> key={index}>
            <TableRowColumn>{currentValue.name}</TableRowColumn>
            <TableRowColumn>{currentValue.category}</TableRowColumn>
            <TableRowColumn>{currentValue.amount}</TableRowColumn>
          </TableRow>
      )})}
    </TableBody>
  </Table>
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
      },
      open: false,
    };

    // Bindings
    this.handleFormChangeName = this.handleFormChangeName.bind(this);
    this.handleFormChangeCategoryDDL = this.handleFormChangeCategoryDDL.bind(this);
    this.handleFormChangeAmount = this.handleFormChangeAmount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
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

  handleFormChangeCategoryDDL(event, index, value) { // When data is entered in Category field, save somewhere
    this.setState({ formValueCategory: value });
  }

  handleFormChangeAmount(e) { // When data is entered in Amount field save somewhere
    this.setState({ formValueAmount: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            title="Show Me The Money!"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <br />
          <br />
          <Card style={styles.cardWidth}
            expanded={true}
            >
            <CardHeader
              title="Submit Transaction"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <SubmitForm
                handleFormSubmit={this.handleFormSubmit}
                formValueName={this.state.formValueName}
                formValueCategory={this.state.formValueCategory}
                formValueAmount={this.state.formValueAmount}
                handleFormChangeName={this.handleFormChangeName}
                handleFormChangeCategoryDDL={this.handleFormChangeCategoryDDL}
                handleFormChangeAmount={this.handleFormChangeAmount}
              />
            </CardText>
          </Card>
          <br />
          <br />
          <Card style={styles.cardWidth}>
            <CardHeader
              title="Added Transactions"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              { this.state.submittedValues.length===0 ? <div style={{ textAlign: 'center' }}>No Data to Show</div> :
                <TableData values={this.state.submittedValues} />
              }
            </CardText>
          </Card>
          <br />
          <br />
          <Card style={styles.cardWidth}>
            <CardHeader
              title="Transaction Analysis"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              { this.state.submittedValues.length===0 ? <div style={{ textAlign: 'center' }}>No Data to Show</div> : 
                <Tabs>
                  <Tab label="Category" style={{whiteSpace: 'normal'}}>
                    <div style={{ marginLeft: '15%', marginTop: '20%', width: '65%' }}>
                      <PieChart slices={[
                        {
                          name: 'Grocery',
                          color: '#b300b3',
                          value: ( Object.values(this.state.catValues)[0]/(this.state.submittedValues.length) )*100
                        },
                        {
                          name: 'Venmo',
                          color: '#e60000',
                          value: ( Object.values(this.state.catValues)[1]/(this.state.submittedValues.length) )*100
                        },
                        {
                          name: 'EatOut',
                          color: '#3366cc',
                          value: ( Object.values(this.state.catValues)[2]/(this.state.submittedValues.length) )*100
                        },
                        {
                          name: 'Bills',
                          color: '#00b300',
                          value: ( Object.values(this.state.catValues)[3]/(this.state.submittedValues.length) )*100
                        },
                        {
                          name: 'Entertainment',
                          color: '#ff8c1a',
                          value: ( Object.values(this.state.catValues)[4]/(this.state.submittedValues.length) )*100
                        }
                      ]}
                      />
                    </div>
                  </Tab>
                  <Tab label="Amount By Category" style={{whiteSpace: 'normal'}}>
                    <div style={{ marginLeft: '15%', marginTop: '20%', width: '65%' }}>
                      <PieChart slices={[
                        {
                          name: 'Grocery',
                          color: '#b300b3',
                          value: ( Object.values(this.state.catTotals)[0]/(this.state.totalSpent) )*100
                        },
                        {
                          name: 'Venmo',
                          color: '#e60000',
                          value: ( Object.values(this.state.catTotals)[1]/(this.state.totalSpent) )*100
                        },
                        {
                          name: 'EatOut',
                          color: '#3366cc',
                          value: ( Object.values(this.state.catTotals)[2]/(this.state.totalSpent) )*100
                        },
                        {
                          name: 'Bills',
                          color: '#00b300',
                          value: ( Object.values(this.state.catTotals)[3]/(this.state.totalSpent) )*100
                        },
                        {
                          name: 'Entertainment',
                          color: '#ff8c1a',
                          value: ( Object.values(this.state.catTotals)[4]/(this.state.totalSpent) )*100
                        }
                      ]}
                      />
                    </div>
                  </Tab>
                </Tabs>
              }
              <br />
              { this.state.submittedValues.length===0 ? <div /> :
                  <div>
                    <Menu style={{ marginLeft: '10%', marginRight: '10%' }} >
                      <MenuItem value="Grocery"
                        style={styles.displayList}
                        primaryText={ddlOptions[0].label}
                        leftIcon={
                        < div style={{ width: '15px', height: '15px', backgroundColor: pieColors['Grocery'] }} />
                        }
                        onClick={this.handleClick}
                      />
                      <MenuItem value="Venmo"
                        style={styles.displayList}
                        primaryText={ddlOptions[1].label}
                        leftIcon={
                          <div style={{ width: '15px', height: '15px', backgroundColor: pieColors['Venmo'] }} />
                        }
                        onClick={this.handleClick}
                      />
                      <MenuItem value="EatOut"
                        style={styles.displayList}
                        primaryText={ddlOptions[2].label}
                        leftIcon={
                          <div style={{ width: '15px', height: '15px', backgroundColor: pieColors['EatOut'] }} />
                        }
                        onClick={this.handleClick}
                      />
                      <MenuItem value="Bills"
                        style={styles.displayList}
                        primaryText={ddlOptions[3].label}
                        leftIcon={
                          <div style={{ width: '15px', height: '15px', backgroundColor: pieColors['Bills'] }} />
                        }
                        onClick={this.handleClick}
                      />
                      <MenuItem value="Entertainment"
                        style={styles.displayList}
                        primaryText={ddlOptions[4].label}
                        leftIcon={
                          <div style={{ width: '15px', height: '15px', backgroundColor: pieColors['Entertainment'] }} />
                        }
                        onClick={this.handleClick}
                      />
                    </Menu>
                    <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                      <List>
                        <ListItem primaryText="Test stuff" />
                      </List>
                  </Popover>
                </div>
              }
            </CardText>
          </Card>
        </MuiThemeProvider>
        </div>
    );
  }
}

export default App;
