import {request} from './apiCall';
import { USER_LIST_URL } from './apiConstants';

export const API = {
    getUserList: (onResponse) => {
        let url = USER_LIST_URL;
        request(onResponse, {}, 'GET', url);
    },
};