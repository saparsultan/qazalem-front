"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINK_URLS } from "@/utils/constants";
import imageAvatar from "@/assets/img/interview-1.jpg";

const SideBar = ({ lng }) => {
  const pathname = usePathname();
  const profileMain = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`;
  const profilePersonal = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.personal}`;
  const profileSocial = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.social}`;
  const profileAdditional = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.additional}`;
  const profileChangePassword = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.changePassword}`;
  const profileRegisterEvent = `/${lng}/${LINK_URLS.profile}/${LINK_URLS.registerEvent}`;

  const activeLink = "profile-sidebar-list__link active";
  const defaultLink = "profile-sidebar-list__link";

  return (
    <>
      <div className="profile-sidebar__header profile-sidebar-header">
        <div className="profile-sidebar-header__preview">
          <div className="profile-sidebar-header__avatar">
            <Image src={imageAvatar} alt="avatar" />
          </div>
          <div className="profile-sidebar-header__fio">
            Арманов Максат Канатович
          </div>
        </div>
      </div>
      <div className="profile-sidebar__list">
        <ul className="list-reset profile-sidebar-list">
          <li className="profile-sidebar-list__item">
            <Link
              href={profileMain}
              className={pathname === profileMain ? activeLink : defaultLink}
            >
              <span>Основная информация</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              href={profilePersonal}
              className={
                pathname === profilePersonal ? activeLink : defaultLink
              }
            >
              <span>Персональные данные</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              href={profileSocial}
              className={pathname === profileSocial ? activeLink : defaultLink}
            >
              <span>Социальные сети</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              href={profileAdditional}
              className={
                pathname === profileAdditional ? activeLink : defaultLink
              }
            >
              <span>Дополнительная информация</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              href={profileChangePassword}
              className={
                pathname === profileChangePassword ? activeLink : defaultLink
              }
            >
              <span>Изменить пароль</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
          <li className="profile-sidebar-list__item">
            <Link
              href={profileRegisterEvent}
              className={
                pathname === profileRegisterEvent ? activeLink : defaultLink
              }
            >
              <span>Зарегистрироваться на мероприятие</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4508 12.0004L7.10078 4.65038C6.85078 4.40038 6.72995 4.10871 6.73828 3.77538C6.74661 3.44204 6.87578 3.15038 7.12578 2.90038C7.37578 2.65038 7.66745 2.52538 8.00078 2.52538C8.33411 2.52538 8.62578 2.65038 8.87578 2.90038L16.5758 10.5754C16.7758 10.7754 16.9258 11.0004 17.0258 11.2504C17.1258 11.5004 17.1758 11.7504 17.1758 12.0004C17.1758 12.2504 17.1258 12.5004 17.0258 12.7504C16.9258 13.0004 16.7758 13.2254 16.5758 13.4254L8.87578 21.1254C8.62578 21.3754 8.32995 21.4962 7.98828 21.4879C7.64661 21.4795 7.35078 21.3504 7.10078 21.1004C6.85078 20.8504 6.72578 20.5587 6.72578 20.2254C6.72578 19.892 6.85078 19.6004 7.10078 19.3504L14.4508 12.0004Z"
                  fill="#1C1B1F"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
