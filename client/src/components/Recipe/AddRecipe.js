import React from 'react';

class AddRecipe extends React.Component {
  state = {
    name: '',
    instructions: '',
    category: 'Breakfast',
    description: '',
    username: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, category, description, instructions } = this.state;

    return (
      <div className="App">
        <h2 className="App">Add Recipe</h2>
        <form className="form">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Recipe Name"
            onChange={this.handleChange}
          />
          <select name="category" value={category} onChange={this.handleChange}>
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
          <button type="submit" className="button-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default AddRecipe;
