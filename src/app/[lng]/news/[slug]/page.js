"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/app/i18n/client";
import NewsService from "@/services/NewsService";
import { LINK_URLS } from "@/utils/constants";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import LatestBlogsAside from "@/components/client/Blogs/LatestBlogsAside";

const NewsPage = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "default");
  const { slug } = useParams();
  const link = LINK_URLS.news;

  const { data } = useQuery({
    queryKey: ["oneNewsWorld"],
    queryFn: async ({ signal }) => {
      const { data } = await NewsService.getOneOriginCountry(slug, lng, signal);
      return data;
    },
  });

  const latestBlogs = useQuery({
    queryKey: ["blogNewsOriginCountryLatest"],
    queryFn: async ({ signal }) => {
      const getData = {
        lang: lng,
        subcategory: "",
        published_date_start: "",
        published_date_end: "",
        search: "",
        limit: 5,
        offset: "",
      };
      const { data } = await NewsService.getNewsOriginCountry(getData);
      return data;
    },
  });

  return (
    <>
      <section className="section publdet__container">
        <div className="container">
          <div className="publdet">
            <h2 className="title title-left title-h2 text-low bold publdet__title">
              {data?.title}
            </h2>
            <div className="publdet-wrap">
              <BlogContentPageClient data={data} lng={lng} />
              <aside className="publdet-aside">
                <div className="publdet-aside-wrapper">
                  <h3 className="title title-h3 mdm publdet-aside__title">
                    {t("latestNews")}
                  </h3>
                  <LatestBlogsAside data={latestBlogs} link={link} lng={lng} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;
