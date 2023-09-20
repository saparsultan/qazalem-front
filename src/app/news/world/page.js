"use client";
import React from "react";
import { Form, DatePicker, Select, Input } from "antd";
const { RangePicker } = DatePicker;
import locale from "antd/es/date-picker/locale/ru_RU";
import BlogList from "@/components/blogList";
import BlogItem from "@/components/blogItem";
const { Search } = Input;

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const WorldNews = (props) => {
  return (
    <section className="section section--publish publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            Мировые новости
          </h2>
          <div className="publish">
            <div className="publish-filter publish-item">
              <div className="publish-filter__left">
                <RangePicker locale={locale} />
                <Select
                  showSearch
                  placeholder="Выбор категории"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />
              </div>
              <div className="publish-filter__right">
                <Search
                  placeholder="Поиск..."
                  onSearch={onSearch}
                  className="publish-search__input"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <div className="publish-grid publish-item">
              <BlogItem />
              <BlogItem />
              <BlogItem />
              <BlogItem />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldNews;
