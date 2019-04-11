import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-burgerbuilder-3f0bd.firebaseio.com/'
});

Axios.defaults.params = {}
Axios.defaults.params['auth'] = process.env.REACT_APP_AUTH_KEY;

export default instance;
