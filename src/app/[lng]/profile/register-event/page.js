import RegisterEvent from "@/components/client/Profile/RegisterEvent";
const ProfileRegisterEvent = ({ params: { lng } }) => {
  return (
    <>
      <h2 className="title-h2 title-left bold profile__title">
        Регистрация на мероприятие
      </h2>
      <RegisterEvent lng={lng} />
    </>
  );
};

export default ProfileRegisterEvent;
