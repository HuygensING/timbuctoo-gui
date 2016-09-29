console.log(process.env.server);
export default {
	apiUrl: {
		"v2.1": `${process.env.server}/v2.1`,
		"v4": `${process.env.server}/v2.1`
	},
	apiVersion: "v4"
};