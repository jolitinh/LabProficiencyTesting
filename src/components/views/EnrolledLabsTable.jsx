/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import FilterTable from '../lib/FilterTable';
import Modal from '../lib/Modal';
import ShipmentStatus from '../lib/ShipmentStatus';
import useActionFieldForTable from '../hooks/useActionFieldForTable';
import useModal from '../hooks/useModal';
import useProgressBar from '../hooks/useProgressBar';

const actionMapping = {
  PENDING: [{ text: 'Send Kit', type: 'SEND_KIT' }],
  SHIPPED: [{ text: 'Update Shipping Info', type: 'UPDATE_SHIPPING_INFO' }],
  RECEIVED: [],
};

const percentWithStatus = {
  PENDING: 0,
  SHIPPED: 50,
  RECEIVED: 100,
};

const actionToSubmitPerType = {
  SEND_KIT: 'SHIPPED',
  UPDATE_SHIPPING_INFO: 'SHIPPED',
};

const EnrolledLabsTable = ({ enrollments, updateEnrollment }) => {
  const { showing, toggleVisibility, setModalTitle, title } = useModal();
  const [dataToSubmit, setDataToSubmit] = useState({});
  const [shippingDetail, setShippingDetail] = useState('');
  const [Progress] = useProgressBar();

  const enrolledLabFields = [
    {
      name: 'Lab',
      field: 'laboratoryName',
    },
    {
      name: 'Shipment Status',
      field: 'shipmentStatus',
      func: item => (
        <>
          <ShipmentStatus shipmentStatus={item.Enrollment.shipmentStatus} />
        </>
      ),
    },
    {
      name: 'Kit Status Progress',
      field: 'kitStatusProgress',
      func: item => {
        const percent = percentWithStatus[item.shipmentStatus];

        const progressProps = {
          progress: percent,
          isSuccesValue: percent === percentWithStatus.RECEIVED,
        };
        return <Progress {...progressProps} />;
      },
    },
    {
      name: 'Enrolled Since',
      field: 'enrollDate',
      func: item => formatDistanceToNow(new Date(item.Enrollment.enrollDate)),
    },
    {
      name: 'Panel Sent',
      field: 'panelSentDate',
      func: item => {
        return item.Enrollment.panelSentDate
          ? formatDistanceToNow(new Date(item.Enrollment.panelSentDate))
          : 'Not sent yet';
      },
    },
  ];

  const onShippingDetailChange = value => {
    setShippingDetail(value);
  };

  const renderTextArea = () => {
    return (
      <div className="col-12">
        <label htmlFor="shippingDetail">Enter here some shipping details</label>
        <textarea
          rows="5"
          cols="55"
          id="shippingDetail"
          type="text"
          value={shippingDetail}
          onChange={e => onShippingDetailChange(e.target.value)}
          className="form-control"
        />
      </div>
    );
  };

  const onClickAction = (payload, type) => {
    const [labId] = payload;
    const [enrolledLab] = enrollments.filter(lab => lab.id === labId);

    setShippingDetail(enrolledLab.Enrollment.shippingDetail || '');

    const data = {
      LabParticipantId: labId,
      shipmentStatus: actionToSubmitPerType[type],
      StudyId: enrolledLab.Enrollment.StudyId,
      shippingDetail,
    };

    setDataToSubmit(data);
    toggleVisibility();
    setModalTitle('Shipping Info');
  };

  const onSubmit = async () => {
    try {
      await updateEnrollment({ ...dataToSubmit, shippingDetail });
      toggleVisibility();
      setDataToSubmit({});
    } catch (err) {
      toggleVisibility();
      console.log(err);
    }
  };

  const [actionsField] = useActionFieldForTable(
    'Actions',
    'Actions',
    actionMapping,
    onClickAction,
    'id',
    'shipmentStatus',
  );

  const enrolledLabs = enrollments.map(lab => {
    return { ...lab, shipmentStatus: lab.Enrollment.shipmentStatus };
  });

  return (
    <>
      <FilterTable
        itemList={enrolledLabs}
        fieldList={enrolledLabFields}
        useSearch
        useSingleActions
        extraColumn={actionsField}
      />
      <Modal.Vertical showing={showing} hide={toggleVisibility} title={title}>
        {renderTextArea()}
        <hr />
        <div className="text-right">
          <button
            className="btn btn-primary mr-2"
            type="button"
            onClick={onSubmit}
            disabled={!shippingDetail.length}
          >
            Submit
          </button>
          <button type="button" className="btn btn-outline-danger " onClick={toggleVisibility}>
            Cancel
          </button>
        </div>
      </Modal.Vertical>
    </>
  );
};

export default EnrolledLabsTable;
