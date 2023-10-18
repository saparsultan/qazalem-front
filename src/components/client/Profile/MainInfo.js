"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { App, Button, Form, Input, Select } from "antd";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ImageUploading from "react-images-uploading";
import UserService from "@/services/UserService";
import defaultAvatar from "@/assets/img/default.png";
import { useTranslation } from "@/app/i18n/client";
import beforeUpload from "@/utils/beforeUpload";

const MainInfo = ({ lng }) => {
  const { data: session, status } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tHome } = useTranslation(lng, "home");
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const [imageUrl, setImageUrl] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarForm, setAvatarForm] = useState(null);

  const { data, isSuccess } = useInfiniteQuery({
    queryKey: ["userMain", session?.user?.id, session?.accessToken],
    queryFn: async () => {
      const sessionId =
        session && session?.user && session?.user?.id ? session?.user?.id : "";
      const { data } = await UserService.getUserMain(
        sessionId,
        session?.accessToken,
      );
      return data;
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      name: session?.user && data?.pages[0]?.firstname,
      surname: session?.user && data?.pages[0]?.lastname,
      middlename: session?.user && data?.pages[0]?.middlename,
      email: session?.user && data?.pages[0]?.email,
      gender: session?.user && data?.pages[0]?.gender,
    });
  }, [session, data, isSuccess, form]);

  // const beforeUpload = async (file) => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     await message.error("Вы можете загрузить только файл JPG/PNG!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     await message.error("Изображение должно быть меньше 2 МБ!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  function getImageFileObject(imageFile) {
    const formData = new FormData();
    formData.append("image", imageUrl);
    setImageUrl(imageFile.file);
    console.log("{ imageFile }", formData);
  }

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const formDataObj = {
        firstname: value?.name,
        lastname: value?.surname,
        middlename: value?.middlename,
        gender: value?.gender,
        image: avatarForm,
      };
      const sessionToken =
        session && session?.accessToken ? session?.accessToken : "";
      await UserService.updateMain(
        session?.user?.id,
        sessionToken,
        formDataObj,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["userMain"]);
      console.log("success");
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const onChangeAvatar = (imageList) => {
    if (imageList && imageList.length) {
      beforeUpload(message, imageList[0]?.file).then((res) => {
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

  if (!session?.user) {
    return "sssss";
  }

  return (
    <div className="profile-form">
      <Form layout="vertical" form={form} onFinish={onSubmitForm}>
        <div className="form-row">
          <div className="form-item form-item--full">
            <Form.Item
              name="name"
              label={`${tForm("name")}`}
              rules={[
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="surname" label={`${tForm("lastname")}`}>
              <Input />
            </Form.Item>
            <Form.Item name="middlename" label={`${tForm("middlename")}`}>
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "Введен неверный e-mail!",
                },
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Input disabled={true} style={{ color: "#000" }} />
            </Form.Item>
          </div>
          <div className="form-item">
            <div className="profile-item">
              <div className="profile-item__img">
                <ImageUploading
                  value={avatar}
                  onChange={onChangeAvatar}
                  dataURLKey="data_url"
                >
                  {({ imageList, onImageUpload, isDragging, dragProps }) => (
                    <>
                      <div
                        className="upload__image-wrapper upload__image-wrapper--profile"
                        style={
                          isDragging ? { border: "1px solid red" } : undefined
                        }
                      >
                        {imageList && imageList.length > 0 ? (
                          <div className="upload__image-item ss">
                            <Image
                              className="upload__image-src"
                              quality={75}
                              sizes="(max-width: 768px) 100vw"
                              src={imageList[0] && imageList[0]["data_url"]}
                              alt="Local Avatar"
                              width={100}
                              height={100}
                            />
                          </div>
                        ) : (
                          <div className="upload__image-item gg">
                            <Image
                              className="upload__image-src"
                              quality={75}
                              sizes="(max-width: 768px) 100vw"
                              src={
                                data?.pages[0]?.image
                                  ? data?.pages[0]?.image
                                  : defaultAvatar
                              }
                              alt="User Avatar"
                              width={100}
                              height={100}
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className="profile-item__edit"
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        {`${tForm("editPhoto")}`}
                      </div>
                    </>
                  )}
                </ImageUploading>
              </div>
            </div>
            <Form.Item
              name="gender"
              label={`${tForm("gender")}`}
              rules={[
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Select
                placeholder="Выберите пол"
                style={{
                  width: "100%",
                }}
                allowClear
                options={[
                  {
                    value: "MALE",
                    label: "Мужской",
                  },
                  {
                    value: "FEMALE",
                    label: "Женский",
                  },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          {tForm("save")}
        </Button>
      </Form>
    </div>
  );
};

export default MainInfo;
