import { httpRequest } from "./httpRequest";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://meruhealthapi.skillmind.org";

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

const getProductById = async (product_id) => {
  try {
    const response = await httpRequest({
      method: "get",
      baseURL: baseURL,
      url: `/products/${product_id}`,
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};

export const productsController = { getAllProducts, getProductById };
