/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-spread */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';

const EditableRows = () => {
  return (
    <React.Fragment>
      {Array.apply(null, { length: 10 }).map((e, i) => (
        <tr key={i}>
          <td contentEditable className="align-middle border border-light text-secondary" />
          <td contentEditable className="align-middle border border-light text-secondary" />
          <td className="border border-light text-secondary">
            <select id="inputState" className="form-control form-control-sm text-muted">
              <option defaultValue>Choose...</option>
              <option value="positive">Pos</option>
              <option value="negative">Neg</option>
              <option value="equivalent">Equiv</option>
            </select>
          </td>
        </tr>
      ))}
    </React.Fragment>
  );
};

const EiaResults = () => {
  const initValues = {
    kitName: '',
    kitBrandOthers: '',
    vendorName: '',
    serialNumber: '',
    expireDate: '',
  };

  const EiaSchema = Yup.object().shape({
    kitName: Yup.string().required("Kit's Brand name is required"),
    kitBrandOthers: Yup.string().required("Kit's Brand name is required"),
    vendorName: Yup.string().required("Vendor's name is required"),
    serialNumber: Yup.number().required('Serial number is required'),
    expireDate: Yup.date().default(() => {
      return new Date();
    }),
  });

  return (
    <Formik enableReinitialize initialValues={initValues} validationSchema={EiaSchema}>
      <Form className="mb-3">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-3">
                <label className="text-secondary" htmlFor="kitName">
                  Kit&apos;s Brand Name
                </label>
                <select id="kitName" name="colorkitbrand" className="form-control">
                  <option value="" label="Select a Kit's Brand Name" />
                  <option
                    value="ProSpecT™ Rotavirus Microplate Assay"
                    label="ProSpecT™ Rotavirus Microplate Assay"
                  />
                  <option value="Premier® Rotclone® EIA" label="Premier® Rotclone® EIA" />
                  <option value="RIDASCREEN® Rotavirus" label="RIDASCREEN® Rotavirus" />
                </select>
              </div>

              <Field
                type="text"
                name="kitBrandOthers"
                placeholder="Kit's Brand Name"
                label="Other"
                col="3"
                component={Input}
              />
              <Field
                type="text"
                name="vendorName"
                placeholder="Vendor's name"
                label="Vendor's name"
                col="6"
                component={Input}
              />
            </div>
            <div className="row">
              <Field
                type="text"
                name="serialNumber"
                placeholder="Batch/Serial No."
                label="Batch/Serial No."
                col="6"
                component={Input}
              />
              <Field
                type="date"
                name="expireDate"
                placeholder="Expiry Date"
                label="Expiry Date"
                col="6"
                component={Input}
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="table-responsive">
            <table className="table table-sm table-nowrap table-outline card-table">
              <thead>
                <tr>
                  <th>
                    <div className="text-muted">Sample ID Number</div>
                  </th>
                  <th>
                    <div className="text-muted">Antigen O.D.</div>
                  </th>
                  <th>
                    <div className="text-muted">Rotavirus Pos/Neg/Equiv</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {EditableRows()}
                <tr>
                  <td className="align-middle border border-light text-secondary">
                    Positive Control
                  </td>
                  <td contentEditable className="align-middle border border-light text-secondary" />
                  <td className="border border-light text-secondary" />
                </tr>
                <tr>
                  <td className="align-middle border border-light text-secondary">
                    Negative Control
                  </td>
                  <td contentEditable className="align-middle border border-light text-secondary" />
                  <td className="border border-light text-secondary" />
                </tr>
                <tr>
                  <td className="align-middle border border-light text-secondary">
                    Kit Cut Off Value
                  </td>
                  <td contentEditable className="align-middle border border-light text-secondary" />
                  <td className="border border-light text-secondary" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button type="button" className="btn btn-primary">
          Submit Results
        </button>
      </Form>
    </Formik>
  );
};

export default EiaResults;
