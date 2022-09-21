import { httpRequest } from "./httpRequest";
import baseURL from "../utils/urls";

const signIn = async (data) => {
	try {
		const response = await httpRequest({
			method: "post",
			baseURL: baseURL,
			url: "/signin",
			body: data,
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}
	} catch (err) {
		throw err;
	}
};

export const loginController = { signIn };
