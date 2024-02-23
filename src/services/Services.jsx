import axios from "axios";
const POST = async (apiEndPoint, payload, params = {}) => {
  try {
    const res = await axios.post(apiEndPoint, payload, {
      headers: {
        Authorization:
          "Bearer " +
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBua2Nwcm9qZWN0LmNvbSIsImV4cCI6MTcwODY5ODYyMywiaWF0IjoxNzA4NjgwNjIzfQ.VGn6_9DP4CKEOmhIYne7DI6QP-FcASWYckio4gfZofnCR5sAuFo-wrfX-xN82EuxwPRKvrG5lIs-lch_Lua22Q",
      },
      params: {
        ...params,
      },
    });
    if (res) {
      return res;
    } else {
      return null;
    }
  } catch (error) {
    return error?.response;
  }
};
export const Services = {
  POST,
};
