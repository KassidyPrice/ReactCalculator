// two types of components
// Class based -- manage state, lifecycle methods
// Functional -- presentational, dumb
import { Component } from "react";
import { evaluate } from "mathjs";

import "./styles.css";
import Input from "./components/Input";
import Button from "./components/Button";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      input: ""
    };

    this.ops = [
      ["7", "8", "9", "/"],
      ["4", "5", "6", "*"],
      ["1", "2", "3", "+"],
      ["0", "^", ".", "-"]
    ];

    // this.handleChange = this.handleChange.bind(this); instead of arrow function
    this.handleEqual = this.handleEqual.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleInput = (val) => {
    this.setState((prevState) => {
      return {
        input: prevState.solution ? val : prevState.input + val,
        solution: false
      };
    });
  };

  handleClear() {
    return this.setState({
      input: "",
      solution: false
    });
  }

  handleEqual() {
    this.setState((prevState) => {
      return {
        input: evaluate(prevState.input),
        solution: true
      };
    });
  }

  renderButtons() {
    return this.ops.map((row, idx) => {
      return (
        <div key={idx} className="row">
          {row.map((char) => {
            return (
              <Button key={char} handleChange={this.handleInput}>
                {char}
              </Button>
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="app">
        <Input input={this.state.input} />

        {this.renderButtons()}
        <div className="row">
          <Button label="clear-btn" handleChange={this.handleClear}>
            Clear
          </Button>
          <Button label="equal-btn" handleChange={this.handleEqual}>
            =
          </Button>
        </div>
      </div>
    );
  }
}
