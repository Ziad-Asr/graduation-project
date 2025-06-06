import baseURL from "../Api/baseURL";

const useUpdateData = async (url, params) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };

  const res = await baseURL.put(url, params, config);
  return res.data;
};

const useUpdateDataWithImage = async (url, params) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };

  const res = await baseURL.put(url, params, config);
  return res;
};

export { useUpdateData, useUpdateDataWithImage };
