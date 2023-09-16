"use client";
import React, { useState } from "react";
import { Button, Form, Input } from "antd";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const StepThird = ({ form, onFinish, onBack }) => {
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="form-row">
        <div className="form-item">
          <Form.Item name="facebook" label="Facebook">
            <Input />
          </Form.Item>
          <Form.Item name="instagram" label="Instagram">
            <Input />
          </Form.Item>
          <Form.Item name="tiktok" label="TikTok">
            <Input />
          </Form.Item>
          <Form.Item name="vk" label="VK">
            <Input />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item name="twitter" label="Twitter">
            <Input />
          </Form.Item>
          <Form.Item name="youtube" label="YouTube">
            <Input />
          </Form.Item>
          <Form.Item name="discord" label="Discord">
            <Input />
          </Form.Item>
          <Form.Item name="linkedin" label="LinkedIn">
            <Input />
          </Form.Item>
        </div>
      </div>
      <div
        className="form-btns"
        style={{
          marginTop: 24,
        }}
      >
        <Button onClick={onBack}>Назад</Button>
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

export default StepThird;
