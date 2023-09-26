import React from "react";
import SideBar from "@/components/client/Profile/SideBar";
import NavLinks from "@/components/client/Profile/NavLinks";

const ProfileLayout = ({ children, params: { lng } }) => {
  return (
    <section className="section profile__container">
      <div className="profile-menu__container">
        <div className="container">
          <NavLinks lng={lng} />
        </div>
      </div>
      <div className="profile-content__container">
        <div className="container">
          <div className="profile">
            <div className="profile-sidebar">
              <SideBar lng={lng} />
            </div>
            <div className="profile-content">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProfileLayout;
