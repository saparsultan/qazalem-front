import { useTranslation } from "@/app/i18n";
import KazakhTourismClient from "@/components/client/Services/KazakhTourism.client";
import BackLink from "@/components/client/BackLink";
export default async function KazakhTourism({ params: { lng } }) {
  const { t } = await useTranslation(lng, "default");
  return (
    <section className="section section--publish services-page__container services-page__container--form">
      <div className="container container-content">
        <div className="services-page">
          <div className="services-page__head">
            <BackLink lng={lng} small />
            <h2 className="title text-low title-left title-h2 services-page__title publish__title">
              {t("titleFormTourism")}
            </h2>
            <p className="publish__desc">{t("descFormTourism")}</p>
          </div>
          <KazakhTourismClient lng={lng} />
        </div>
      </div>
    </section>
  );
}
