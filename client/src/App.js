import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { List } from "./components/List";
import { Account } from "./components/Account";

class App extends Component {
  state = { email: null };
  constructor(props) {
    super(props);


    this.changeEmail = this.changeEmail.bind(this);
  }

  changeEmail(newEmail) {
    this.setState({
      email: newEmail
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <br />
        <Account changeEmail={this.changeEmail} />
        <List email={this.state.email} />
      </div>
    );
  }
}

export default App;
