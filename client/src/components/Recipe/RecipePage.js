import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import LikeRecipe from './LikeRecipe';
import { GET_RECIPE } from '../../queries';

const RecipePage = ({ match }) => {
  const { _id } = match.params;

  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error}</div>;

        const {
          name,
          imageUrl,
          category,
          description,
          instructions,
          username,
          likes,
        } = data.getRecipe;

        return (
          <div className="App">
            <div
              className="recipe-image"
              style={{
                background: `url(${imageUrl}) center center / cover no-repeat`,
              }}
            />

            <div className="recipe">
              <div className="recipe-header">
                <h2 className="recipe-name">
                  <strong>{name}</strong>
                </h2>
                <h5>
                  <strong>{category}</strong>
                </h5>
                <p>
                  Created by <strong>{username}</strong>
                </p>
                <p>{likes}</p>
              </div>
              <blockquote className="recipe-description">
                {description}
              </blockquote>
              <h3 className="recipe-instructions__title">Instructions</h3>
              <div className="recipe-instructions">{instructions}</div>
              <LikeRecipe _id={_id} />
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
