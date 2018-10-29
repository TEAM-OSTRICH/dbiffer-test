import React, { Component } from 'react';
import DbDisplayContainer from './containers/DbDisplayContainer.jsx';
import MainContainer from './containers/MainContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MainContainer />
      </div>
    );
  }
}

export default App;
