import PersonalInfo from "@/components/client/Profile/PersonalInfo";

const ProfilePersonal = async ({ params: { lng } }) => {
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        Персональные данные
      </h2>
      <PersonalInfo lng={lng} />
    </>
  );
};

export default ProfilePersonal;
