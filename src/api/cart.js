import { httpRequest } from "./httpRequest";
import baseURL from "../utils/urls";

const getCartItemsByUserId = async () => {
	try {
		const response = await httpRequest({
			method: "get",
			baseURL: baseURL,
			url: `/cart`,
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}
	} catch (err) {
		throw err;
	}
};

const addProductToCart = async (product_id) => {
	try {
		const response = await httpRequest({
			method: "post",
			baseURL: baseURL,
			url: `/cart/add`,
			body: { product_id },
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}
	} catch (err) {
		throw err;
	}
};

const deleteCartItem = async (cart_id) => {
	try {
		const response = await httpRequest({
			method: "post",
			baseURL: baseURL,
			url: `/cart/delete`,
			body: { cart_id },
		});
		if (response.status >= 200 && response.status < 300) {
			return response.data;
		}
	} catch (err) {
		throw err;
	}
};

export const cartContoller = {
	getCartItemsByUserId,
	addProductToCart,
	deleteCartItem,
};
