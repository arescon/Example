import axios from 'axios';

import { BaseUrl } from 'src/defaults';

const Axios = axios.create({
  baseURL: BaseUrl,
	timeout: 60000,
	withCredentials: true,
  headers: {
		'Content-Type': 'application/json',
	}
});

export const Get = function (url, params) {
	return Axios.get(url, {
		params: params ? params : {}
	}).catch((err) => {
		throw new Error(err);
	});
};

export const Put = function (url, data = {}, params = {}) {
	return Axios.put(url, data, { params: params }).catch((err) => {
		throw new Error(err);
	});
}

export const Delete = function (url, params = {}, data = {}) {
	return Axios.delete(url, {
		data: data,
		params: params
	}).catch((err) => {
		throw new Error(err);
	});
}