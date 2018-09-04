import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import withAuth from '../withAuth';

const initialState = {
  name: '',
  imageUrl: '',
  instructions: '',
  category: 'Breakfast',
  description: '',
  username: '',
};

class AddRecipe extends React.Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({
      ...initialState,
    });
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
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const { name, imageUrl, category, description, instructions } = this.state;
    const isInvalid =
      !name || !imageUrl || !category || !description || !instructions;
    return isInvalid;
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [addRecipe, ...getAllRecipes],
      },
    });
  };

  render() {
    const {
      name,
      imageUrl,
      category,
      description,
      instructions,
      username,
    } = this.state;

    return (
      <Mutation
        mutation={ADD_RECIPE}
        variables={{
          name,
          imageUrl,
          category,
          description,
          instructions,
          username,
        }}
        refetchQueries={() => [
          { query: GET_USER_RECIPES, variables: { username } },
        ]}
        update={this.updateCache}
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
                <input
                  type="text"
                  name="imageUrl"
                  value={imageUrl}
                  placeholder="Image"
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

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddRecipe),
);
