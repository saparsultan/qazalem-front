"use client";
import React, { useEffect } from "react";
import InformationCard from "@/components/client/Blogs/InformationCard";
import { useQuery } from "@tanstack/react-query";
import InformationService from "@/services/InformationService";
import { useParams } from "next/navigation";
import { LINK_URLS } from "@/utils/constants";
import parse from "html-react-parser";

const AboutCountryPage = ({ params: { lng } }) => {
  const { slug } = useParams();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["infoAboutCountryContent"],
    queryFn: async () => {
      const { data } = await InformationService.getAboutCountryContent(
        slug,
        lng,
      );
      return data;
    },
  });
  console.log({ data });

  useEffect(() => {
    if (data) {
      const parsedHtml = parse(data?.body_text, {
        replace: (domNode) => {
          if (domNode.name === "h3" && domNode.attribs && domNode.attribs.id) {
            return <h3 key={domNode.attribs.id}>{domNode.children}</h3>;
          }
        },
      });

      console.log({ parsedHtml });
    }
  }, [isSuccess]);

  return (
    <section className="section section--publish about-country-page__container">
      <div className="container">
        <div className="about-country-page">
          <h2 className="title title-h2">География</h2>
          <div className="about-country-wrap">
            <div className="about-country-content">
              <div className="about-country-content__grid grid grid-3">
                {!isLoading &&
                  isSuccess &&
                  data?.subcategory.map(({ id, name, image }) => {
                    let link = `/${lng}/${LINK_URLS.aboutKazakhstan}/${slug}`;
                    return (
                      <InformationCard
                        key={id}
                        id={id}
                        name={name}
                        image={image}
                        link={link}
                        lng={lng}
                      />
                    );
                  })}
              </div>
              <div className="about-country-content__content">
                <div
                  dangerouslySetInnerHTML={{ __html: data?.body_text }}
                  className="inner-html"
                />
              </div>
            </div>
            <aside className="about-country-aside"></aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCountryPage;
