import React, { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';

class Check2Links extends Component {
  constructor(props) {
    super(props);

    this.checkBoth = this.checkBoth.bind(this);
  }

  checkBoth(event) {
    event.preventDefault();
    // console.log(this.props);
    const {
      input1, input2, u1, u2, updateU1, updateU2,
    } = this.props;
    // part1
    fetch('/check1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        test: input1,
      }),
    })
      // .then(data => data.json())
      // .then(data => updateU1(data))
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
        // part2
          fetch('/check2', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
              test: input2,
            }),
          })
          // .then(data => data.json())
          // .then(data => updateU2(data))
          // .then(() => console.log(this.state))

          // original button function
            .then((response) => {
              if (response.status === 200) {
              // console.log('u1', u1, 'u2', u2);
              // if (u1.length > 0 && u2.length > 0) {
                console.log('work!');
                this.props.history.push('/kevin');
              } else {
                alert('Ge so smart');
              }
            // }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert('Ges mistake');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      input1, input2, change1, change2,
    } = this.props;
    const { checkBoth } = this;

    return (
      <div>
        <h1>DBiffer</h1>
        <form>
          <input id="DbUrl1" value={input1} onChange={change1} />
          <br />
          <br />
          <input id="DbUrl2" value={input2} onChange={change2} />
          <br />
          <br />
          <button type="submit" onClick={checkBoth}>GO</button>
          {/* <NavLink to="/kevin"><button>kevin</button></NavLink> */}
          {/* <button type="button"><NavLink to="/kevin2"> kevin </NavLink></button> */}
        </form>
      </div>
    );
  }
}

export default withRouter(Check2Links);
