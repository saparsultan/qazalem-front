"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { App, Button, Form, Input, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ImageUploading from "react-images-uploading";
import UserService from "@/services/userService";
import defaultAvatar from "@/assets/img/default.png";
import { useTranslation } from "@/app/i18n/client";

const MainInfo = ({ userId, lng }) => {
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tHome } = useTranslation(lng, "home");

  const { message } = App.useApp();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarForm, setAvatarForm] = useState(null);

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

  const { data } = useQuery({
    queryKey: ["userMain"],
    queryFn: async () => {
      const { data } = await UserService.getUserMain(userId);
      setAvatar(data?.image);
      return data;
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    form.setFieldsValue({
      name: data?.firstname,
      surname: data?.lastname,
      middlename: data?.middlename,
      email: data?.email,
      gender: data?.gender,
    });
  }, [data]);

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

      const { data } = await UserService.updateMain(userId, formDataObj);
      console.log("data data data", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userMain"]);
      console.log("success");
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  function runAfterImageDelete(file) {
    console.log({ file });
  }

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
                        {imageList.length ? (
                          <div className="upload__image-item">
                            <Image
                              className="upload__image-src"
                              quality={75}
                              sizes="(max-width: 768px) 100vw"
                              src={imageList[0]["data_url"]}
                              alt="Avatar"
                              width={100}
                              height={100}
                            />
                          </div>
                        ) : (
                          <div className="upload__image-item">
                            <Image
                              className="upload__image-src"
                              quality={75}
                              sizes="(max-width: 768px) 100vw"
                              src={data?.image ? data?.image : defaultAvatar}
                              alt="Avatar"
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
