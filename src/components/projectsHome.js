import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Accordion } from "@szhsin/react-accordion";
import "react-tabs/style/react-tabs.scss";
import AccordionItem from "@/components/accordionItem";
import Link from "next/link";
import Image from "next/image";
import tabImg1 from "@/assets/img/tab-img1.jpg";
import projects1 from "@/assets/img/projects1.jpg";

const ProjectsHome = (props) => {
  return (
    <div className="projects">
      {/*<Tabs className="company-list__tabs-wrap">*/}
      {/*  <TabList className="company-list__tabs">*/}
      {/*    <Tab className="company-list__tab">Kazakh Tourism</Tab>*/}
      {/*    <Tab className="company-list__tab">Kazakh Invest</Tab>*/}
      {/*    <Tab className="company-list__tab">Alem Metaverse</Tab>*/}
      {/*    <Tab className="company-list__tab">QazTrade</Tab>*/}
      {/*    <Tab className="company-list__tab">KazakhExport</Tab>*/}
      {/*    <Tab className="company-list__tab">ВТП Атамекен</Tab>*/}
      {/*    <Tab className="company-list__tab">Astana Hub</Tab>*/}
      {/*  </TabList>*/}
      {/*</Tabs>*/}

      <Tabs className="projects-wrap">
        <Accordion
          transition
          transitionTimeout={250}
          className="projects-accordion"
        >
          <AccordionItem
            header="Волонтеры Отандастар"
            initialEntered
            className="projects-accordion__item"
          >
            <TabList className="projects-accordion__tabs">
              <Tab className="projects-accordion__tab">Казахский язык</Tab>
              <Tab className="projects-accordion__tab">Домбра</Tab>
              <Tab className="projects-accordion__tab">Тогызкумалак</Tab>
              <Tab className="projects-accordion__tab">Национальные блюда</Tab>
            </TabList>
          </AccordionItem>

          <AccordionItem header="Курсы">
            <TabList className="projects-accordion__tabs">
              <Tab className="projects-accordion__tab">Казахский язык</Tab>
              <Tab className="projects-accordion__tab">Домбра</Tab>
              <Tab className="projects-accordion__tab">Тогызкумалак</Tab>
              <Tab className="projects-accordion__tab">Национальные блюда</Tab>
            </TabList>
          </AccordionItem>

          <AccordionItem header="Гид">
            <TabList className="projects-accordion__tabs">
              <Tab className="projects-accordion__tab">Казахский язык</Tab>
              <Tab className="projects-accordion__tab">Домбра</Tab>
              <Tab className="projects-accordion__tab">Тогызкумалак</Tab>
              <Tab className="projects-accordion__tab">Национальные блюда</Tab>
            </TabList>
          </AccordionItem>
          <AccordionItem header="Казахстанские бренды">
            <TabList className="projects-accordion__tabs">
              <Tab className="projects-accordion__tab">Казахский язык</Tab>
              <Tab className="projects-accordion__tab">Домбра</Tab>
              <Tab className="projects-accordion__tab">Тогызкумалак</Tab>
              <Tab className="projects-accordion__tab">Национальные блюда</Tab>
            </TabList>
          </AccordionItem>
          <AccordionItem header="Алтын Бесік">
            <TabList className="projects-accordion__tabs">
              <Tab className="projects-accordion__tab">Казахский язык</Tab>
              <Tab className="projects-accordion__tab">Домбра</Tab>
              <Tab className="projects-accordion__tab">Тогызкумалак</Tab>
              <Tab className="projects-accordion__tab">Национальные блюда</Tab>
            </TabList>
          </AccordionItem>
        </Accordion>
        <div className="projects-content-wrap">
          <TabPanel>
            <div className="projects-content">
              <div className="projects-content__img">
                <Image src={projects1} alt="projects 1" />
              </div>
              <div className="projects-content__title bold">Домбра</div>
              <p className="projects-content__desc">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                текстов на латинице с начала XVI века. В то время некий
                безымянный печатник создал большую коллекцию размеров и форм
                шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                Ipsum не только успешно пережил.
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="projects-content">
              <div className="projects-content__img">
                <Image src={projects1} alt="projects 1" />
              </div>
              <div className="projects-content__title bold">Домбра 2</div>
              <p className="projects-content__desc">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                текстов на латинице с начала XVI века. В то время некий
                безымянный печатник создал большую коллекцию размеров и форм
                шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                Ipsum не только успешно пережил.
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="projects-content">
              <div className="projects-content__img">
                <Image src={projects1} alt="projects 1" />
              </div>
              <div className="projects-content__title bold">Домбра 3</div>
              <p className="projects-content__desc">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                текстов на латинице с начала XVI века. В то время некий
                безымянный печатник создал большую коллекцию размеров и форм
                шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                Ipsum не только успешно пережил.
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="projects-content">
              <div className="projects-content__img">
                <Image src={projects1} alt="projects 1" />
              </div>
              <div className="projects-content__title bold">Домбра 4</div>
              <p className="projects-content__desc">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                текстов на латинице с начала XVI века. В то время некий
                безымянный печатник создал большую коллекцию размеров и форм
                шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                Ipsum не только успешно пережил.
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="projects-content">
              <div className="projects-content__img">
                <Image src={projects1} alt="projects 1" />
              </div>
              <div className="projects-content__title bold">Домбра 5</div>
              <p className="projects-content__desc">
                Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для
                текстов на латинице с начала XVI века. В то время некий
                безымянный печатник создал большую коллекцию размеров и форм
                шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
                Ipsum не только успешно пережил.
              </p>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default ProjectsHome;
