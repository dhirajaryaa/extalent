import { getUserProfileApi } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export const userUser = (enable) => {
  const getUserProfile = useQuery({
    queryKey:['user'],
    queryFn: getUserProfileApi,
    enabled: enable
  })
};
