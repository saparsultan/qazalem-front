import React from "react";
import BlogItem from "@/components/client/Blogs/BlogItem";
const BlogList = ({ data, link }) => {
  return (
    <div className="blog-list">
      {data &&
        data?.results.map(
          ({ id, image_news, published_date, title_news, subcategory }) => (
            <BlogItem
              key={id}
              id={id}
              image={image_news}
              date={published_date}
              title={title_news}
              subcategory={subcategory}
              link={link}
            />
          ),
        )}
    </div>
  );
};

export default BlogList;
