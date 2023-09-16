"use client";
import React, { useState } from "react";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";

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

const StepFirst = ({
  form,
  loadingUpload,
  imageUrl,
  handleChangeAvatar,
  onFinish,
}) => {
  const uploadButton = (
    <div>
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Загрузить
      </div>
    </div>
  );

  const { data } = useQuery({
    queryKey: ["emailExists"],
    queryFn: async () => {
      const res = await AuthService.emailExists("user@example.com");
      console.log({ res });
      return res.data;
    },
  });

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
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
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Фамилия">
            <Input />
          </Form.Item>
          <Form.Item name="middlename" label="Отчество">
            <Input />
          </Form.Item>
        </div>
        <div className="form-auto">
          <Form.Item label="Фотография">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              name="avatar"
              listType="picture-card"
              className="avatar-uploader form-avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeAvatar}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "230px",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
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
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Поле обязательно к заполнению",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Повторить пароль"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите свой пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Новый пароль, который вы ввели, не соответствует!"),
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <div
        className="form-btns"
        style={{
          marginTop: 24,
        }}
      >
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          Далее
        </Button>
      </div>
    </Form>
  );
};

export default StepFirst;
