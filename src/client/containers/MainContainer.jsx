import React, { Component } from 'react';
import _ from 'lodash';
import { diff } from 'deep-diff';
import DbDisplayContainer from './DbDisplayContainer.jsx';
import DiffDbDisplayContainer from './DiffDbDisplayContainer.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldDb: [],
      newDb: [],
      diffDb: [],
      oldDbDisplay: true,
      newDbDisplay: false,
      diffDbDisplay: false,
      scriptDisplay: false,
      diffDbColors: [],
    };

    this.changeDisplay = this.changeDisplay.bind(this);
  }

  componentWillMount() {
    // const { input1, input2 } = this.props;
    // console.log(this.props, input1, input2);
    const input1 = 'postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk';
    const input2 = 'postgres://dslgjgaw:vSOX1FK3PujhRKJSgm3lKL_86UADa2CU@stampy.db.elephantsql.com:5432/dslgjgaw';

    // Get old db info.
    fetch('/queryDatabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: input1 }),
    })
      .then(data => data.json())
      .then((schemaInfo) => {
        const { oldDb } = this.state;
        const oldDbCopy = oldDb.slice();

        let currentTableName;
        let table = {};
        // console.log(schemaInfo);
        schemaInfo.forEach((row) => {
          const {
            table_name, column_name, is_nullable, data_type, character_maximum_length, constraint_type, foreign_table_name, foreign_column_name,
          } = row;

          if (currentTableName === undefined) {
            currentTableName = table_name;
            table.name = table_name;
          }

          if (currentTableName !== undefined && currentTableName !== table_name) {
            currentTableName = table_name;
            // Add table to oldDb array.
            oldDbCopy.push(table);
            // Reset table.
            table = {};
            table.name = table_name;
          }

          // Create new column object.
          const column = {};
          column.name = column_name;
          column.dataType = data_type;
          if (data_type === 'character varying') column.dataType = `varchar (${character_maximum_length})`;
          if (constraint_type !== null) column.constraintType = constraint_type;

          // Add new column object to table.
          if (table.columns === undefined) table.columns = [column];
          else table.columns.push(column);
        });

        // Push the last table.
        oldDbCopy.push(table);

        this.setState({ oldDb: oldDbCopy });

        // Get new db info.
        fetch('/queryDatabase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: input2 }),
        })
          .then(data => data.json())
          .then((schemaInfo) => {
            const { newDb } = this.state;
            const newDbCopy = newDb.slice();

            let currentTableName;
            let table = {};
            // console.log(schemaInfo);
            schemaInfo.forEach((row) => {
              const {
                table_name, column_name, is_nullable, data_type, character_maximum_length, constraint_type, foreign_table_name, foreign_column_name,
              } = row;

              if (currentTableName === undefined) {
                currentTableName = table_name;
                table.name = table_name;
              }

              if (currentTableName !== undefined && currentTableName !== table_name) {
                currentTableName = table_name;
                // Add table to newDb array.
                newDbCopy.push(table);
                // Reset table.
                table = {};
                table.name = table_name;
              }

              // Create new column object.
              const column = {};
              column.name = column_name;
              column.dataType = data_type;
              if (data_type === 'character varying') column.dataType = `varchar (${character_maximum_length})`;
              if (constraint_type !== null) column.constraintType = constraint_type;

              // Add new column object to table.
              if (table.columns === undefined) table.columns = [column];
              else table.columns.push(column);
            });

            // Push the last table.
            newDbCopy.push(table);

            this.setState({ newDb: newDbCopy });
          })
          .then(() => {
            const { oldDb, newDb } = this.state;
            const diffDb = JSON.parse(JSON.stringify(newDb));
            const diffDbColors = {};

            // Check additions and modifications.
            oldDb.forEach((table, index) => {
              const foundTable = _.find(diffDb, { name: table.name });

              if (foundTable === undefined) {
                // Table does not exist.
                diffDb.push(table);
                // Add color scheme.
                diffDbColors[`${table.name}`] = 'green';
                // table.columns.forEach((column) => {
                //   diffDbColors[`${table.name}-${column.name}`] = 'green';
                // });
              } else {
                // Table exists.
                // Check columns.
                table.columns.forEach((column) => {
                  const foundColumn = _.find(foundTable.columns, { name: column.name });

                  if (foundColumn === undefined) {
                    // Column does not exist.
                    foundTable.columns.push(column);
                    // Add color scheme.
                    diffDbColors[`${table.name}-${column.name}`] = 'green';
                  } else {
                    // Column exists.
                    // Check properties.
                    const keys = Object.keys(column);

                    keys.forEach((key) => {
                      console.log(foundColumn[key], column[key]);
                      if (foundColumn[key] === undefined) {
                        // Property does not exist.
                        foundColumn[key] = column[key];
                        // Add color scheme.
                        diffDbColors[`${table.name}-${column.name}-${column[key]}`] = 'green';
                      } else if (foundColumn[key] !== column[key]) {
                        // Property has been modified.
                        foundColumn[key] = column[key];
                        // Add color scheme.
                        diffDbColors[`${table.name}-${column.name}-${column[key]}`] = 'yellow';
                      }
                    });
                  }
                });
              }
            });

            // Check deletions.
            diffDb.forEach((table, index) => {
              const foundTable = _.find(oldDb, { name: table.name });

              if (foundTable === undefined) {
                // Table does not exist.
                // Add color scheme.
                diffDbColors[`${table.name}`] = 'red';
                // table.columns.forEach((column) => {
                //   diffDbColors[`${table.name}-${column.name}`] = 'green';
                // });
              } else {
                // Table exists.
                // Check columns.
                table.columns.forEach((column) => {
                  const foundColumn = _.find(foundTable.columns, { name: column.name });

                  if (foundColumn === undefined) {
                    // Column does not exist.
                    // Add color scheme.
                    diffDbColors[`${table.name}-${column.name}`] = 'red';
                  } else {
                    // Column exists.
                    // Check properties.
                    const keys = Object.keys(column);

                    keys.forEach((key) => {
                      if (foundColumn[key] === undefined) {
                        // Property does not exist.
                        // Add color scheme.
                        diffDbColors[`${table.name}-${column.name}-${column[key]}`] = 'red';
                      }
                    });
                  }
                });
              }
            });
            // console.log(diffDbColors);
            this.setState({ diffDb, diffDbColors });
          });
      });
  }

  changeDisplay(event) {
    const display = event.target.id;
    // Reset all displays to false.
    this.setState({
      oldDbDisplay: false,
      newDbDisplay: false,
      diffDbDisplay: false,
      scriptDisplay: false,
    });
    this.setState({ [display]: true });
  }

  render() {
    const {
      oldDb, newDb, diffDb, oldDbDisplay, newDbDisplay, diffDbDisplay, scriptDisplay, diffDbColors,
    } = this.state;
    const { changeDisplay } = this;

    return (
      <div>
        <button id="oldDbDisplay" onClick={(event) => { changeDisplay(event); }}>Old DB</button>
        <button id="newDbDisplay" onClick={(event) => { changeDisplay(event); }}>New DB</button>
        <button id="diffDbDisplay" onClick={(event) => { changeDisplay(event); }}>DB Diff</button>
        <button id="scriptDisplay" onClick={(event) => { changeDisplay(event); }}>Script</button>
        {oldDbDisplay ? <DbDisplayContainer db={oldDb} /> : null}
        {newDbDisplay ? <DbDisplayContainer db={newDb} /> : null}
        {diffDbDisplay ? <DiffDbDisplayContainer db={diffDb} diffDbColors={diffDbColors} /> : null}
        {/* {oldDbDisplay ? <DbDisplayContainer script={script} /> : null} */}
      </div>
    );
  }
}

export default MainContainer;
