import AdditionalInfo from "@/components/client/Profile/AdditionalInfo";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import getQueryClient from "@/utils/getQueryClient";
import UserService from "@/services/UserService";
import { dehydrate } from "@tanstack/react-query";

let userId;
if (typeof window !== "undefined") {
  userId = localStorage.getItem("userId");
}
const ProfileAdditional = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["userAdditional"], async () => {
    const { data } = await UserService.getUserSocial(userId);
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        Дополнительная информация
      </h2>
      <ReactQueryHydrate state={dehydratedState}>
        <AdditionalInfo userId={userId} />
      </ReactQueryHydrate>
    </>
  );
};

export default ProfileAdditional;
