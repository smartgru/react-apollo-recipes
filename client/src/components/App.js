import React from 'react';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries';

import './App.css';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        console.log(data);
        return (
          <ul>
            {data.getAllRecipes.map(recipe => (
              <li key={recipe._id}>
                <h4>{recipe.name}</h4>
                <p>
                  <strong>{recipe.category}</strong>
                </p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
