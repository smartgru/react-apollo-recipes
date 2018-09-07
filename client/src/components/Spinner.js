import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';

export class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <PulseLoader color={'#1eaedb'} size={30} margin={'4px'} />
      </div>
    );
  }
}

export default Spinner;
