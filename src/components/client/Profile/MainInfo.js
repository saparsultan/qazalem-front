"use client";
import React from "react";
import { Button, Form, Input, Select } from "antd";
import Image from "next/image";
import avatarImg from "@/assets/img/interview-1.jpg";

const MainInfo = (props) => {
  return (
    <div className="profile-form">
      <Form layout="vertical">
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
