import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import NewsService from "@/services/NewsService";
import { ReactQueryHydrate } from "@/components/client/ReactQueryHydrate/ReactQueryHydrate";
import NewsOriginCountryClient from "@/components/client/Blogs/NewsOriginCountry.client";

const NewsOriginCountry = async ({ params: { lng } }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["blogNewsOriginCountry"], async () => {
    const { data } = await NewsService.getNewsOriginCountry();
    return data;
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <NewsOriginCountryClient lng={lng} />
    </ReactQueryHydrate>
  );
};

export default NewsOriginCountry;
