import { toast } from "react-toastify";

export const request = (url, options, requestOptions) => {
    const update = {
        ...options,

        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        }
    };

    return fetch(url, update).then((response) => response.json().then((data) => {
        if ("message" in data) {
            if ("raw" in data.message) {
                Object.entries(data.message.raw).map((value) => {
                    if (requestOptions?.notifications !== false) {
                        toast[data.message.priority](`${value[0]}: ${value[1]}`)
                    }
                });
            } else {
                if (requestOptions?.notifications !== false) {
                    toast[data.message.priority](data.message.text);
                }
            }
        }

        return { response: response, data: data };
    }));
};