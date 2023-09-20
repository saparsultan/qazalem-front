import React from "react";
import { Button, Form, Input } from "antd";

const MainInfo = (props) => {
  return (
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
        </div>
        <div className="form-item">
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
  );
};

export default MainInfo;
