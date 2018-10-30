import React, { Component } from 'react';
import _ from 'lodash';
import DbDisplayContainer from './DbDisplayContainer.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      oldDb: [],
      newDb: [],
      dbDiff: [],
    };
  }

  componentWillMount() {
    fetch('/queryDatabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'postgres://vhbazswk:J2WpO0mnB5nPzOHhhGLGiBgAE26Twt_Z@stampy.db.elephantsql.com:5432/vhbazswk' }),
    })
      .then(data => data.json())
      .then((schemaInfo) => {
        const { oldDb } = this.state;
        const oldDbCopy = oldDb.slice();

        let currentTableName;
        let table = {};
        console.log(schemaInfo);
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
      });
  }

  render() {
    const { oldDb } = this.state;

    return (
      <div>
        <DbDisplayContainer oldDb={oldDb} />
      </div>
    );
  }
}

export default MainContainer;
