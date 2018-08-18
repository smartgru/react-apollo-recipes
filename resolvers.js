exports.resolvers = {
  Query: {
    getAllRecipes: () => {},
  },

  Mutation: {
    addRecipe: async (
      root, // parent
      { name, category, description, instructions, username }, // args
      { Recipe }, // context
    ) => {
      const newRecipe = await new Recipe({
        name,
        category,
        description,
        instructions,
        username,
      }).save();

      return newRecipe;
    },
  },
};
