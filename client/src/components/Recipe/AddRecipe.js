import React from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { ADD_RECIPE } from '../../queries';

class AddRecipe extends React.Component {
  state = {
    name: '',
    instructions: '',
    category: 'Breakfast',
    description: '',
    username: '',
  };

  componentDidMount = () => {
    this.setState({
      username: this.props.session.getCurrentUser.username,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e, addRecipe) => {
    e.preventDefault();

    addRecipe().then(({ data }) => {
      console.log(data);
    });
  };

  validateForm = () => {
    const { name, category, description, instructions } = this.state;
    const isInvalid = !name || !category || !description || !instructions;
    return isInvalid;
  };

  render() {
    const { name, category, description, instructions, username } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{ name, category, description, instructions, username }}
      >
        {(addRecipe, { data, loading, error }) => {
          return (
            <div className="App">
              <h2 className="App">Add Recipe</h2>
              <form
                className="form"
                onSubmit={e => this.handleSubmit(e, addRecipe)}
              >
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Recipe Name"
                  onChange={this.handleChange}
                />
                <select
                  name="category"
                  value={category}
                  onChange={this.handleChange}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
                <input
                  type="text"
                  name="description"
                  value={description}
                  placeholder="Add Description"
                  onChange={this.handleChange}
                />
                <textarea
                  name="instructions"
                  value={instructions}
                  cols="30"
                  placeholder="Add Instructions"
                  onChange={this.handleChange}
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
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default AddRecipe;
