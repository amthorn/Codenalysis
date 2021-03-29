import { toast } from "react-toastify";

export const request = (url, options) => {
	const update = {
		...options,

		head: {
			"Content-Type": "application/json",
			...options.headers,
		}
	};

	return fetch(url, update).then((response) => response.json().then((data) => {
  		if("message" in data){
  			if("raw" in data.message){
	  			data.message.raw.map((value, key) => (
	  				toast[data.message.priority](`${key}: ${value}`)
	  			));
			}else{
				toast[data.message.priority](data.message.text);
			}
  		}

		return { response, data };
	}));
};