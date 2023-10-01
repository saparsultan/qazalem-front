"use client";
import Image from "next/image";
import { Button, Form, Input, Select } from "antd";
import ImageUploading from "react-images-uploading";
import UploadImageIcon from "@/components/UploadImageIcon";
import { useState } from "react";

const StepFirst = ({
  form,
  onChangeAvatar,
  onFinish,
  setName,
  setSurname,
  setMiddlename,
  setGender,
  setEmail,
  setPassword,
  emailCheck,
  avatar,
}) => {
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
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
            />
          </Form.Item>
          <Form.Item name="surname" label="Фамилия">
            <Input
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Введите фамилию"
            />
          </Form.Item>
          <Form.Item name="middlename" label="Отчество">
            <Input
              onChange={(e) => setMiddlename(e.target.value)}
              placeholder="Введите отчество"
            />
          </Form.Item>
        </div>
        <div className="form-auto">
          <Form.Item label="Фотография">
            <ImageUploading
              value={avatar}
              onChange={onChangeAvatar}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, isDragging, dragProps }) => (
                <div
                  className="upload__image-wrapper"
                  style={isDragging ? { border: "1px solid red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  {imageList.length ? (
                    <div className="upload__image-item">
                      <Image
                        className="upload__image-src"
                        src={imageList[0]["data_url"]}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <UploadImageIcon />
                  )}
                </div>
              )}
            </ImageUploading>
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
          onChange={(name) => setGender(name)}
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
          () => ({
            validator() {
              if (emailCheck === false) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error("Email уже существует"));
              }
            },
          }),
        ]}
      >
        <Input
          onChange={(e) => setEmail(e)}
          autoComplete="off"
          placeholder="Введите email"
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Поле обязательно к заполнению",
          },
          {
            pattern:
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
            message:
              "Пароль не менее 8 символов, включающий хотя бы одну цифру, заглавную и строчную букву",
          },
        ]}
      >
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          placeholder="Введите пароль"
        />
      </Form.Item>

      <Form.Item
        label="Повторить пароль"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите свой пароль",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Пароль, который вы ввели, не соответствует"),
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Подтвердите пароль" />
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
