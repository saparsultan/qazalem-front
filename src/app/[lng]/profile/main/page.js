import getQueryClient from "@/utils/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import UserService from "@/services/userService";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import MainInfo from "@/components/client/Profile/MainInfo";

let userId;
if (typeof window !== "undefined") {
  userId = localStorage.getItem("userId");
}
const ProfileMain = async ({ params: { lng } }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["userMain"], async () => {
    const { data } = await UserService.getUserMain(userId);
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        Основная информация
      </h2>
      <ReactQueryHydrate state={dehydratedState}>
        <MainInfo lng={lng} />
      </ReactQueryHydrate>
    </>
  );
};

export default ProfileMain;
