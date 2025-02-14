import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "https://localhost:5000/api";

const sleep = (delay: number) => {
    return new Promise((resolve, reject) => {
        if(delay<0){
            reject("delay can not be negative.");
        }
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use(async (response) => {
    try{
        await sleep(1000);
        return response;
    }catch(error){
        return Promise.reject(error);
    }
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>("/Activity"),
    details: (id: string) => requests.get<Activity>(`/Activity/${id}`),
    create: (activity: Activity) => requests.post<Activity>("/Activity", activity),
    update: (activity: Activity) => requests.put<Activity>(`/Activity/${activity.id}`, activity),
    delete: (id: string) => requests.del<Activity>(`/Activity/${id}`)
}

const agent = {
    Activities
}

export default agent;