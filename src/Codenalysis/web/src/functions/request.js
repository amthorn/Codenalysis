import { toast } from "react-toastify";

export default function request(url, options) {
	const update = { ...options };
	update.headers = {
			"Content-Type": "application/json",
			...update.headers,
	};

	return fetch(url, update).then((response) => {
	  	return response.json().then((data) => {
	  		if('message' in data){
				toast[data['message']['priority']](data['message']['text'])
	  		}
			return { response: response, data: data }
	  	})
	});
}