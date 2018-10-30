import React, { Component } from 'react';
import DbDisplay from '../components/DbDisplay.jsx';

const DbDisplayContainer = (props) => {
  const { oldDb } = props;
  const tables = oldDb.map(tableInfo => <DbDisplay key={tableInfo.name} tableInfo={tableInfo} />);

  return (
    <div id="dbDisplayContainer">
      {tables}
    </div>
  );
};

export default DbDisplayContainer;
