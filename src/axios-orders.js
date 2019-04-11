import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-burgerbuilder-3f0bd.firebaseio.com/'
});

export default instance;
