import baseURL from "../Api/baseURL";

const useGetData = async (url, params) => {
  const res = await baseURL.get(url, params);
  return res.data;
};

const useGetDataToken = async (url, params) => {
  const res = await baseURL.get(url, params);
  return res.data;
};

export { useGetData, useGetDataToken };
