import React from 'react';

const EnrollableStudyCard = ({ virusName, StudyYear, startDate, endDate, btnCardCaption }) => {
  const verifiedEndDate = endDate ? `${endDate}, ${StudyYear}` : 'Not Set';

  return (
    <div className="card">
      <div className="card-header header-pretitle">Current study</div>
      <div className="card-body">
        <h4 className="text-uppercase text-center text-primary my-4">{virusName}</h4>

        <div className="row no-gutters align-items-center justify-content-center">
          <div className="col-auto">
            <div className="display-2 mb-0 text-secondary">{StudyYear}</div>
          </div>
        </div>

        <div className="h5 text-uppercase text-center text-muted mb-5 mt-2">
          <b className="text-secondary">
            Starting at: {startDate}, {StudyYear} - Ending at: {verifiedEndDate}
          </b>
        </div>

        <div className="h6 text-uppercase text-center text-muted mt-2">
          <a href="/enrollment" className="btn btn-primary" role="button" aria-pressed="true">
            {btnCardCaption}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnrollableStudyCard;
