/* eslint-disable no-unused-expressions */
import { useQuery } from "@tanstack/react-query";

import useFetchPrivate from "hooks/useFetchPrivate";

const useDeliveries = () => {
  const fetch = useFetchPrivate();

  const getDeliveries = async () => {
    const options = {
      method: "GET",
      url: "delivery?page=1&limit=15",
    };

    const res = await fetch(options);

    return res.data;
  };

  const { data, isLoading } = useQuery(["deliveries"], getDeliveries);

  return { data, isLoading };
};

export default useDeliveries;
