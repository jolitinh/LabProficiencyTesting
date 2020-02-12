import React, { useEffect, useCallback } from 'react';
import { connect } from 'redux-bundler-react';
import Col from '../lib/Col';
import Row from '../lib/Row';

import StudyDetailFrom from '../forms/study-detail-form/StudyDetailForm';
import EnrolledLabsTable from '../views/EnrolledLabsTable';

const AdminStudyDetailPage = ({
  currentStudy,
  routeParams,
  doFetchStudyDetails,
  doUpdateEnrollment,
}) => {
  const { id } = routeParams;
  const fetchStudyDetail = useCallback(async () => {
    try {
      await doFetchStudyDetails(id);
    } catch (error) {
      console.log(error);
    }
  }, [doFetchStudyDetails, id]);

  useEffect(() => {
    fetchStudyDetail();
  }, [fetchStudyDetail, id]);

  return (
    <Row>
      <Col className="offset-xl-1" lg={12} xl={10}>
        <div className="card">
          <div className="card-header">
            {/* <h2 className="card-title text-left">Studies</h2> */}
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/studies">Studies</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {currentStudy && `${currentStudy.year} ${currentStudy.name}`}
                </li>
              </ol>
            </nav>
          </div>

          <div className="card-body">
            <StudyDetailFrom />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-text text-muted">Enrolled Laboratories to This Study</h4>
          </div>
          <div className="card-body">
            <EnrolledLabsTable
              enrollments={(currentStudy && currentStudy.enrollLabs) || []}
              updateEnrollment={doUpdateEnrollment}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default connect(
  'selectCurrentStudy',
  'selectRouteParams',
  'doFetchStudyDetails',
  'doUpdateEnrollment',
  AdminStudyDetailPage,
);
