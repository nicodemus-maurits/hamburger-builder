import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        // Remove error state on request
        // Request should always be working
        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null)
            return request;
        });

        // Set error state directly after response error occurs
        const resInterceptor = axios.interceptors.response.use(response => response, err => {
            setError(err);
        });


        // Remove interceptor here to prevent multiple interceptor instance
        // so that the component can be used to wrap other component also
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        // To close the modal when backdrop clicked
        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <Auxiliary>
                {/* Show Modal only if error state available and display error message */}
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error && error.message}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    }
};

export default withErrorHandler;
