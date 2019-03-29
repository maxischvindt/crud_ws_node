import React from "react";
import axios from 'axios';

export class List extends React.Component {
    state = {accounts: []}

    render() {
        axios.get(`https://crud-ws-node.herokuapp.com/list-account`).then(res => {
            if(res.data.result) {
                this.setState({accounts: res.data.accounts});
            }
        });
  
        return (
        <div className="ContentList">
            <ul className="list-group">
                {this.state.accounts.map(account =>
                    <li className="list-group-item">{account.email}</li>
                )}
            </ul>
            {this.state.accounts.length}
        </div>
        );
    }
}