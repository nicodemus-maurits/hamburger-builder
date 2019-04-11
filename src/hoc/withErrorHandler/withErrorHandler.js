import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount () {
            // Remove error state on request
            // Request should always be working
            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            // Set error state directly after response error occurs
            axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        // To close the modal when backdrop clicked
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Auxiliary>
                    {/* Show Modal only if error state available and display error message */}
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
};

export default withErrorHandler;
