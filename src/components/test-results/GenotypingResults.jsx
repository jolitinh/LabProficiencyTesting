/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-spread */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Input from './Input';

const renderEditable = () => {
  return (
    <React.Fragment>
      {Array.apply(null, { length: 10 }).map((e, i) => (
        <tr key={i}>
          <td contentEditable className="align-middle border border-light text-secondary" />
          <td contentEditable className="align-middle border border-light text-secondary" />
          <td contentEditable className="align-middle border border-light text-secondary" />
          <td contentEditable className="align-middle border border-light text-secondary" />
        </tr>
      ))}
    </React.Fragment>
  );
};

const GenotypingResults = () => {
  const initValues = {
    kitNameRounOne: '',
    kitBrandOthersRoundOne: '',
    vendorNameRoundOne: '',
    serialNumberRoundOne: '',
    expireDateRoundOne: '',
    gGenotypeRoundOne: '',
    pGenotypeRoundOne: '',
    kitNameRounTwo: '',
    kitBrandOthersRoundTwo: '',
    vendorNameRoundTwo: '',
    serialNumberRoundTwo: '',
    expireDateRoundTwo: '',
    gGenotypeRoundTwo: '',
    pGenotypeRoundTwo: '',
  };

  const GenotypeSchema = Yup.object().shape({
    kitNameRounOne: Yup.string().required("Kit's Brand name is required"),
    kitBrandOthersRoundOne: Yup.string().required("Kit's Brand name is required"),
    vendorNameRoundOne: Yup.string().required("Vendor's name is required"),
    serialNumberRoundOne: Yup.number().required('Serial number is required'),
    expireDateRoundOne: Yup.date().default(() => {
      return new Date();
    }),
    gGenotypeRoundOne: Yup.string().required('G-Genotyping (VP7) is required'),
    pGenotypeRoundOne: Yup.string().required('P-Genotyping (VP4) is required'),
    kitNameRounTwo: Yup.string().required("Kit's Brand name is required"),
    kitBrandOthersRoundTwo: Yup.string().required("Kit's Brand name is required"),
    vendorNameRoundTwo: Yup.string().required("Vendor's name is required"),
    serialNumberRoundTwo: Yup.number().required('Serial number is required'),
    expireDateRoundTwo: Yup.date().default(() => {
      return new Date();
    }),
    gGenotypeRoundTwo: Yup.string().required('G-Genotyping (VP7) is required'),
    pGenotypeRoundTwo: Yup.string().required('P-Genotyping (VP4) is required'),
  });

  return (
    <Formik enableReinitialize initialValues={initValues} validationSchema={GenotypeSchema}>
      <Form className="mb-3">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title">1st round of amplification:</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label className="text-secondary" htmlFor="kitNameRounOne">
                      Kit&apos;s Brand Name
                    </label>
                    <select id="kitNameRounOne" name="colorkitbrand" className="form-control">
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
                    name="kitBrandOthersRoundOne"
                    placeholder="Kit's Brand Name"
                    label="Other"
                    col="6"
                    component={Input}
                  />
                </div>

                <div className="row">
                  <Field
                    type="text"
                    name="vendorNameRoundOne"
                    placeholder="Vendor's name"
                    label="Vendor's name"
                    col="12"
                    component={Input}
                  />
                </div>
                <div className="row">
                  <Field
                    type="text"
                    name="serialNumberRoundOne"
                    placeholder="Batch/Serial No."
                    label="Batch/Serial No."
                    col="6"
                    component={Input}
                  />
                  <Field
                    type="date"
                    name="expireDateRoundOne"
                    placeholder="Expiry Date"
                    label="Expiry Date"
                    col="6"
                    component={Input}
                  />
                </div>

                <div className="row">
                  <Field
                    type="text"
                    name="gGenotypeRoundOne"
                    placeholder="G-Genotyping (VP7)"
                    label="G-Genotyping (VP7)"
                    col="12"
                    component={Input}
                  />
                </div>
                <div className="row">
                  <Field
                    type="text"
                    name="pGenotypeRoundOne"
                    placeholder="P-Genotyping (VP4)"
                    label="P-Genotyping (VP4)"
                    col="12"
                    component={Input}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-header-title">2nd round of amplification:</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label className="text-secondary" htmlFor="kitNameRounTwo">
                      Kit&apos;s Brand Name
                    </label>
                    <select id="kitNameRounTwo" name="colorkitbrand" className="form-control">
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
                    name="kitBrandOthersRoundTwo"
                    placeholder="Kit's Brand Name"
                    label="Other"
                    col="6"
                    component={Input}
                  />
                </div>

                <div className="row">
                  <Field
                    type="text"
                    name="vendorNameRoundTwo"
                    placeholder="Vendor's name"
                    label="Vendor's name"
                    col="12"
                    component={Input}
                  />
                </div>
                <div className="row">
                  <Field
                    type="text"
                    name="serialNumberRoundTwo"
                    placeholder="Batch/Serial No."
                    label="Batch/Serial No."
                    col="6"
                    component={Input}
                  />
                  <Field
                    type="date"
                    name="expireDateRoundTwo"
                    placeholder="Expiry Date"
                    label="Expiry Date"
                    col="6"
                    component={Input}
                  />
                </div>

                <div className="row">
                  <Field
                    type="text"
                    name="gGenotypeRoundTwo"
                    placeholder="G-Genotyping (VP7)"
                    label="G-Genotyping (VP7)"
                    col="12"
                    component={Input}
                  />
                </div>
                <div className="row">
                  <Field
                    type="text"
                    name="pGenotypeRoundTwo"
                    placeholder="P-Genotyping (VP4)"
                    label="P-Genotyping (VP4)"
                    col="12"
                    component={Input}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-sm table-nowrap table-outline card-table">
                  <thead>
                    <tr>
                      <th>
                        <div className="text-muted">Sample ID Number</div>
                      </th>
                      <th>
                        <div className="text-muted">G-Genotype (VP7)</div>
                      </th>
                      <th>
                        <div className="text-muted">P-Genotype (VP4)</div>
                      </th>
                      <th>
                        <div className="text-muted">Final Genotype</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderEditable()}
                    <tr>
                      <td className="align-middle border border-light text-secondary">
                        Positive Control
                      </td>
                      <td
                        contentEditable
                        className="align-middle border border-light text-secondary"
                      />
                      <td
                        contentEditable
                        className="align-middle border border-light text-secondary"
                      />
                      <td
                        contentEditable
                        className="align-middle border border-light text-secondary"
                      />
                    </tr>
                    <tr>
                      <td className="align-middle border border-light text-secondary">
                        Negative Control
                      </td>
                      <td
                        contentEditable
                        className="align-middle border border-light text-secondary"
                      />
                      <td
                        contentEditable
                        className="align-middle border border-light text-secondary"
                      />
                      <td
                        contentEditable
                        className="align-middle border border-light text-secondary"
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-primary">
          Submit Results
        </button>
      </Form>
    </Formik>
  );
};

export default GenotypingResults;
