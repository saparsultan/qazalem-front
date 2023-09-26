"use client";
import React from "react";
import { Button, Form, Input, Select } from "antd";
import Image from "next/image";
import avatarImg from "@/assets/img/interview-1.jpg";

const RegisterEvent = (props) => {
  return (
    <div className="profile-form">
      <Form layout="vertical">
        <div className="form-row">
          <div className="form-item form-item--full">
            <Form.Item
              name="eventType"
              label="В каком мероприятии вы хотите принять участие?"
              rules={[
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Select
                placeholder="Выберите мероприятие"
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
              name="eventFormat"
              label="Формат мероприятия"
              rules={[{}]}
            >
              <Select
                placeholder="Выберите формат"
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
            <Form.Item name="comments" label="Отзывы и предложения">
              <Input placeholder="Введите отзыв и предложение" />
            </Form.Item>
          </div>
          <div className="form-item">
            <Form.Item
              name="organization"
              label="Организация"
              rules={[
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Input placeholder="Введите организацию" />
            </Form.Item>
            <Form.Item
              name="position"
              label="Должность"
              rules={[
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Input placeholder="Введите должность" />
            </Form.Item>
            <Form.Item
              name="passport"
              label="Есть ли у вас паспорт готовый для выезда за границу?"
              rules={[
                {
                  required: true,
                  message: "Поле обязательно к заполнению",
                },
              ]}
            >
              <Select
                placeholder="Выберите вариант"
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
          Отправить заявку
        </Button>
      </Form>
    </div>
  );
};

export default RegisterEvent;
