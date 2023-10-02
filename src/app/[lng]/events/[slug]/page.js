"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import NewsService from "@/services/NewsService";
import BlogContentPageClient from "@/components/client/Blogs/BlogContentPage.client";
import EventAside from "@/components/client/Blogs/EventAside";

const EventPage = ({ params: { lng } }) => {
  const { slug } = useParams();
  const { data } = useQuery({
    queryKey: ["oneEvents"],
    queryFn: async ({ signal }) => {
      const { data } = await NewsService.getOneEvents(slug, lng, signal);
      return data;
    },
  });
  console.log({ data });

  return (
    <>
      <section className="section publdet__container">
        <div className="container">
          <div className="publdet">
            <h2 className="title title-left title-h2 text-low bold publdet__title">
              {data?.title}
            </h2>
            <div className="publdet-wrap">
              <BlogContentPageClient data={data} lng={lng} noArticleWidget />
              <EventAside
                startDate={data?.event_date}
                endDate={data?.event_date_end}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventPage;
