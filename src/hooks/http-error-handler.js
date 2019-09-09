import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // Remove error state on request
    // Request should always be working
    const reqInterceptor = httpClient.interceptors.request.use(request => {
        setError(null)
        return request;
    });

    // Set error state directly after response error occurs
    const resInterceptor = httpClient.interceptors.response.use(response => response, err => {
        setError(err);
    });


    // Remove interceptor here to prevent multiple interceptor instance
    // so that the component can be used to wrap other component also
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    // To close the modal when backdrop clicked
    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];
}
