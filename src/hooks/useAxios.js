import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseData, setResponseData] = useState(null);

  const startRequest = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: config.method || "GET",
        url: config.url,
        data: config.data || null,
        params: config.params || null,
        headers: config.headers || {},
      });
      setLoading(false);

      setResponseData(response.data);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error);
      toast.error(error.response?.data?.message || "An error occurred");
      throw error;
    }
  }, []);

  return {
    startRequest,
    loading,
    error,
    responseData,
  };
};

export default useAxios;
