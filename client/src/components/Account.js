import React from "react";
import axios from "axios";
import config from "../config";

export class Account extends React.Component {
  state = {
    disabled: "disabled",
    emailValid: false,
    editAccountId: null,
    editEmail: null,
  };
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  createAccount(email) {
    axios
      .post(`${config.web_service}/create-account`, { email })
      .then((response) => {
        if (response.data.result) {
          this.props.reloadList(Math.floor(Date.now()));
          this.input.value = "";
        } else {
          alert("Duplicate email");
        }
      });
  }

  /* Submit email, clean input and changeEmail to update list with emails */
  handleSubmit(e) {
    if (this.state.emailValid) this.createAccount(this.input.value);

    e.preventDefault();
  }

  /* Validate email and enable o disable submit button */
  handleEmailInput(e) {
    const email = this.input.value;
    let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let disabled = emailValid ? "" : "disabled";
    this.setState({ disabled, emailValid });
    if (emailValid) {
      this.props.changeEmail(this.input.value);
    } else {
      this.props.changeEmail(null);
    }
  }

  render() {
    return (
      <div className="ContentAccount">
        <form onSubmit={this.handleSubmit}>
          <div className="form-row align-items-center">
            <div className="col-sm-10 my-1">
              <label className="sr-only" htmlFor="inlineFormInputGroupUsername">
                Email
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  ref={(input) => (this.input = input)}
                  placeholder="youremail@amazing.com"
                  onChange={(event) => this.handleEmailInput(event)}
                />
              </div>
            </div>
            <div className="col-auto my-1">
              <input
                type="submit"
                value="Submit"
                disabled={this.state.disabled}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
