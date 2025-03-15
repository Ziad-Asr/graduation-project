import baseURL from "../Api/baseURL";

const useDeleteData = async (url, params) => {
  // console.log(params);
  
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const res = await baseURL.delete(url, config, params);
  return res.data;
};

export default useDeleteData;