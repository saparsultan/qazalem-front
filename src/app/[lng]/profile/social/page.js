import SocialInfo from "@/components/client/Profile/SocialInfo";
import getQueryClient from "@/utils/getQueryClient";
import UserService from "@/services/userService";
import { dehydrate } from "@tanstack/react-query";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";

let userId;
if (typeof window !== "undefined") {
  userId = localStorage.getItem("userId");
}
const ProfileSocial = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["userSocial"], async () => {
    const { data } = await UserService.getUserSocial(userId);
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        Социальные сети
      </h2>
      <ReactQueryHydrate state={dehydratedState}>
        <SocialInfo userId={userId} />
      </ReactQueryHydrate>
    </>
  );
};

export default ProfileSocial;
