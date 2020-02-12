import React from 'react';

const Card = props => (
  <div className="col-12 col-lg-6 col-xl">
    {/* Card */}
    <div className="card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col">
            {/* Title */}
            <h6 className="card-title text-uppercase text-muted mb-2">{props.title}</h6>
            {/* Heading */}
            <span className="h2 mb-0">{props.amount}</span>
          </div>
          <div className="col-auto">
            {/* Icon */}
            <span className={`h2 fe ${props.iconClass} text-muted mb-0`} />
          </div>
        </div>
        {/* / .row */}
      </div>
    </div>
  </div>
);

export default Card;
