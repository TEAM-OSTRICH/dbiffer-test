import React, { Component } from 'react';
import DbDisplayContainer from './DbDisplayContainer.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldDb: {},
      newDb: {},
      dbDiff: {},
    };
  }

  // componentWillMount() {
  //   fetch('/queryDatabase', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify('postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk'),
  //   })
  //     .then(data => data.json)
  //     .then((schemaInfo) => {
  //       console.log(schemaInfo);
  //     });
  // }

  render() {
    return (
      <div>
        <DbDisplayContainer />
      </div>
    );
  }
}

export default MainContainer;
