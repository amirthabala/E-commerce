import { httpRequest } from "./httpRequest";

const baseURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:4000"
		: "https://meruhealthapi.skillmind.org";

const getCartItemsByUserId = async (userId) => {
	try {
		const response = await httpRequest({
			method: "get",
			baseURL: baseURL,
			url: `/cart/${userId}`,
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
