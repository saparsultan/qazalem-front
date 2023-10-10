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
import UserService from "@/services/UserService";
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
  const [showMenu, setShowMenu] = useState(false);

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
  }, []);

  const { data, isSuccess } = useQuery({
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

  const handlePushLogin = async () => {
    setShowProfile(!showProfile);
    if (isSuccess) {
      await router.push(`/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`);
    } else {
      router.push(`/${lng}/${LINK_URLS.login}`, {
        scroll: false,
      });
    }
    await router.refresh();
  };

  const handlePushAuth = async () => {
    setShowProfile(!showProfile);
    if (isSuccess) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      router.push(`/${lng}`, {
        scroll: false,
      });
    } else {
      router.push(`/${lng}/${LINK_URLS.signUp}`, {
        scroll: false,
      });
    }
    await router.refresh();
  };

  console.log({ isSuccess });
  console.log({ data });

  return (
    <>
      <header
        className={
          pathname === `/${lng}` || pathname === "/"
            ? "header__container header__container--home"
            : "header__container"
        }
      >
        <div className="container">
          <div className="header">
            <div className="burger" onClick={() => setShowMenu(!showMenu)}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.3916 18.4912C4.10827 18.4912 3.87077 18.3954 3.6791 18.2037C3.48743 18.012 3.3916 17.7745 3.3916 17.4912C3.3916 17.2079 3.48743 16.9704 3.6791 16.7787C3.87077 16.587 4.10827 16.4912 4.3916 16.4912H20.3916C20.6749 16.4912 20.9124 16.587 21.1041 16.7787C21.2958 16.9704 21.3916 17.2079 21.3916 17.4912C21.3916 17.7745 21.2958 18.012 21.1041 18.2037C20.9124 18.3954 20.6749 18.4912 20.3916 18.4912H4.3916ZM4.3916 13.4912C4.10827 13.4912 3.87077 13.3954 3.6791 13.2037C3.48743 13.012 3.3916 12.7745 3.3916 12.4912C3.3916 12.2079 3.48743 11.9704 3.6791 11.7787C3.87077 11.587 4.10827 11.4912 4.3916 11.4912H20.3916C20.6749 11.4912 20.9124 11.587 21.1041 11.7787C21.2958 11.9704 21.3916 12.2079 21.3916 12.4912C21.3916 12.7745 21.2958 13.012 21.1041 13.2037C20.9124 13.3954 20.6749 13.4912 20.3916 13.4912H4.3916ZM4.3916 8.49121C4.10827 8.49121 3.87077 8.39538 3.6791 8.20371C3.48743 8.01204 3.3916 7.77454 3.3916 7.49121C3.3916 7.20788 3.48743 6.97038 3.6791 6.77871C3.87077 6.58704 4.10827 6.49121 4.3916 6.49121H20.3916C20.6749 6.49121 20.9124 6.58704 21.1041 6.77871C21.2958 6.97038 21.3916 7.20788 21.3916 7.49121C21.3916 7.77454 21.2958 8.01204 21.1041 8.20371C20.9124 8.39538 20.6749 8.49121 20.3916 8.49121H4.3916Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <Link href={`/${lng}`} className="header-logo logo">
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
              <Link
                href={`/${lng}/${LINK_URLS.interview}`}
                className="nav__link"
              >
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
                  {data && isSuccess ? (
                    <span>{data?.firstname?.charAt(0).toUpperCase()}</span>
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
                    <div
                      onClick={handlePushLogin}
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
                    </div>
                    <div
                      onClick={handlePushAuth}
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={cx("mobile-menu__overlay", {
          active: showMenu,
        })}
      >
        <div
          className={cx("mobile-menu", {
            active: showMenu,
          })}
        >
          <div className="mobile-menu-content">
            <div className="mobile-menu-content__header">
              <Link href={`/${lng}`} className="header-logo logo">
                <div className="logo__icon">
                  <Image src={logoPrimaryIcon} alt="logo" />
                </div>
                <div className="logo__text">QazAlem</div>
              </Link>
              <div
                className="mobile-menu-content__close"
                onClick={() => setShowMenu(!showMenu)}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9744 13.723L8.07441 18.623C7.89108 18.8064 7.65775 18.898 7.37441 18.898C7.09108 18.898 6.85775 18.8064 6.67441 18.623C6.49108 18.4397 6.39941 18.2064 6.39941 17.923C6.39941 17.6397 6.49108 17.4064 6.67441 17.223L11.5744 12.323L6.67441 7.42305C6.49108 7.23971 6.39941 7.00638 6.39941 6.72305C6.39941 6.43971 6.49108 6.20638 6.67441 6.02305C6.85775 5.83971 7.09108 5.74805 7.37441 5.74805C7.65775 5.74805 7.89108 5.83971 8.07441 6.02305L12.9744 10.923L17.8744 6.02305C18.0577 5.83971 18.2911 5.74805 18.5744 5.74805C18.8577 5.74805 19.0911 5.83971 19.2744 6.02305C19.4577 6.20638 19.5494 6.43971 19.5494 6.72305C19.5494 7.00638 19.4577 7.23971 19.2744 7.42305L14.3744 12.323L19.2744 17.223C19.4577 17.4064 19.5494 17.6397 19.5494 17.923C19.5494 18.2064 19.4577 18.4397 19.2744 18.623C19.0911 18.8064 18.8577 18.898 18.5744 18.898C18.2911 18.898 18.0577 18.8064 17.8744 18.623L12.9744 13.723Z"
                    fill="#1C1B1F"
                  />
                </svg>
              </div>
            </div>
            <ul className="list-reset mobile-menu-content__list mobile-nav">
              <li className="mobile-nav__item">
                <a href="" className="mobile-nav__link">
                  Портал туралы
                </a>
              </li>
              <li className="mobile-nav__item">
                <a href="" className="mobile-nav__link">
                  Хабарландырулар
                </a>
              </li>
              <li className="mobile-nav__item">
                <a href="" className="mobile-nav__link">
                  Жаңалықтар
                </a>
              </li>
              <li className="mobile-nav__item">
                <a href="" className="mobile-nav__link">
                  Сұхбаттар
                </a>
              </li>
              <li className="mobile-nav__item">
                <a href="" className="mobile-nav__link">
                  Қандастарды қолдау
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
