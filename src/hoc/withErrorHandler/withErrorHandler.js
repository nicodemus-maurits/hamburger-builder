import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Auxiliary>
                {/* Show Modal only if error state available and display error message */}
                <Modal show={error} modalClosed={clearError}>
                    {error && error.message}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    }
};

export default withErrorHandler;
