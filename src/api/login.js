import { httpRequest } from "./httpRequest";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://meruhealthapi.skillmind.org";

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
