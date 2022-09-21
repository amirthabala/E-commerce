const baseURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:4000"
		: "http://meruhealthapi.skillmind.org";

export default baseURL;
