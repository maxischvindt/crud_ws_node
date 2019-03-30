import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { List } from "./components/List";
import { Account } from "./components/Account";

class App extends Component {
  state = { newEmail: null, lastUpdate: 0 };
  constructor(props) {
    super(props);
    this.changeEmail = this.changeEmail.bind(this);
    this.reloadList = this.reloadList.bind(this);
  }

  changeEmail(newEmail) {
    this.setState({
      newEmail: newEmail,
    });
  }

  reloadList(time) {
    this.setState({
      newEmail: null,
      lastUpdate: time,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <br />
        <Account changeEmail={this.changeEmail} reloadList={this.reloadList} />
        <List
          newEmail={this.state.newEmail}
          lastUpdate={this.state.lastUpdate}
        />
      </div>
    );
  }
}

export default App;
