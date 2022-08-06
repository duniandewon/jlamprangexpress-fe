/* eslint-disable no-unused-expressions */
import { useQuery } from "@tanstack/react-query";

import useFetchPrivate from "hooks/useFetchPrivate";

const useMembers = () => {
  const fetch = useFetchPrivate();

  const getMembers = async () => {
    const options = {
      method: "GET",
      url: "user?page=1&limit=15",
    };

    const res = await fetch(options);

    return res.data;
  };

  const { data, isLoading } = useQuery(["members"], getMembers);

  return { data, isLoading };
};

export default useMembers;
