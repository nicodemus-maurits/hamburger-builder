import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token after login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
                type: actionTypes.AUTH_SUCCESS,
                tokenId: 'some-token',
                userId: 'some-userId'
            })).toEqual({
                token: 'some-token',
                userId: 'some-userId',
                error: null,
                loading: false,
                authRedirectPath: '/'
            });
    })
});
