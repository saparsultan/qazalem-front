"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ConfigProvider, Button, message, Steps, Form } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import theme from "@/theme/themeConfig";
import StepFirst from "@/components/signup/stepFirst";
import StepSecond from "@/components/signup/stepSecond";
import StepThird from "@/components/signup/stepThird";
import StepFourth from "@/components/signup/stepFourth";
import AuthService from "@/services/AuthService";

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
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [dataForm, setDataForm] = useState({});

  // Basic
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  // Personal
  const [birthDate, setBirthDate] = useState("");
  const [iin, setInn] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [citizenShip, setCitizenShip] = useState("");
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [course, setCourse] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [studies, setStudies] = useState("");

  console.log({ birthDate });

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

  const handleChangeAvatar = (info) => {
    if (info.file.status === "uploading") {
      setLoadingUpload(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoadingUpload(false);
        console.log({ url });
        setImageUrl(url);
      });
    }
  };

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

  const formatDateYear = dataForm?.birthDate?.$y;
  const formatDateMonth =
    dataForm?.birthDate?.$M + 1 < 10
      ? `0${dataForm?.birthDate?.$M + 1}`
      : dataForm?.birthDate?.$M + 1;
  const formatDateDay =
    dataForm?.birthDate?.$D < 10
      ? `0${dataForm?.birthDate?.$D}`
      : dataForm?.birthDate?.$D;
  const newformatDate = `${formatDateYear}-${formatDateMonth}-${formatDateDay}`;

  console.log({ dataForm });

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async () => {
      const { data } = await AuthService.registerStepFirst(
        name,
        surname,
        middlename,
        email,
        gender,
        password,
        avatar,
      );
      await AuthService.registerStepSecond(
        data?.access,
        dataForm.iin,
        dataForm.natonality,
        dataForm.scopeActivity,
        dataForm.country,
        newformatDate,
        dataForm.city,
        dataForm.phone,
        dataForm.speciality,
        dataForm.course,
        dataForm.studies,
      );
      await AuthService.registerStepThird(
        data?.access,
        dataForm.facebook,
        dataForm.instagram,
        dataForm.tiktok,
        dataForm.vk,
        dataForm.twitter,
        dataForm.youtube,
        dataForm.discord,
        dataForm.linkedin,
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
                        loadingUpload={loadingUpload}
                        imageUrl={imageUrl}
                        handleChangeAvatar={handleChangeAvatar}
                        onFinish={handleNextStep}
                        setName={setName}
                        setSurname={setSurname}
                        setMiddlename={setMiddlename}
                        setGender={setGender}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setAvatar={setAvatar}
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
