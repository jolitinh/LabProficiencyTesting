/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { connect } from 'redux-bundler-react';
import GenotypingResults from '../test-results/GenotypingResults';
import EiaResults from '../test-results/EiaResults';

const SubmitTestPage = ({ testsForEnrollment }) => {
  const [tests, setTests] = useState([]);
  const [active, setActive] = useState(0);

  const testToMap = {
    1: {
      component: <EiaResults />,
    },
    2: {
      component: <GenotypingResults />,
    },
    3: {
      component: 'No Data',
    },
  };

  useEffect(() => {
    setTests([]);
    if (testsForEnrollment && testsForEnrollment.tests) {
      setTests(testsForEnrollment.tests);
      setActive(testsForEnrollment.tests[0].id);
    }
  }, [testsForEnrollment]);

  function renderForms() {
    const TestToRender = [];
    tests.forEach(test => {
      if (test.id === active) {
        TestToRender.push(testToMap[test.id].component);
      }
    });

    return TestToRender[0];
  }

  function renderTabs() {
    return (
      <div className="card ">
        <div className="card-header">
          <ul className="nav nav-tabs nav-tabs-sm card-header-tabs">
            {tests.map(test => (
              <li
                key={test.id}
                className="nav-item"
                data-trigger="click"
                data-action="toggle"
                data-dataset="0"
              >
                <a
                  onClick={() => setActive(test.id)}
                  className={`nav-link ${active === test.id ? 'active' : ''}`}
                  href="#"
                  data-toggle="tab"
                >
                  {test.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body">{renderForms()}</div>
      </div>
    );
  }

  return tests.length ? (
    renderTabs()
  ) : (
    <div className="text-center">
      <h6 className="text-uppercase text-muted mb-4">There is no data here</h6>
    </div>
  );
};

export default connect('selectTestsForEnrollment', SubmitTestPage);
