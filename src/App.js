import React, {Component} from 'react';
import './App.css';
import _ from 'lodash';
import foodItems from './data/fooditems.js';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
      recipeItems: []
    }
    this.addToRecipe = this.addToRecipe.bind(this);
  }
  
  addToRecipe(event) {
    const id = event.target.name;
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const item = foodItems.find(f => f._id === id);
    console.log('adding', item);
    this.setState({
      selectedItem: item,
      recipeItems: [...this.state.recipeItems].concat(item)
    })
  }
  
  render() {
  
    console.log('fooditems', foodItems);
    const foodItemsByThree = _.chunk(foodItems, 3);
    console.log('by3', foodItemsByThree);
    
    return (
      <div className="App">
        <div className="container">
          {foodItemsByThree.map((frow, i) => {
            return (
                <div
                  className="row"
                  key={i}
                >
                  {frow.map((f, j) => {
                    return (
                        <div
                          className="col-xs-4"
                          key={j}
                        >
                          <h3>
                            {f.name}
                          </h3>
                          <button
                            className="btn btn-primary"
                            onClick={this.addToRecipe}
                            name={f._id}
                          >Add to recipe</button>
                        </div>
                      )
                  })}
                </div>
              )
          })}
          
          <table className="table table-condensed">
            <thead>
              <tr>
                <td>Quantity</td>
                <td>Units</td>
                <td>Item</td>
                <td>Protein</td>
                <td>(units)</td>
                <td>Sugar</td>
                <td>(units)</td>
                <td>Sodium</td>
                <td>(units)</td>
              </tr>
            </thead>
            <tbody>
            {this.state.recipeItems.map((item, i) => {
              return (
                <tr
                  key={i}
                >
                  <td> 1</td>
                  <td>Serving</td>
                  <td style={{textAlign: 'left'}}>{item.name}</td>
                  <td>{item.protein && item.protein.amount}</td>
                  <td>{item.protein && item.protein.units}</td>
                  <td>{item.sugar && item.sugar.amount}</td>
                  <td>{item.sugar && item.sugar.units}</td>
                  <td>{item.sodium && item.sodium.amount}</td>
                  <td>{item.sodium && item.sodium.units}</td>
                </tr>
              )
            })}
            <tr>
              <td colSpan={3}></td>
              {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce */}
              <td>{this.state.recipeItems.reduce((acc, curr, idx, src) => {
                return (
                  acc + (curr.protein && !isNaN(curr.protein.amount) ? curr.protein.amount : 0)
                )
              }, 0)}
              </td>
              <td>g</td>
              <td>{this.state.recipeItems.reduce((acc, curr, idx, src) => {
                return (
                  acc + (curr.sugar && !isNaN(curr.sugar.amount) ? curr.sugar.amount : 0)
                )
              }, 0)}
              </td>
              <td>g</td>
              <td>{this.state.recipeItems.reduce((acc, curr, idx, src) => {
                return (
                  acc + (curr.sodium && !isNaN(curr.sodium.amount) ? curr.sodium.amount : 0)
                )
              }, 0)}
              </td>
              <td>mg</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
}

export default App;
