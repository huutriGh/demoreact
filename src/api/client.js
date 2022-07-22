import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:44329",
});

const accessTokenHoc = (previousAPI) => {
  const innerAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("token");
    const res = await instance.post(`api/User/RefreshToken`, {
      token,
      refreshToken,
    });
    console.log(res.data);

    if (res) {
      if (res.data.token && res.data.refreshToken) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        previousAPI.headers.Authorization = `Bearer ${token}`;
        return instance.request(previousAPI);
      } else {
        localStorage.setItem("token", "");
        localStorage.setItem("refreshToken", "");
      }
    }
  };
  return innerAccessToken;
};

instance.interceptors.request.use(
  function (config) {
    console.log(config);
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(null, function (error) {
  console.log(
    error.config && error.response?.status === 401 && !error.config.__isRetry
  );
  if (
    error.config &&
    error.response?.status === 401 &&
    !error.config.__isRetry
  ) {
    return new Promise((resolve, reject) => {
      const callAccess = accessTokenHoc(error.config);
      callAccess(error.config)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return Promise.reject(error);
});

export default instance;
