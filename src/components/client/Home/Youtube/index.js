"use client";
import { useQuery } from "@tanstack/react-query";
import HomeService from "@/services/HomeServices";
import { GOOGlE_API_KEY, YOTUBE_CHANNEL_ID } from "@/utils/constants";
import YouTubePlayer from "@/components/client/Home/Youtube/YoutubePlayer";
import MoreLink from "@/components/layout/MoreLink";

const Youtube = () => {
  const { data } = useQuery({
    queryKey: ["yotubeVideos"],
    queryFn: async () => {
      const part = "snippet";
      const maxResults = 3;
      const order = "date";
      const { data } = await HomeService.getYoutubeVideos(
        part,
        YOTUBE_CHANNEL_ID,
        maxResults,
        order,
        GOOGlE_API_KEY,
      );
      return data;
    },
  });

  console.log("{ data }", data?.items);

  return (
    <div className="video-content">
      <div className="video-content__list">
        {data &&
          data?.items.map((video, id) => {
            return (
              <div
                key={video.id.videoId + id}
                className={`video-content__thumbnail video-content__thumbnail--${id}`}
                style={{
                  backgroundImage: `url(${video.snippet.thumbnails.high.url})`,
                }}
              >
                <YouTubePlayer
                  className={`video-content__item video-content__item--${id}`}
                  videoId={video.id.videoId}
                />
              </div>
            );
          })}
      </div>
      <MoreLink
        link="https://www.youtube.com/channel/UCef62ITFdIiXn3oXc_0BCLg"
        target
      >
        Все видео
      </MoreLink>
    </div>
  );
};

export default Youtube;
