"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trans } from "react-i18next/TransWithoutContext";
import { useQuery } from "@tanstack/react-query";
import cx from "classnames";
import { useTranslation } from "@/app/i18n/client";
import { languagesClient } from "@/app/i18n/settings";
import { LINK_URLS } from "@/utils/constants";
import { useAuthContext } from "@/providers/AuthProvider";
import UserService from "@/services/userService";
import logoIcon from "@/assets/img/logo.png";
import logoPrimaryIcon from "@/assets/img/logo-primary.png";

const Header = ({ lng }) => {
  const langClient = lng.toUpperCase();
  const { t } = useTranslation(lng, "layout");
  const blockRef = useRef(null);
  const langRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const { setAuth } = useAuthContext();
  const [showProfile, setShowProfile] = useState(false);
  const [showLang, setShowLang] = useState(false);

  let userId;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickLangOutside);
    return () => {
      document.removeEventListener("click", handleClickLangOutside);
    };
  }, [pathname]);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["userMain"],
    queryFn: async () => {
      const { data } = await UserService.getUserMain(userId);
      setAuth(data);
      return data;
    },
    staleTime: Infinity,
  });

  const handleClickOutside = (event) => {
    if (blockRef.current && !blockRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };
  const handleClickLangOutside = (event) => {
    if (langRef.current && !langRef.current.contains(event.target)) {
      setShowLang(false);
    }
  };

  const handleClickLang = (e) => {
    const regex = /\/([^/]+)\/(.*)/;
    if (pathname.match(regex)) {
      router.push(`/${e}/${pathname.match(regex)[2]}`);
    } else {
      router.push(`/${e}`);
    }
    setShowLang(!showLang);
  };

  console.log({ isSuccess });
  console.log({ data });

  return (
    <header
      className={
        pathname === `/${lng}` || pathname === "/"
          ? "header__container header__container--home"
          : "header__container"
      }
    >
      <div className="container">
        <div className="header">
          <Link href={`/${lng}`} className="logo">
            <div className="logo__icon">
              <Image
                src={
                  pathname === `/${lng}` || pathname === "/"
                    ? logoIcon
                    : logoPrimaryIcon
                }
                alt="logo"
              />
            </div>
            {/*<div className="logo__text">QAZALEM</div>*/}
          </Link>
          <nav className="header-nav nav">
            <Link href={`/${lng}/about`} className="nav__link">
              {t("aboutPortal")}
            </Link>
            <Link href={`/${lng}/${LINK_URLS.events}`} className="nav__link">
              {t("events")}
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
          <div className="header-actions">
            <div className="lang-block" ref={langRef}>
              <div className="lang" onClick={() => setShowLang(!showLang)}>
                <Trans i18nKey="languageSwitcher" t={t}>
                  {{ langClient }}
                </Trans>
              </div>
              {showLang && (
                <div className="lang__popup">
                  {languagesClient
                    .filter((l) => lng !== l.value)
                    .map((l, index) => {
                      return (
                        <div
                          key={`${index}${l?.value}`}
                          className="lang__link"
                          onClick={() => handleClickLang(l?.value)}
                        >
                          {l.label}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="auth-block" ref={blockRef}>
              <button
                className="btn-reset auth-block__login"
                onClick={() => setShowProfile(!showProfile)}
              >
                {isSuccess ? (
                  <span>{data?.firstname.charAt(0).toUpperCase()}</span>
                ) : (
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
              {showProfile && (
                <div
                  className={cx("auth-block__popup", {
                    login: isSuccess,
                  })}
                >
                  <Link
                    href={
                      isSuccess
                        ? `/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`
                        : `/${lng}/${LINK_URLS.login}`
                    }
                    className="auth-block__link auth-block__link--first"
                  >
                    {isSuccess && (
                      <svg
                        width="23"
                        height="23"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    <span>{isSuccess ? t("profile") : t("login")}</span>
                  </Link>
                  <Link
                    href={`/${lng}/${LINK_URLS.signUp}`}
                    className="auth-block__link auth-block__link--second"
                  >
                    {isSuccess && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.4395 14.62L19.9995 12.06L17.4395 9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.75977 12.0601H19.9298"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.7598 20C7.33977 20 3.75977 17 3.75977 12C3.75977 7 7.33977 4 11.7598 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <span>{isSuccess ? t("logout") : t("registration")}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
