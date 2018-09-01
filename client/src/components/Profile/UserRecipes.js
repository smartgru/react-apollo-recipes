import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_USER_RECIPES } from '../../queries';

const UserRecipes = ({ username }) => {
  return (
    <Query query={GET_USER_RECIPES} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;
        console.log(data);

        return (
          <ul>
            <h3>Your Recipes</h3>

            {data.getUserRecipes.map(recipe => (
              <li key={recipe._id}>
                <p>
                  <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                </p>
                <p>Likes: {recipe.likes}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
};

export default UserRecipes;
