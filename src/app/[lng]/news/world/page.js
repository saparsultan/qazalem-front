import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import NewsService from "@/services/NewsService";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import NewsWorldClient from "@/components/client/Blogs/NewsWorld.client";

const NewsWorld = async ({ params: { lng } }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["blogNewsWorld"], async () => {
    const { data } = await NewsService.getNewsWorld();
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <NewsWorldClient lng={lng} />
    </ReactQueryHydrate>
  );
};

export default NewsWorld;
