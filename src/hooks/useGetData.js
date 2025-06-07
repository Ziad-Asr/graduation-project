import baseURL from "../Api/baseURL";

const useGetData = async (url, params) => {
  const res = await baseURL.get(url, params);
  // If the URL is for bookings, ensure we return an array
  if (url.includes("/Booking/")) {
    return Array.isArray(res.data) ? res.data : [];
  }
  return res.data;
};

const useGetDataToken = async (url, params) => {
  const res = await baseURL.get(url, params);
  return res.data;
};

export { useGetData, useGetDataToken };
