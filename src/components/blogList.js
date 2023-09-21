import React from "react";
import Image from "next/image";
import interview1 from "@/assets/img/interview-1.jpg";
import Link from "next/link";
import BlogItem from "@/components/client/Blogs/BlogItem";
const BlogList = (props) => {
  return (
    <div className="blog-list">
      <BlogItem />
      <BlogItem />
      <BlogItem />
      <BlogItem />
    </div>
  );
};

export default BlogList;
