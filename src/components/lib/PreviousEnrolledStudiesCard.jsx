import React from 'react';

const PreviousEnrolledStudiesCard = ({
  virusName,
  btnCardCaption,
  btnLinkOne,
  StudyYear,
  completedOnDate,
}) => {
  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col">
                <div className="card-title h6 text-uppercase text-center text-muted mb-3 mt-1">
                  {virusName}
                </div>

                <div className="row no-gutters align-items-center justify-content-center">
                  <div className="col-auto">
                    <div className="display-4 text-muted">{StudyYear}</div>
                  </div>
                </div>
                <div className="h6 text-uppercase text-center text-secondary mb-3 mt-1">
                  COMPLETED ON: {completedOnDate}
                </div>
                <div className="text-uppercase text-center text-muted mt-2">
                  <a
                    href={btnLinkOne}
                    className="btn btn-outline-secondary btn-sm"
                    role="button"
                    aria-pressed="true"
                  >
                    {btnCardCaption}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousEnrolledStudiesCard;
