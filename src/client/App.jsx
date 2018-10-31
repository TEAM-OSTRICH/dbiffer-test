import React, { Component } from 'react';
import DbDisplayContainer from './containers/DbDisplayContainer';
import MainContainer from './containers/MainContainer';
import Check2Links from './containers/Check2Links';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



class App extends Component {
  constructor(props) {
    super(props);    
  }

  render() {
    
    return (
      <BrowserRouter>
        <div>
          <Switch>

            <Route path="/kevin" component={MainContainer} />
            <Route path="/" component={Check2Links} />
          </Switch>
        </div>
      </BrowserRouter>
      // <div>
      //   <MainContainer />
      //   <Check2Links />
      // </div>
    );
  }
}

export default App;
