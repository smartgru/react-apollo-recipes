import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e, signupUser) => {
    e.preventDefault();

    signupUser().then(data => {
      console.log(data);
    });
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signup</h2>

        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, signupUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                />

                <button type="submit" className="button-primary">
                  Submit
                </button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signup;
