import React from 'react';

const SearchInput = ({ type, handleChange, placeholder }) => (
  <>
    <div className="col-auto pr-0">
      <span className="fe fe-search text-muted"></span>
    </div>
    <div className="col">
      <input
        type={type}
        className="form-control form-control-flush search"
        onChange={e => handleChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  </>
);

export default SearchInput;
