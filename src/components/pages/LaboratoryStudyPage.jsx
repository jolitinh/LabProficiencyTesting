/* eslint-disable react/button-has-type */
import React, { useEffect, useCallback } from 'react';
import { connect } from 'redux-bundler-react';
import orderBy from 'lodash/_baseOrderBy';
import {
  formatedShortDate,
  uuidv4,
  getChunkArray,
  formatedLongDate,
  panelShippingStatus,
} from '../../utils';
import EnrollableStudyCard from '../lib/EnrollableStudyCard';
import PreviousEnrolledStudiesCard from '../lib/PreviousEnrolledStudiesCard';

const LaboratoryStudyPage = ({
  userData,
  doFetchUserProfile,
  enrollableStudies,
  doFetchEnrollableStudiesList,
  enrollmentList,
  activeEnrollStudies,
}) => {
  let enrollsOrderByYear = [];
  let pastEnrolls = [];
  let splitArray = [];

  const fetchStudies = useCallback(async () => {
    await doFetchEnrollableStudiesList();
  }, [doFetchEnrollableStudiesList]);

  useEffect(() => {
    fetchStudies();
  }, [fetchStudies]);

  const fetchUserProfile = useCallback(async () => {
    try {
      await doFetchUserProfile(userData.id);
    } catch (e) {
      console.log(e);
    }
  }, [doFetchUserProfile, userData]);

  useEffect(() => {
    fetchUserProfile(userData.id);
  }, [fetchUserProfile, userData]);

  if (enrollmentList) {
    enrollsOrderByYear = orderBy(enrollmentList, ['year'], ['desc']);
    pastEnrolls = enrollsOrderByYear.filter(item => item.year < new Date().getFullYear());
    splitArray = getChunkArray(pastEnrolls, 3);
  }

  // This style is applied to the slideshow chevron width
  const chevronWidth = { width: '5%' };

  const [items] = enrollableStudies;
  const ViewKitShippingStatus = ({ study }) => {
    const stl = { fontSize: '13px' };
    return (
      <>
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div className="card">
            <div className="card-header text-secondary">Currently Enrolled to: </div>
            <div className="card-body text-center">
              <h2 className="text-primary header-pretitle card-title">
                {study.name} {study.year}
              </h2>
              <p className="small text-muted text-uppercase mb-3">Available Tests</p>
              <p className="card-text">
                {study.Enrollment.Tests.map(test => (
                  <span className="badge badge-soft-secondary mr-3" key={test.name}>
                    {test.description}
                  </span>
                ))}
              </p>

              <div className="row no-gutters border-top">
                <div className="col-6 py-4 text-center">
                  <div className="px-2">
                    {' '}
                    <h6 className="text-uppercase text-secondary">Kit Serial Number</h6>
                    <h2 className="mb-0">
                      {' '}
                      <span style={stl} className="small text-muted">
                        FEC-5678458855
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="col-6 py-4 text-center border-left">
                  <div className="px-2">
                    {' '}
                    <h6 className="text-uppercase text-secondary"> Shipping Details</h6>
                    <h2 className="mb-0">
                      {' '}
                      <span style={stl} className="small text-muted">
                        {study.Enrollment.shippingDetail ? study.Enrollment.shippingDetail : '--'}
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer card-footer-boxed">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                  <small>
                    <span
                      className={
                        study.Enrollment.shipmentStatus === panelShippingStatus.RECEIVED
                          ? 'text-success'
                          : 'text-warning'
                      }
                    >
                      ●
                    </span>{' '}
                    KIT {study.Enrollment.shipmentStatus}
                  </small>
                </div>

                <div className="col-auto" />
                {study.Enrollment.shipmentStatus !== panelShippingStatus.RECEIVED ? (
                  <a
                    href={`/enrolled-studies/${study.id}`}
                    role="button"
                    className="btn btn-primary"
                  >
                    Kit Verification Form
                  </a>
                ) : (
                  <a
                    href={`/enrolled-studies/${study.id}/submit-tests`}
                    role="button"
                    className="btn btn-primary btn-sm"
                  >
                    Submit Test Forms
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            {items ? (
              <EnrollableStudyCard
                virusName={items.name}
                StudyYear={items.year}
                startDate={formatedShortDate(items.startDate)}
                endDate={items.endDate ? formatedShortDate(items.endDate) : null}
                btnCardCaption="Enroll"
              />
            ) : (
              <>
                <div className="row d-flex justify-content-center m-4">
                  <h5 className="header-pretitle text-info">
                    <small className="header-pretitle text-info">
                      No study is available for enrollment at this moment.
                    </small>
                  </h5>
                </div>
                <hr />

                <div className="row d-flex justify-content-center m-4">
                  {activeEnrollStudies.map(activeStudy => (
                    <ViewKitShippingStatus key={activeStudy.id} study={activeStudy} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row text-center d-flex justify-content-center">
          <h5 className="text-muted header-pretitle">
            {splitArray.length > 0 ? 'Previous Studies' : 'No Previous Studies'}
          </h5>
        </div>

        <div
          id="previousEnrolledStudies"
          className="carousel slide"
          data-interval="false"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {splitArray &&
              splitArray.map((values, index) => (
                <div
                  key={uuidv4(2, 3)}
                  className={index === 0 ? 'carousel-item active' : 'carousel-item'}
                >
                  <div className="row justify-content-around">
                    {values.map(cards => (
                      <PreviousEnrolledStudiesCard
                        key={cards.id}
                        virusName={cards.name}
                        btnCardCaption="View Results"
                        btnLinkOne="/test-view-data"
                        StudyYear={cards.year}
                        completedOnDate={formatedLongDate(cards.endDate)}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
          {splitArray.length > 1 ? (
            <React.Fragment>
              <a
                style={chevronWidth}
                className="carousel-control-prev display-4"
                href="#previousEnrolledStudies"
                role="button"
                data-slide="prev"
              >
                <i className="fe fe-chevron-left text-secondary" />
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a
                style={chevronWidth}
                className="carousel-control-next display-4"
                href="#previousEnrolledStudies"
                role="button"
                data-slide="next"
              >
                <i className="fe fe-chevron-right text-secondary" />
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default connect(
  'selectUserData',
  'doFetchUserProfile',
  'selectEnrollableStudies',
  'doFetchEnrollableStudiesList',
  'selectEnrollmentList',
  'selectActiveEnrollStudies',
  LaboratoryStudyPage,
);
