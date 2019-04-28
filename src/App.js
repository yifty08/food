import React, {Component} from 'react';
import './App.css';
import _ from 'lodash';
import foodItems from './data/fooditems.js';

class App extends Component {
  
  addToRecipe(event) {
    const id = event.target.name;
    
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    const item = foodItems.find(f => f._id === id);
    console.log('adding', item);
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
          
          <div className="table table-condensed">
        
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
