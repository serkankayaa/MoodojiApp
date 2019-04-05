import axios from 'axios';
import {API} from '../../config/index';

export const getAllUser = axios.get(API).then(result => {
    console.log(result);
});