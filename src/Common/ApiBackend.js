const local = "http://localhost:5000";
const backendDomain = local;
const summaryApi = {
    logIn: {
        url: `${backendDomain}/api/v1/auth/google_auth`,
        method: "post"
    },
}
export default summaryApi;