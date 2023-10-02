"use client";
import { useParams } from "next/navigation";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import NewsService from "@/services/NewsService";
import LatestBlogsAside from "@/components/client/Blogs/LatestBlogsAside";

const InterviewPage = ({ params: { lng } }) => {
  const { slug } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["oneInterview"],
    queryFn: async ({ signal }) => {
      const { data } = await NewsService.getOneInterview(slug, lng, signal);
      return data;
    },
  });

  const latestBlogs = useQuery({
    queryKey: ["blogInterviewLatest"],
    queryFn: async ({ signal }) => {
      const getData = {
        published_date_start: "",
        published_date_end: "",
        search: "",
        limit: 5,
        offset: "",
        lang: lng,
      };
      const { data } = await NewsService.getInterview(getData);
      return data;
    },
  });

  console.log("latestBlogs", latestBlogs);

  return (
    <>
      <section className="section publdet__container">
        <div className="container">
          <div className="publdet">
            <h2 className="title title-left title-h2 text-low bold publdet__title">
              {isLoading ? (
                <Skeleton
                  paragraph={{
                    rows: 1,
                    width: "100%",
                  }}
                  active
                  round
                />
              ) : (
                data?.title
              )}
            </h2>
            <div className="publdet-wrap">
              <BlogContentPageClient data={data} lng={lng} />
              <aside className="publdet-aside">
                <div className="publdet-aside-wrapper">
                  <h3 className="title title-h3 sm-bold publdet-aside__title">
                    Последние интервью
                  </h3>
                  <LatestBlogsAside data={latestBlogs} lng={lng} />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InterviewPage;
