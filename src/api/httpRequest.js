import axios from "axios";

export const httpRequest = async ({ method, baseURL, url, body = {} }) => {
	try {
		const response = await axios.request({
			method: method,
			baseURL: baseURL,
			url: url,
			data: body,
			headers: {
				authorization: `Bearer ${localStorage.getItem("meruwell_token")}`,
			},
		});

		return response;
	} catch (error) {
		const err = {
			success: false,
			message: error.message || "Internal Server Error, Please try again",
			status: error.status || 500,
		};
		throw err;
	}
};
