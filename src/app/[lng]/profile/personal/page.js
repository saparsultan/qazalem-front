import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import UserService from "@/services/userService";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import PersonalInfo from "@/components/client/Profile/PersonalInfo";

let userId;
if (typeof window !== "undefined") {
  userId = localStorage.getItem("userId");
}
const ProfilePersonal = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["userPersonal"], async () => {
    const { data } = await UserService.getUserPersonal(userId);
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        Персональные данные
      </h2>
      <ReactQueryHydrate state={dehydratedState}>
        <PersonalInfo userId={userId} />
      </ReactQueryHydrate>
    </>
  );
};

export default ProfilePersonal;
