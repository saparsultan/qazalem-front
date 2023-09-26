"use client";
import { DatePicker, Select, Input } from "antd";
const { RangePicker } = DatePicker;
import locale from "antd/es/date-picker/locale/ru_RU";
import { useQuery } from "@tanstack/react-query";
import NewsService from "@/services/NewsService";
import BlogItem from "@/components/client/Blogs/BlogItem";
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

const EventsClient = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useQuery({
    queryKey: ["blogNewsWorld"],
    queryFn: async () => {
      const { data } = await NewsService.getNewsWorld();
      return data;
    },
  });
  console.log({ data });

  return (
    <section className="section section--publish news-world__container">
      <div className="container">
        <div className="news-world">
          <h2 className="title title-left text-low title-h2 news-world__title">
            Анонс мероприятий
          </h2>
          <div className="publish">
            <div className="publish-filter publish-item">
              <Search
                placeholder="Поиск..."
                onSearch={onSearch}
                className="publish-search__input"
                style={{
                  width: "100%",
                }}
              />
              <RangePicker locale={locale} />
              <Select
                showSearch
                placeholder="Страна проведения"
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
              <Select
                showSearch
                placeholder="Тип мероприятия"
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
            <div className="publish-grid publish-item">
              {data &&
                data?.results.map(
                  ({
                    id,
                    image_news,
                    published_date,
                    title_news,
                    subcategory,
                  }) => (
                    <BlogItem
                      key={id}
                      id={id}
                      image={image_news}
                      date={published_date}
                      title={title_news}
                      subcategory={subcategory}
                    />
                  ),
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsClient;
