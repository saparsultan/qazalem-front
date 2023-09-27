"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import Image from "next/image";
import avatarImg from "@/assets/img/interview-1.jpg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "@/services/userService";

let userId;
if (typeof window !== "undefined") {
  userId = localStorage.getItem("userId");
}
const MainInfo = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [name, setName] = useState("");

  const { data } = useQuery({
    queryKey: ["userMain"],
    queryFn: async () => {
      const { data } = await UserService.getUserMain(userId);
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

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        firstname: value?.firstname,
        lastname: value?.surname,
        middlename: value?.middlename,
        gender: value?.gender,
      };
      const { data } = await UserService.updateMain(userId, formData);
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

  return (
    <div className="profile-form">
      <Form layout="vertical" form={form} onFinish={onSubmitForm}>
        <div className="form-row">
          <div className="form-item form-item--full">
            <Form.Item
              name="name"
              label="Имя"
              rules={[
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item name="surname" label="Фамилия">
              <Input />
            </Form.Item>
            <Form.Item name="middlename" label="Отчество">
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
                <Image src={avatarImg} alt="avatarImg" />
                <div className="profile-item__edit">Изменить фото</div>
              </div>
            </div>
            <Form.Item
              name="gender"
              label="Пол"
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
          Сохранить
        </Button>
      </Form>
    </div>
  );
};

export default MainInfo;
