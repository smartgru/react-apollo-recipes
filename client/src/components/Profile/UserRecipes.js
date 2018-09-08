import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  GET_USER_RECIPES,
  DELETE_USER_RECIPE,
  GET_ALL_RECIPES,
  GET_CURRENT_USER,
} from '../../queries';
import Spinner from '../Spinner';

class UserRecipes extends React.Component {
  state = {
    name: '',
    imageUrl: '',
    category: '',
    description: '',
    modal: false,
  };

  handleDelete = deleteUserRecipe => {
    const confirmDelete = window.confirm('Are you sure?');

    if (confirmDelete) {
      deleteUserRecipe().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  closeModal = e => {
    this.setState({
      modal: false,
    });
  };

  render() {
    const { username } = this.props;
    const { modal } = this.state;

    return (
      <Query query={GET_USER_RECIPES} variables={{ username }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <div>{error}</div>;

          return (
            <ul>
              {modal && (
                <EditRecipeModal
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                />
              )}
              <h3>Your Recipes</h3>

              {!data.getUserRecipes.length && (
                <p>
                  <strong>You have not added any recipes yet.</strong>
                </p>
              )}

              {data.getUserRecipes.map(recipe => (
                <li key={recipe._id}>
                  <p>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                  </p>
                  <p style={{ marginBottom: 0 }}>Likes: {recipe.likes}</p>
                  <Mutation
                    mutation={DELETE_USER_RECIPE}
                    variables={{ _id: recipe._id }}
                    refetchQueries={() => [
                      { query: GET_ALL_RECIPES },
                      { query: GET_CURRENT_USER },
                    ]}
                    update={(cache, { data: { deleteUserRecipe } }) => {
                      const { getUserRecipes } = cache.readQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                      });

                      cache.writeQuery({
                        query: GET_USER_RECIPES,
                        variables: { username },
                        data: {
                          getUserRecipes: getUserRecipes.filter(
                            recipe => recipe._id !== deleteUserRecipe._id,
                          ),
                        },
                      });
                    }}
                  >
                    {(deleteUserRecipe, attrs = {}) => (
                      <div>
                        <button
                          className="button-primary"
                          onClick={() => this.setState({ modal: true })}
                        >
                          Update
                        </button>
                        <p
                          onClick={() => this.handleDelete(deleteUserRecipe)}
                          className="delete-button"
                        >
                          {attrs.loading ? 'deleting...' : 'X'}
                        </p>
                      </div>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

const EditRecipeModal = ({ handleChange, closeModal }) => (
  <div className="modal modal-open">
    <div className="modal-inner">
      <div className="modal-content">
        <form className="modal-content-inner">
          <h4>Edit Recipe</h4>

          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={handleChange} />

          <label htmlFor="category">Category</label>
          <select name="category" onChange={handleChange}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>

          <label htmlFor="imageUrl">Image</label>
          <input type="text" name="imageUrl" onChange={handleChange} />

          <label htmlFor="description">Description</label>
          <input type="text" name="description" onChange={handleChange} />

          <hr />

          <div className="modal-buttons">
            <button type="submit" className="button-primary">
              Update
            </button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default UserRecipes;
