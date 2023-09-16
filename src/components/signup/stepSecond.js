"use client";
import React, { useState } from "react";
import { Form, Input, message, Select, Upload, DatePicker, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";

const onChange = (date, dateString) => {
  console.log("date", date);
  console.log("dateString", dateString);
};

const StepSecond = ({ form, onFinish, onBack }) => {
  const [country, setCountry] = useState([]);
  const [citizenship, setCitizenship] = useState([]);
  const [fieldOfActivity, setFieldOfActivity] = useState([]);

  const configs = useQuery({
    queryKey: ["configRegister"],
    queryFn: async () => {
      const { data } = await AuthService.config();
      setCountry(data.country);
      setCitizenship(data.citizenship);
      setFieldOfActivity(data.field_of_activity);
      console.log({ data });
      return data;
    },
    staleTime: Infinity,
  });

  console.log({ configs });

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
          <Form.Item
            name="birthDate"
            label="Дата рождения"
            valuePropName="dateString"
          >
            <DatePicker
              onChange={onChange}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item name="country" label="Страна проживания">
            <Select
              placeholder="Выберите страну"
              allowClear
              options={
                country.length &&
                country.map(({ id, value }) => {
                  return {
                    value: id,
                    label: value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            name="natonality"
            label="Гражданство"
            rules={[
              {
                required: true,
                message: "Поле обязательно для выбора",
              },
            ]}
          >
            <Select
              placeholder="Выберите вид гражданства"
              style={{
                width: "100%",
              }}
              allowClear
              options={
                citizenship.length &&
                citizenship.map(({ id, value }) => {
                  return {
                    value: id,
                    label: value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item name="scopeActivity" label="Область деятельности">
            <Select
              placeholder="Выберите область"
              style={{
                width: "100%",
              }}
              allowClear
              options={
                fieldOfActivity.length &&
                fieldOfActivity.map(({ id, value }) => {
                  return {
                    value: id,
                    label: value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item name="speciality" label="Специальность">
            <Input placeholder="Введите специальность" />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item
            name="iin"
            label="ИИН"
            rules={[
              {
                pattern: new RegExp(/^\d{1,12}$/),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Номер телефона">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="Город проживания">
            <Input />
          </Form.Item>
          <Form.Item name="course" label="Курс/класс">
            <Input />
          </Form.Item>
          <Form.Item name="studies" label="Учеба">
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

export default StepSecond;
