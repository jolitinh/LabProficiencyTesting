import pocs from '../../bundles/pocs';

describe('Pocs reducers', () => {
  test('reducer should return initial poc state when no action is passed', () => {
    const { getReducer } = pocs;
    const reducer = getReducer();
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      lastError: null,
      lastFetch: null,
      data: null,
      errorMessage: null,
      poc: null,
      hasAll: false,
      pocCreateError: null,
      pocDeleteErrorMessage: null,
      pocUpdateError: null,
    });
  });

  test('reducer should handle fetch poc action', () => {
    const { getReducer } = pocs;
    const reducer = getReducer();
    const poc = {
      id: 1,
      firstName: 'Test',
      lastName: 'TestCase',
      email: 'test@test.com',
      phoneNumber: '88888888',
      accessStatusId: 3,
    };
    const expectedPoc = {
      id: 1,
      firstName: 'Test',
      lastName: 'TestCase',
      email: 'test@test.com',
      phoneNumber: '88888888',
      accessStatusId: 3,
    };

    expect(
      reducer(
        {},
        {
          type: 'FETCH_POC_SUCCESS',
          payload: poc,
        },
      ),
    ).toMatchObject({ poc: expectedPoc });
  });

  test('reducer should handle fetch pocs success action', () => {
    const { getReducer } = pocs;
    const reducer = getReducer();
    const pocsPayload = {
      3: {
        1: {
          id: 1,
          firstName: 'Poc Test Case',
          lastName: 'TestCase',
          email: 'test@test.com',
          phoneNumber: '88888888',
          accessStatusId: 3,
          LabParticipantId: 3,
        },
      },
    };

    expect(reducer({}, { type: 'FETCH_POCS_SUCCESS', payload: pocsPayload })).toMatchObject({
      loading: false,
      lastError: null,
      errorMessage: null,
      data: pocsPayload,
    });
  });

  test('reducer should handle fetch all pocs action', () => {
    const { getReducer } = pocs;
    const reducer = getReducer();
    const pocsPayload = {
      3: {
        1: {
          id: 1,
          firstName: 'Poc Test Case',
          lastName: 'TestCase',
          email: 'test@test.com',
          phoneNumber: '88888888',
          accessStatusId: 3,
          LabParticipantId: 3,
        },
        2: {
          id: 2,
          firstName: 'Poc 2',
          lastName: 'Test',
          email: 'poc2@test.com',
          phoneNumber: '88888888',
          accessStatusId: 3,
          LabParticipantId: 3,
        },
      },
    };

    expect(reducer({}, { type: 'FETCH_ALL_POCS_SUCCESS', payload: pocsPayload })).toMatchObject({
      loading: false,
      lastError: null,
      errorMessage: null,
      data: pocsPayload,
      hasAll: true,
    });
  });
});
