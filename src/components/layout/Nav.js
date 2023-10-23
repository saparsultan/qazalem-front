import React from "react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import { LINK_URLS } from "@/utils/constants";

export default async function Nav({ lng }) {
  const { t } = await useTranslation(lng, "layout");
  return (
    <nav className="header-nav nav">
      <Link href={`/${lng}/${LINK_URLS.about}`} className="nav__link">
        {t("aboutPortal")}
      </Link>
      <Link href={`/${lng}/${LINK_URLS.services}`} className="nav__link">
        {t("services")}
      </Link>
      <Link href={`/${lng}/${LINK_URLS.news}`} className="nav__link">
        {t("news")}
      </Link>
      <Link href={`/${lng}/${LINK_URLS.interview}`} className="nav__link">
        {t("interview")}
      </Link>
      <Link href={`/${lng}/${LINK_URLS.faq}`} className="nav__link">
        {t("bloodRelativeSupport")}
      </Link>
    </nav>
  );
}
