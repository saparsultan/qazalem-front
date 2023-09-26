"use client";
import React from "react";
import { Button, Form, Input, Radio } from "antd";

const AdditionalInfo = () => {
  return (
    <div className="profile-form">
      <Form name="validateOnly" layout="vertical" autoComplete="off">
        <Form.Item name="relocate" label="Хотите ли вы переехать в Казахстан?">
          <Input />
        </Form.Item>
        <Form.Item name="ability" label="Какие у вас есть способности?">
          <Input />
        </Form.Item>
        <Form.Item
          name="instrument"
          label="На каком инструменте вы умеете играть?"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="benefit"
          label="Какую пользу вы можете принести на мероприятиях?"
        >
          <Input />
        </Form.Item>
        <Form.Item name="volunteer" label="Вы волонтер?">
          <Radio.Group>
            <Radio value={true}>Да</Radio>
            <Radio value={false}>Нет</Radio>
          </Radio.Group>
        </Form.Item>
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

export default AdditionalInfo;
