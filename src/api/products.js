import { httpRequest } from "./httpRequest";
import baseURL from "../utils/urls";

const getAllProducts = async () => {
	try {
		const response = await httpRequest({
			method: "get",
			baseURL: baseURL,
			url: "/products",
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}
	} catch (err) {
		throw err;
	}
};

const getProductById = async (product_id, is_logged) => {
	try {
		const response = await httpRequest({
			method: "post",
			baseURL: baseURL,
			url: `/products/getProduct`,
			body: { product_id, is_logged },
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}
	} catch (err) {
		throw err;
	}
};

export const productsController = { getAllProducts, getProductById };
