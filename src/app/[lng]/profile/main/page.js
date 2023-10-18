// import getQueryClient from "@/utils/getQueryClient";
// import { dehydrate } from "@tanstack/react-query";
// import UserService from "@/services/UserService";
// import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import MainInfo from "@/components/client/Profile/MainInfo";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// let userId;
// if (typeof window !== "undefined") {
//   userId = localStorage.getItem("userId");
// }
export default async function ProfileMain({ params: { lng } }) {
  // const session = await getServerSession(authOptions);
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(["userMain"], async () => {
  //   const { data } = await UserService.getUserMain(userId);
  //   return data;
  // });
  // const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        Основная информация
      </h2>
      {/*<ReactQueryHydrate state={dehydratedState}>*/}
      <MainInfo lng={lng} />
      {/*</ReactQueryHydrate>*/}
    </>
  );
}
