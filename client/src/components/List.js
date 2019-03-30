import React from "react";
import axios from "axios";
import config from "../config";

export class List extends React.Component {
  state = { accounts: [], newEmail: null, lastUpdate: null };
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
  }

  getAccounts() {
    axios.get(`${config.web_service}/list-account`).then((res) => {
      if (res.data.result) {
        this.setState({ accounts: res.data.accounts });
      }
    });
  }

  deleteAccount(id, email) {
    axios
      .delete(`${config.web_service}/delete-account`, { data: { id, email } })
      .then((res) => {
        if (res.data.result) {
          this.getAccounts();
        }
      });
  }

  editAccount(id, email, newEmail) {
    if (newEmail !== null) {
      axios
        .put(`${config.web_service}/update-account`, { id, email, newEmail })
        .then((res) => {
          if (res.data.result) {
            this.getAccounts();
          } else {
            alert("Duplicate email");
          }
        });
    } else {
      alert("The new email is invalid!");
    }
  }

  /* Firt time - getData */
  componentDidMount() {
    this.getAccounts();
  }

  /* When change props - 'lastUpdate / newEmail' */
  componentWillReceiveProps() {
    if (this.state.lastUpdate !== this.props.lastUpdate) {
      this.getAccounts();
    }
    if (this.props.newEmail) {
      console.log("in event", this.props.newEmail);
      this.setState({ newEmail: this.props.newEmail });
    }
  }

  handleClickDelete(id, email) {
    this.deleteAccount(id, email);
  }

  handleClickEdit(id, email, newEmail) {
    this.editAccount(id, email, newEmail);
  }

  render() {
    let newEmail = this.props.newEmail;
    let editMode = false;
    let disabled = "disabled";
    if (newEmail !== null) {
      disabled = "";
      editMode = true;
    }

    return (
      <div className="ContentList">
        <ul className="list-group">
          {this.state.accounts.map((account) => (
            <li className="list-group-item" key={account.id}>
              <div className="clearfix">
                <div className="list-div-email">{account.email}</div>
                <div className="list-div-actions">
                  <button
                    type="button"
                    onClick={() =>
                      this.handleClickEdit(
                        account.id,
                        account.email,
                        this.props.newEmail
                      )
                    }
                    className="btn btn-primary btn-sm"
                    disabled={disabled}
                  >
                    {editMode ? "Replace by " + newEmail : "Invalid Email"}
                  </button>
                  &nbsp;&nbsp;
                  <button
                    type="button"
                    onClick={() =>
                      this.handleClickDelete(account.id, account.email)
                    }
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
