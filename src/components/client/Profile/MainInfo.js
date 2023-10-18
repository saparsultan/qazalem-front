"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { App, Button, Form, Input, Select } from "antd";
import ImageUploading from "react-images-uploading";
import { useTranslation } from "@/app/i18n/client";
import UserService from "@/services/UserService";
import defaultAvatar from "@/assets/img/default.png";
import beforeUpload from "@/utils/beforeUpload";
import { Skeleton } from "antd";

const MainInfo = ({ lng }) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { data: session, status } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tMessage } = useTranslation(lng, "message");
  const queryClient = useQueryClient();
  const [avatar, setAvatar] = useState(null);
  const [avatarForm, setAvatarForm] = useState(null);

  const { data, isSuccess } = useInfiniteQuery({
    queryKey: [
      "userMain",
      session?.user?.id !== undefined,
      session?.accessToken,
      status === "authenticated",
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const sessionId =
        session && session?.user && session?.user?.id ? session?.user?.id : "";
      const { data } = await UserService.getUserMain(
        session?.user?.id,
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

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const formDataObj = {
        firstname: value?.name,
        lastname: value?.surname,
        middlename: value?.middlename,
        gender: value?.gender,
        image: avatarForm,
      };
      await UserService.updateMain(
        session?.user?.id,
        session?.accessToken,
        formDataObj,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["userMain"]);
      await notification.success({
        message: tMessage("success"),
        description: tMessage("updateProfileSuccess"),
        placement: "topRight",
      });
    },
    onError: async (error) => {
      await notification.error({
        message: tMessage("error"),
        description: tMessage("updateProfileError"),
        placement: "topRight",
      });
      console.error("Error update main info", error);
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

  // if (!session?.user) {
  //   return "sssss";
  // }

  return (
    <div className="profile-form">
      <Form layout="vertical" form={form} onFinish={onSubmitForm}>
        {!session?.user ? (
          <Skeleton />
        ) : (
          <>
            <div className="form-row">
              <div className="form-item form-item--full">
                <Form.Item
                  name="name"
                  label={`${tForm("name")}`}
                  rules={[
                    {
                      required: true,
                      message: tForm("required"),
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
                      message: tForm("rulesEmail"),
                    },
                    {
                      required: true,
                      message: tForm("required"),
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
                      {({
                        imageList,
                        onImageUpload,
                        isDragging,
                        dragProps,
                      }) => (
                        <>
                          <div
                            className="upload__image-wrapper upload__image-wrapper--profile"
                            style={
                              isDragging
                                ? { border: "1px solid red" }
                                : undefined
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
                      message: tForm("required"),
                    },
                  ]}
                >
                  <Select
                    placeholder={tForm("placeholderGender")}
                    style={{
                      width: "100%",
                    }}
                    allowClear
                    options={[
                      {
                        value: "MALE",
                        label: tForm("male"),
                      },
                      {
                        value: "FEMALE",
                        label: tForm("female"),
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
          </>
        )}
      </Form>
    </div>
  );
};

export default MainInfo;
