"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { useTranslation } from "@/app/i18n/client";
import { languagesClient } from "@/app/i18n/settings";
import { LINK_URLS } from "@/utils/constants";
import { useAuthContext } from "@/providers/AuthProvider";
import UserService from "@/services/userService";
import logoIcon from "@/assets/img/logo.png";
import logoPrimaryIcon from "@/assets/img/logo-primary.png";

const Header = ({ lng }) => {
  const langClinet = lng.toUpperCase();
  const router = useRouter();
  const pathname = usePathname();
  const { auth, setAuth } = useAuthContext();
  let userId;
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("userId");
  }

  const { data } = useQuery({
    queryKey: ["userMain"],
    queryFn: async () => {
      const { data } = await UserService.getUserMain(userId);
      setAuth(data);
      return data;
    },
    staleTime: Infinity,
  });

  // const [isPending, startTransition] = useTransition();
  function onSelectChange(e) {
    const regex = /\/([^/]+)\/(.*)/;
    if (pathname.match(regex)) {
      router.push(`/${e}/${pathname.match(regex)[2]}`);
    } else {
      router.push(`/${e}`);
    }
  }

  const { t } = useTranslation(lng, "layout");
  return (
    <header
      className={
        pathname === `/${lng}` || pathname === "/"
          ? "header__container header__container--home"
          : "header__container"
      }
    >
      {/*<div className="header-top__container">*/}
      {/*  <div className="container">*/}
      {/*    <div className="header-top">*/}
      {/*      <ul className="social header-social list-reset">*/}
      {/*        <li className="social__item">*/}
      {/*          <a href="#" className="social__link">*/}
      {/*            <i className="social__icon">*/}
      {/*              <svg*/}
      {/*                width="18"*/}
      {/*                height="19"*/}
      {/*                viewBox="0 0 18 19"*/}
      {/*                fill="none"*/}
      {/*                xmlns="http://www.w3.org/2000/svg"*/}
      {/*              >*/}
      {/*                <path*/}
      {/*                  d="M17.8963 9.42275C17.8963 4.47962 13.8913 0.474609 8.94814 0.474609C4.00501 0.474609 0 4.47962 0 9.42275C0 13.8889 3.2722 17.5908 7.54999 18.2626V12.0094H5.27688V9.42275H7.54999V7.45127C7.54999 5.20882 8.885 3.97016 10.9297 3.97016C11.909 3.97016 12.9329 4.14479 12.9329 4.14479V6.34574H11.8043C10.693 6.34574 10.3463 7.03562 10.3463 7.74317V9.42275H12.828L12.4311 12.0094H10.3463V18.2626C14.6241 17.5908 17.8963 13.8889 17.8963 9.42275Z"*/}
      {/*                  fill="currentColor"*/}
      {/*                />*/}
      {/*              </svg>*/}
      {/*            </i>*/}
      {/*            <span className="social__text">Instagram</span>*/}
      {/*          </a>*/}
      {/*        </li>*/}
      {/*        <li className="social__item">*/}
      {/*          <a href="#" className="social__link">*/}
      {/*            <i className="social__icon">*/}
      {/*              <svg*/}
      {/*                width="19"*/}
      {/*                height="19"*/}
      {/*                viewBox="0 0 19 19"*/}
      {/*                fill="none"*/}
      {/*                xmlns="http://www.w3.org/2000/svg"*/}
      {/*              >*/}
      {/*                <path*/}
      {/*                  d="M9.49331 0.420166C4.55149 0.420166 0.545166 4.42649 0.545166 9.36831C0.545166 14.3101 4.55149 18.3164 9.49331 18.3164C14.4351 18.3164 18.4414 14.3101 18.4414 9.36831C18.4414 4.42649 14.4351 0.420166 9.49331 0.420166ZM9.49331 2.0471C13.5366 2.0471 16.8145 5.32497 16.8145 9.36831C16.8145 13.4116 13.5366 16.6895 9.49331 16.6895C5.44997 16.6895 2.1721 13.4116 2.1721 9.36831C2.1721 5.32497 5.44997 2.0471 9.49331 2.0471ZM13.1706 5.84513C12.964 5.8213 12.7044 5.87793 12.4143 5.98257C11.8843 6.17373 5.11023 9.05022 4.71895 9.21657C4.34842 9.37439 3.99725 9.54638 3.99684 9.7949C3.99684 9.96979 4.10055 10.0686 4.38689 10.1707C4.68462 10.2772 5.43544 10.5042 5.87878 10.6266C6.30585 10.7442 6.79151 10.6417 7.06403 10.4725C7.3524 10.2932 10.6845 8.06371 10.9232 7.86847C11.162 7.67324 11.3528 7.92387 11.1576 8.11951C10.9623 8.31515 8.675 10.5336 8.3732 10.8411C8.00714 11.2145 8.26735 11.6013 8.51301 11.7563C8.79325 11.9332 10.8108 13.286 11.1147 13.5032C11.4185 13.7204 11.7261 13.8185 12.0084 13.8185C12.2907 13.8185 12.4392 13.4465 12.5796 13.0154C12.7443 12.5106 13.5159 7.47783 13.6107 6.48622C13.6396 6.18564 13.5447 5.98585 13.3589 5.89677C13.3026 5.86982 13.2395 5.85308 13.1706 5.84513Z"*/}
      {/*                  fill="currentColor"*/}
      {/*                />*/}
      {/*              </svg>*/}
      {/*            </i>*/}
      {/*            <span className="social__text">Telegram</span>*/}
      {/*          </a>*/}
      {/*        </li>*/}
      {/*        <li className="social__item">*/}
      {/*          <a href="#" className="social__link">*/}
      {/*            <i className="social__icon">*/}
      {/*              <svg*/}
      {/*                width="19"*/}
      {/*                height="19"*/}
      {/*                viewBox="0 0 19 19"*/}
      {/*                fill="none"*/}
      {/*                xmlns="http://www.w3.org/2000/svg"*/}
      {/*              >*/}
      {/*                <path*/}
      {/*                  d="M9.72808 4.81658C7.18745 4.81658 5.13816 6.84878 5.13816 9.36824C5.13816 11.8877 7.18745 13.9199 9.72808 13.9199C12.2687 13.9199 14.318 11.8877 14.318 9.36824C14.318 6.84878 12.2687 4.81658 9.72808 4.81658ZM9.72808 12.3274C8.08625 12.3274 6.74403 11.0003 6.74403 9.36824C6.74403 7.73614 8.08226 6.40906 9.72808 6.40906C11.3739 6.40906 12.7121 7.73614 12.7121 9.36824C12.7121 11.0003 11.3699 12.3274 9.72808 12.3274ZM15.5763 4.63039C15.5763 5.22064 15.097 5.69205 14.5057 5.69205C13.9105 5.69205 13.4352 5.21668 13.4352 4.63039C13.4352 4.0441 13.9145 3.56873 14.5057 3.56873C15.097 3.56873 15.5763 4.0441 15.5763 4.63039ZM18.6163 5.70789C18.5484 4.28575 18.2208 3.02602 17.1702 1.98812C16.1236 0.950233 14.8533 0.625397 13.4192 0.554092C11.9411 0.470902 7.51102 0.470902 6.03298 0.554092C4.60287 0.621436 3.33256 0.946272 2.28195 1.98416C1.23134 3.02205 0.90777 4.28178 0.835866 5.70393C0.751977 7.16966 0.751977 11.5629 0.835866 13.0286C0.903776 14.4507 1.23134 15.7105 2.28195 16.7484C3.33256 17.7863 4.59888 18.1111 6.03298 18.1824C7.51102 18.2656 11.9411 18.2656 13.4192 18.1824C14.8533 18.115 16.1236 17.7902 17.1702 16.7484C18.2168 15.7105 18.5444 14.4507 18.6163 13.0286C18.7002 11.5629 18.7002 7.17362 18.6163 5.70789ZM16.7068 14.6013C16.3952 15.3777 15.792 15.9759 15.0051 16.2888C13.8266 16.7523 11.0304 16.6454 9.72808 16.6454C8.4258 16.6454 5.62552 16.7484 4.45107 16.2888C3.66811 15.9798 3.06491 15.3817 2.74933 14.6013C2.28195 13.4327 2.38981 10.6597 2.38981 9.36824C2.38981 8.07682 2.28594 5.29987 2.74933 4.13521C3.06092 3.35877 3.66412 2.7606 4.45107 2.44765C5.62951 1.98416 8.4258 2.09112 9.72808 2.09112C11.0304 2.09112 13.8306 1.98812 15.0051 2.44765C15.788 2.75664 16.3912 3.35481 16.7068 4.13521C17.1742 5.30383 17.0663 8.07682 17.0663 9.36824C17.0663 10.6597 17.1742 13.4366 16.7068 14.6013Z"*/}
      {/*                  fill="currentColor"*/}
      {/*                />*/}
      {/*              </svg>*/}
      {/*            </i>*/}
      {/*            <span className="social__text">Facebook</span>*/}
      {/*          </a>*/}
      {/*        </li>*/}
      {/*      </ul>*/}
      {/*      <div className="lang">*/}
      {/*        <div className="lang-current">*/}
      {/*          <span className="lang-current__text">Русская</span>*/}
      {/*          <div className="lang-current__icon">*/}
      {/*            <svg*/}
      {/*              width="24"*/}
      {/*              height="24"*/}
      {/*              viewBox="0 0 24 24"*/}
      {/*              fill="none"*/}
      {/*              xmlns="http://www.w3.org/2000/svg"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M12.0001 14.6615C11.8796 14.6615 11.7675 14.6423 11.6636 14.6038C11.5598 14.5653 11.4611 14.4993 11.3675 14.4057L6.87325 9.91151C6.73478 9.77306 6.66395 9.59902 6.66075 9.38941C6.65753 9.17979 6.72837 9.00255 6.87325 8.85768C7.01812 8.71281 7.19375 8.64038 7.40015 8.64038C7.60655 8.64038 7.78218 8.71281 7.92705 8.85768L12.0001 12.9308L16.0732 8.85768C16.2117 8.71923 16.3857 8.6484 16.5953 8.64518C16.8049 8.64198 16.9822 8.71281 17.127 8.85768C17.2719 9.00255 17.3444 9.17819 17.3444 9.38461C17.3444 9.59101 17.2719 9.76664 17.127 9.91151L12.6328 14.4057C12.5392 14.4993 12.4405 14.5653 12.3367 14.6038C12.2328 14.6423 12.1207 14.6615 12.0001 14.6615Z"*/}
      {/*                fill="currentColor"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="container">
        <div className="header">
          <Link href="/" className="logo">
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
            <Link href={`/${lng}/projects`} className="nav__link">
              {t("projects")}
            </Link>
            <Link href={`/${lng}/students`} className="nav__link">
              {t("studentCommunity")}
            </Link>
            <Link href={`/${lng}/news/world`} className="nav__link">
              {t("bloodRelativeSupport")}
            </Link>
          </nav>
          <div className="header-actions">
            {auth !== undefined && auth && auth.id ? (
              <div className="user-wrap">
                <div className="user">
                  <div className="user-content">
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
                    <div className="user-content__text">{auth?.firstname}</div>
                  </div>
                  <svg
                    className="user-content__arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.99937 9.88716L13.0212 4.86536C13.1536 4.73288 13.3113 4.66835 13.4942 4.67176C13.6771 4.67518 13.8348 4.74313 13.9673 4.87561C14.0998 5.00809 14.166 5.16578 14.166 5.34868C14.166 5.53158 14.0998 5.68926 13.9673 5.82174L8.8532 10.9256C8.73269 11.0461 8.59765 11.1354 8.44808 11.1935C8.2985 11.2517 8.14893 11.2807 7.99937 11.2807C7.8498 11.2807 7.70023 11.2517 7.55065 11.1935C7.40108 11.1354 7.26604 11.0461 7.14553 10.9256L2.03143 5.81149C1.89895 5.67901 1.83442 5.52303 1.83783 5.34354C1.84125 5.16406 1.9092 5.00809 2.04168 4.87561C2.17416 4.74313 2.33185 4.67689 2.51475 4.67689C2.69765 4.67689 2.85534 4.74313 2.98782 4.87561L7.99937 9.88716Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="user-list-wrap user-list-wrap--active">
                  <div className="user-list">
                    <Link
                      href={`/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`}
                      className="user-list__link"
                    >
                      Профиль
                    </Link>
                    <Link
                      href={lng ? `/${lng}/${LINK_URLS.home}` : LINK_URLS?.home}
                      className="user-list__link"
                    >
                      Выйти
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href={`/${lng}/sign-up`}
                  className="btn btn-reset btn-reg"
                >
                  {t("registration")}
                </Link>
                <Link
                  href={`/${lng}/login`}
                  className="btn btn-reset btn-login"
                >
                  {t("login")}
                </Link>
              </>
            )}
            <div className="lang">
              <Select
                defaultValue={langClinet}
                bordered={false}
                onChange={onSelectChange}
                style={{
                  width: 62,
                }}
                popupMatchSelectWidth={false}
                options={languagesClient
                  .filter((l) => lng !== l.value)
                  .map((l, index) => {
                    return {
                      key: `${l.value}`,
                      value: `${l?.value}`,
                      label: `${l?.label}`,
                    };
                  })}
              />
            </div>
            {/*<div className="lang">*/}
            {/*  <div className="lang-current">*/}
            {/*    <span className="lang-current__text">Русская</span>*/}
            {/*    <div className="lang-current__icon">*/}
            {/*      <svg*/}
            {/*        width="24"*/}
            {/*        height="24"*/}
            {/*        viewBox="0 0 24 24"*/}
            {/*        fill="none"*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*      >*/}
            {/*        <path*/}
            {/*          d="M12.0001 14.6615C11.8796 14.6615 11.7675 14.6423 11.6636 14.6038C11.5598 14.5653 11.4611 14.4993 11.3675 14.4057L6.87325 9.91151C6.73478 9.77306 6.66395 9.59902 6.66075 9.38941C6.65753 9.17979 6.72837 9.00255 6.87325 8.85768C7.01812 8.71281 7.19375 8.64038 7.40015 8.64038C7.60655 8.64038 7.78218 8.71281 7.92705 8.85768L12.0001 12.9308L16.0732 8.85768C16.2117 8.71923 16.3857 8.6484 16.5953 8.64518C16.8049 8.64198 16.9822 8.71281 17.127 8.85768C17.2719 9.00255 17.3444 9.17819 17.3444 9.38461C17.3444 9.59101 17.2719 9.76664 17.127 9.91151L12.6328 14.4057C12.5392 14.4993 12.4405 14.5653 12.3367 14.6038C12.2328 14.6423 12.1207 14.6615 12.0001 14.6615Z"*/}
            {/*          fill="currentColor"*/}
            {/*        />*/}
            {/*      </svg>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
