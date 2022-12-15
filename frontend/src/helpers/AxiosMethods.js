import axios from 'axios';

export function getMethod(url){
    return axios.get(url);
}

export function postMethod(url, data){
    return axios.post(url, data);
}

export function putMethod(url, data){
    return axios.put(url, data);
}

export function deleteMethod(url, data){
    return axios.delete(url, data);
}