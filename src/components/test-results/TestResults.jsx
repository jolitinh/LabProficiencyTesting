/* eslint-disable react/no-array-index-key */
import React from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col">Sample Id Number</th>
        <th scope="col" className="text-center">
          Antigen O.D.
        </th>
        <th scope="col" className="text-center">
          Rotavirus Pos/Neg/Equiv
        </th>
      </tr>
    </thead>
  );
};

const TableBody = () => {
  const tblData = [
    { sampleid: '136468', antigen: '0.06', results: 'Negative' },
    { sampleid: '195017', antigen: '0.294', results: 'Positive' },
    { sampleid: '312144', antigen: '0.287', results: 'Positive' },
    { sampleid: '384773', antigen: '0.21', results: 'Equivocal' },
    { sampleid: '471601', antigen: '0.371', results: 'Positive' },
    { sampleid: '712404', antigen: '0.256', results: 'Equivocal' },
    { sampleid: '793013', antigen: '0.415', results: 'Positive' },
    { sampleid: '820274', antigen: '0.376', results: 'Positive' },
    { sampleid: '945470', antigen: '0.046', results: 'Negative' },
    { sampleid: '975930', antigen: '0.042', results: 'Negative' },
    { sampleid: 'Positive Control', antigen: '1.095', results: '' },
    { sampleid: 'Negative Control', antigen: '0.074', results: '' },
    { sampleid: 'Kit Cut Off Value', antigen: '0.274', results: '' },
  ];

  const rows = tblData.map((row, index) => {
    return (
      <tr key={index}>
        <td className="text-muted align-middle border border-light">{row.sampleid}</td>
        <td className="text-muted text-center align-middle border border-light">{row.antigen}</td>
        <td className="text-muted text-center align-middle border border-light">{row.results}</td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const TestResults = () => {
  return (
    <div className="card">
      <div className="table-respnsive">
        <table className="table table-sm table-nowrap table-outline card-table">
          <TableHeader />
          <TableBody />
        </table>
      </div>
    </div>
  );
};
export default TestResults;
