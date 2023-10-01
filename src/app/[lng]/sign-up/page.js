"use client";
import React, { useState, useCallback } from "react";
import { ConfigProvider, Modal, Steps, Form, App } from "antd";
import { useMutation } from "@tanstack/react-query";
import theme from "@/theme/themeConfig";
import AuthService from "@/services/AuthService";
import StepFirst from "@/components/signup/stepFirst";
import StepSecond from "@/components/signup/stepSecond";
import StepThird from "@/components/signup/stepThird";
import StepFourth from "@/components/signup/stepFourth";

const steps = [
  {
    title: "Основная информация",
    content: "basic",
  },
  {
    title: "Персональные данные",
    content: "personal",
  },
  {
    title: "Социальные сети",
    content: "social",
  },
  {
    title: "Дополнительная информация",
    content: "additional",
  },
];

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const SignUp = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [dataForm, setDataForm] = useState({});
  const [emailCheck, setEmailCheck] = useState(false);

  // Basic
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarForm, setAvatarForm] = useState(null);

  // Personal
  const [birthDate, setBirthDate] = useState(null);
  const [iin, setInn] = useState("");
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState("");
  const [citizenShip, setCitizenShip] = useState("");
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState();
  const [course, setCourse] = useState();
  const [speciality, setSpeciality] = useState("");
  const [studies, setStudies] = useState("");

  // Social
  const [facebook, setFacebook] = useState("");
  const [twit, setTwit] = useState("");
  const [insta, setInsta] = useState("");
  const [youTube, setYouTube] = useState("");
  const [tikTok, setTikTok] = useState("");
  const [discord, setDiscord] = useState("");
  const [vk, setVk] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  // Additional
  const [relocate, setRelocate] = useState("");
  const [ability, setAbility] = useState("");
  const [instrument, setInstrument] = useState("");
  const [benefit, setBenefit] = useState("");
  const [volunteer, setVolunteer] = useState("");

  const beforeUpload = async (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      await message.error("Вы можете загрузить только файл JPG/PNG!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      await message.error("Изображение должно быть меньше 2 МБ!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChangeEmail = async (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const value = e.target.value;
    setEmail(value);
    if (emailRegex.test(value)) {
      try {
        await AuthService.emailExists(value);
        setEmailCheck(true);
      } catch (e) {
        if (e.response.status === 404) {
          setEmailCheck(false);
        }
      }
    }
  };

  const onChangeAvatar = (imageList) => {
    if (imageList && imageList.length) {
      beforeUpload(imageList[0]?.file).then((res) => {
        if (res === true) {
          setAvatar(imageList);
          const formData = new FormData();
          formData.append("image", imageList[0].file);
          setAvatarForm(formData.get("image"));
        }
      });
    }
  };

  console.log({ avatar });

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handleNextStep = useCallback(
    (values) => {
      setDataForm((prev) => {
        return { ...prev, ...values };
      });
      setCurrent(current + 1);
    },
    [current],
  );

  const handlePrevStep = useCallback(
    (values) => {
      setDataForm((prev) => {
        return { ...prev, ...values };
      });
      setCurrent(current - 1);
    },
    [current],
  );

  const formatDateYear = birthDate?.$y;
  const formatDateMonth =
    birthDate?.$M + 1 < 10 ? `0${birthDate?.$M + 1}` : birthDate?.$M + 1;
  const formatDateDay =
    birthDate?.$D < 10 ? `0${birthDate?.$D}` : birthDate?.$D;
  const newformatDate =
    !birthDate || !birthDate === null
      ? null
      : `${formatDateYear}-${formatDateDay}-${formatDateMonth}`;

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async () => {
      const { data } = await AuthService.registerStepFirst(
        name,
        surname,
        middlename,
        email,
        gender,
        password,
        avatarForm,
      );
      await AuthService.registerStepSecond(
        data?.access,
        iin,
        citizenShip,
        activity,
        country,
        newformatDate,
        city,
        phone,
        speciality,
        course,
        studies,
      );
      await AuthService.registerStepThird(
        data?.access,
        facebook,
        insta,
        tikTok,
        vk,
        twit,
        youTube,
        discord,
        linkedIn,
      );
      await AuthService.registerStepFourth(
        data?.access,
        relocate,
        instrument,
        volunteer,
        ability,
        benefit,
      );
    },
    onSuccess: (res) => {
      console.log("success", res);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  return (
    <ConfigProvider theme={theme}>
      <section className="section signup__container">
        <div className="container">
          <div className="signup">
            <h2 className="title title-h2 signup__title">Регистрация</h2>
            <div className="form-signup">
              <>
                <Steps current={current} items={items} className="form-steps" />
                <div className="signup-content">
                  <div className="container container-form">
                    {steps[current].content === "basic" && (
                      <StepFirst
                        form={form}
                        onChangeAvatar={onChangeAvatar}
                        onFinish={handleNextStep}
                        setName={setName}
                        setSurname={setSurname}
                        setMiddlename={setMiddlename}
                        setGender={setGender}
                        setEmail={handleChangeEmail}
                        setPassword={setPassword}
                        avatar={avatar}
                        emailCheck={emailCheck}
                      />
                    )}
                    {steps[current].content === "personal" && (
                      <StepSecond
                        form={form}
                        onFinish={handleNextStep}
                        onBack={handlePrevStep}
                        setBirthDate={setBirthDate}
                        setInn={setInn}
                        setCountry={setCountry}
                        setPhone={setPhone}
                        setCitizenShip={setCitizenShip}
                        setCity={setCity}
                        setActivity={setActivity}
                        setCourse={setCourse}
                        setSpeciality={setSpeciality}
                        setStudies={setStudies}
                      />
                    )}
                    {steps[current].content === "social" && (
                      <StepThird
                        form={form}
                        onFinish={handleNextStep}
                        onBack={handlePrevStep}
                        setFacebook={setFacebook}
                        setTwit={setTwit}
                        setInsta={setInsta}
                        setYouTube={setYouTube}
                        setTikTok={setTikTok}
                        setDiscord={setDiscord}
                        setVk={setVk}
                        setLinkedIn={setLinkedIn}
                      />
                    )}
                    {steps[current].content === "additional" && (
                      <StepFourth
                        form={form}
                        onFinish={onSubmitForm}
                        onBack={handlePrevStep}
                        setRelocate={setRelocate}
                        setAbility={setAbility}
                        setInstrument={setInstrument}
                        setBenefit={setBenefit}
                        setVolunteer={setVolunteer}
                      />
                    )}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default SignUp;
