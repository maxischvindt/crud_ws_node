import React from "react";
import axios from "axios";
import config from "../config";

export class List extends React.Component {
  state = { accounts: []};

  getData() {
    axios.get(`${config.web_service}/list-account`).then((res) => {
        if (res.data.result) {
          this.setState({ accounts: res.data.accounts });
        }
    });
  }

  /* Firt time - getData */
  componentDidMount() {
    this.getData();
  }
  
  /* When change props - 'email' */
  componentWillReceiveProps() {
    this.getData();
  }

  render() {
    
    return (
      <div className="ContentList">
        <ul className="list-group">
          {this.state.accounts.map((account) => (
            <li className="list-group-item" key={account.id}>{account.email}</li>
          ))}
        </ul>
      </div>
    );
  }
}
