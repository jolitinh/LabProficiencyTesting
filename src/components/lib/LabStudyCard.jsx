import React from 'react';

const LabStudyCard = ({ testName, year, startDate, endDate, labs, testStatuses }) => {
  const icons = {
    1: { icon: 'check-circle', class: 'success', type: 'Completed' },
    2: { icon: 'help-circle', class: 'warning', type: 'Pending' },
    3: { icon: 'check-circle', class: 'primary', type: 'Passed' },
    4: { icon: 'alert-circle', class: 'danger', type: 'Failed' },
  };

  const list = () =>
    testStatuses.map(item => {
      return (
        <li
          key={icons[item.id].class}
          className="list-group-item d-flex align-items-center justify-content-between px-0"
        >
          <small className="text-dark">
            {item.number} {item.type}
          </small>
          <i className={`fe fe-${icons[item.id].icon} text-${icons[item.id].class}`} />
        </li>
      );
    });

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-uppercase text-muted mb-1">{testName}</h3>

        <div className="display-3 mb-0 text-dark">{year}</div>

        <div className="d-flex justify-content-between mb-2">
          <h4 className="text-muted">
            <i className="fe fe-calendar" /> {startDate} - {endDate}
          </h4>
          <h4 className="text-muted text-uppercase">{labs} Participants</h4>
        </div>

        <div>
          <ul className="list-group list-group-flush">{list()}</ul>
        </div>
      </div>
    </div>
  );
};

export default LabStudyCard;
