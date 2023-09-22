"use client";
import React, { useState } from "react";
import { Form, Input, message, Select, Upload, DatePicker, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import InputMask from "react-input-mask";

const StepSecond = ({
  form,
  onFinish,
  onBack,
  setBirthDate,
  setInn,
  setCountry,
  setPhone,
  setCitizenShip,
  setCity,
  setActivity,
  setCourse,
  setSpeciality,
  setStudies,
}) => {
  const configs = useQuery({
    queryKey: ["configRegister"],
    queryFn: async () => {
      const { data } = await AuthService.config();
      return data;
    },
    staleTime: Infinity,
  });

  const onChange = (date, dateString) => {
    console.log("date", date);
    console.log("dateString", dateString);
  };

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
          <Form.Item name="birthDate" label="Дата рождения">
            <DatePicker
              onChange={(date) => setBirthDate(date)}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item name="country" label="Страна проживания">
            <Select
              placeholder="Выберите страну"
              allowClear
              onChange={(name) => setCountry(name)}
              options={
                configs?.data?.country.length &&
                configs?.data?.country.map(({ id, value }) => {
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
              onChange={(name) => setCitizenShip(name)}
              allowClear
              options={
                configs?.data?.citizenship.length &&
                configs?.data?.citizenship.map(({ id, value }) => {
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
              onChange={(name) => setActivity(name)}
              options={
                configs?.data?.field_of_activity.length &&
                configs?.data?.field_of_activity.map(({ id, value }) => {
                  return {
                    value: id,
                    label: value,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item name="speciality" label="Специальность">
            <Input
              placeholder="Введите специальность"
              onChange={(e) => setSpeciality(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item
            name="iin"
            label="ИИН"
            rules={[
              {
                required: true,
                pattern: /^\d{12}$/,
                message: "Поле обязательно к заполнению",
              },
            ]}
          >
            <InputMask
              mask="999999999999"
              maskChar="_"
              onChange={(e) => setInn(e.target.value)}
            >
              {() => <Input placeholder="____________" />}
            </InputMask>
          </Form.Item>
          <Form.Item name="phone" label="Номер телефона">
            <InputMask
              mask="+7 (999) 999-99-99"
              maskChar="_"
              onChange={(e) => setPhone(e.target.value)}
            >
              {() => <Input placeholder="+7 (___) ___-__-__" />}
            </InputMask>
          </Form.Item>
          <Form.Item name="city" label="Город проживания">
            <Input onChange={(e) => setCity(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="course"
            label="Курс/класс"
            rules={[
              {
                pattern: /^\d+$/,
                message: "Поле содержит только числовое значение",
              },
            ]}
          >
            <Input
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Введите ваш курс/класс"
            />
          </Form.Item>
          <Form.Item name="studies" label="Учеба">
            <Input
              onChange={(e) => setStudies(e.target.value)}
              placeholder="Введите учебное заведение"
            />
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
