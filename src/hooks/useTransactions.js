import { useQuery } from "@tanstack/react-query";

import useFetchPrivate from "hooks/useFetchPrivate";

const useTransactions = () => {
  const fetch = useFetchPrivate();

  const getDeliveries = async () => {
    const options = {
      method: "GET",
      url: "transaction?page=0&limit=15",
    };

    const res = await fetch(options);

    return res.data;
  };

  const { data, isLoading } = useQuery(["transactions"], getDeliveries);

  return { data, isLoading };
};

export default useTransactions;
