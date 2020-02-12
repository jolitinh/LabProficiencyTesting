import React from 'react';
import { connect } from 'redux-bundler-react';
import orderBy from 'lodash/_baseOrderBy';
import { formatedShortDate } from '../../utils';
import useModal from '../hooks/useModal';
import Modal from '../lib/Modal';
import LabStudyCard from '../lib/LabStudyCard';
import NewStudyForm from '../forms/study-create-form/NewStudyForm';

const ListingStudies = ({
  studiesList,
  studiesErrorMessage,
  doCreateStudy,
  doCleanStudiesError,
}) => {
  const { showing, toggleVisibility, setModalTitle, title } = useModal();
  const createErrorMessage = studiesErrorMessage || null;

  const testStatuses = [
    {
      number: 10,
      type: 'Completed',
      id: 1,
    },
    {
      number: 2,
      type: 'Pending',
      id: 2,
    },
    {
      number: 8,
      type: 'Passed',
      id: 3,
    },
    {
      number: 2,
      type: 'Failed',
      id: 4,
    },
  ];

  const callModal = () => {
    doCleanStudiesError();
    setModalTitle('Create a new study');
    toggleVisibility();
  };

  const onHideModal = () => {
    toggleVisibility();
  };

  const studiesModalSubmitAction = async studiesValues => {
    const createValues = { ...studiesValues };
    if (!createValues.endDate) {
      delete createValues.endDate;
    }
    if (!createValues.panelManufactureDate) {
      delete createValues.panelManufactureDate;
    }
    try {
      await doCreateStudy({
        ...createValues,
        year: parseInt(studiesValues.year, 10),
      });
      onHideModal();
    } catch (err) {
      console.log('error on actions', err);
    }
  };

  const studiesOrderByYear = orderBy(studiesList, ['year'], ['desc']);

  return (
    <React.Fragment>
      <div className="row mb-3">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-primary float-right"
            onClick={() => {
              callModal();
            }}
            data-toggle="modal"
            data-target="modalElement"
          >
            Add Study
          </button>
        </div>
      </div>
      <div className="row">
        {studiesOrderByYear.map(items => (
          <div key={items.id} className="col-lg-6 col-xl-4">
            <a href={`/studies/${items.id}`}>
              <LabStudyCard
                key={items.id}
                testName={items.name}
                year={items.year}
                startDate={formatedShortDate(items.startDate)}
                endDate={items.endDate ? formatedShortDate(items.endDate) : 'No Set'}
                labs="5"
                testStatuses={testStatuses}
              />
            </a>
          </div>
        ))}
      </div>
      <Modal.Centered
        showing={showing}
        hide={toggleVisibility}
        title={title}
        error={createErrorMessage}
      >
        <NewStudyForm cancelAction={onHideModal} action={studiesModalSubmitAction} />
      </Modal.Centered>
    </React.Fragment>
  );
};

export default connect(
  'selectStudiesList',
  'selectStudiesErrorMessage',
  'doCreateStudy',
  'doCleanStudiesError',
  ListingStudies,
);
