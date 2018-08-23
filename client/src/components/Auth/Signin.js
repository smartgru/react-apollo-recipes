import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { SIGNIN_USER } from '../../queries';

const initialState = {
  username: '',
  password: '',
};

class Signin extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({
      ...initialState,
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e, signinUser) => {
    e.preventDefault();

    signinUser().then(data => {
      console.log(data);
      this.clearState();
    });
  };

  validateForm = () => {
    const { username, password } = this.state;
    return !username || !password;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signin</h2>

        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {
            return (
              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, signinUser)}
              >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={username}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={password}
                />

                <button
                  disabled={loading || this.validateForm()}
                  type="submit"
                  className="button-primary"
                >
                  Submit
                </button>

                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Signin;
