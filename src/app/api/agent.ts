import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { toast } from "react-toastify";
import router from "../router/Routes";
import { ErrorResponse } from "../models/error";
import { store } from "../stores/store";
import { setServerError } from "../stores/errorSlice";

axios.defaults.baseURL = "https://localhost:5000/api";

const sleep = (delay: number) => {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      reject("delay can not be negative.");
    }
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    const { data, status } = error.response!;
    const { title, message } = data;
    switch (status) {
      case 400:
        const modalErrors = [];
        for (const key in data.errors) {
          modalErrors.push(data.errors[key]);
        }
        toast.error(title);
        throw modalErrors.flat();
      case 401:
        toast.error(title);
        break;
      case 403:
        toast.error(title);
        break;
      case 404:
        toast.error(title);
        router.navigate("/not-found");
        break;
      case 500:
        store.dispatch(setServerError(data));
        router.navigate("/server-error");
        toast.error(message);
        break;
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/Activity"),
  details: (id: string) => requests.get<Activity>(`/Activity/${id}`),
  create: (activity: Activity) =>
    requests.post<Activity>("/Activity", activity),
  update: (activity: Activity) =>
    requests.put<Activity>(`/Activity/${activity.id}`, activity),
  delete: (id: string) => requests.del<Activity>(`/Activity/${id}`),
};

const agent = {
  Activities,
};

export default agent;
