import {Platform} from 'react-native';

Platform.OS === 'android' ?  API = 'http://10.0.2.2:3000' : API = 'http://localhost:3000';

export default API;
export const DEV = true; 