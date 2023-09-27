import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export const UserService = () => {
  const $apiPrivate = useAxiosPrivate;
  return $apiPrivate.get(`user/profile/main/${id}`);
};
