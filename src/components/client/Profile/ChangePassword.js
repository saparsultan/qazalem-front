"use client";
import React from "react";
import { Button, Form, Input } from "antd";

const ChangePassword = () => {
  return (
    <div className="profile-form">
      <Form name="validateOnly" layout="vertical" autoComplete="off">
        <Form.Item
          label="Текущий пароль"
          name="changePassword"
          rules={[
            {
              required: true,
              message: "Поле обязательно к заполнению",
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
          label="Новый пароль"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Поле обязательно к заполнению",
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
          label="Повторить новый пароль"
          name="confirm"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Пожалуйста, подтвердите свой пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
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
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          Изменить
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassword;
