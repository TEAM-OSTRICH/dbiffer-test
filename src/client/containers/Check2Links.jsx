import React, { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom'

class Check2Links extends Component {
  constructor(props) {
    super(props);
    this.state = {
      u1: '',
      u2: '',
      input1: '',
      input2: '',
    };

    this.checkBoth = this.checkBoth.bind(this);
    this.change1 = this.change1.bind(this);
    this.change2 = this.change2.bind(this);
  }


  checkBoth(event) {
    event.preventDefault();
    // part1
    const { input1 } = this.state;
    fetch('/check1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        test: input1,
      }),
    })
      .then(data => data.json())
      .then(data => this.setState({ u1: data }))
      .then(() => {
        // part2
        const { input2 } = this.state;
        fetch('/check2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            test: input2,
          }),
        })
          .then(data => data.json())
          .then(data => this.setState({ u2: data }))
          .then(() => console.log(this.state))

          // original button function
          .then(() => {
            const { u1, u2 } = this.state;
            console.log("u1", u1, "u2", u2)
            if (u1.length > 0 && u2.length > 0) {
              console.log('work!');
              this.props.history.push('/kevin');
            }
          });
      });
  }

  change1(event) {
    this.setState({ input1: event.target.value });
  }

  change2(event) {
    this.setState({ input2: event.target.value });
  }

  render() {

    return (
      <div>
        <h1>DBiffer</h1>
        <form>
          <input id="DbUrl1" value={this.input1} onChange={this.change1} />
          <br />
          <br />
          <input id="DbUrl2" value={this.input2} onChange={this.change2} />
          <br />
          <br />
          <button type="submit" onClick={this.checkBoth}>GO</button>
          {/* <NavLink to="/kevin"><button>kevin</button></NavLink> */}
          {/* <button type="button"><NavLink to="/kevin2"> kevin </NavLink></button> */}
        </form>
      </div>
    );
  }
}

export default withRouter(Check2Links);
