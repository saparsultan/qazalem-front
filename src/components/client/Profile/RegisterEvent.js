"use client";
import React from "react";
import { Button, Form, Input, Select } from "antd";
import Image from "next/image";
import avatarImg from "@/assets/img/interview-1.jpg";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import NewsService from "@/services/NewsService";
import UserService from "@/services/userService";

const RegisterEvent = ({ lng }) => {
  const [form] = Form.useForm();

  const selectEvents = useQuery({
    queryKey: ["selectEvents"],
    queryFn: async () => {
      const { data } = await UserService.getSelectEvents(lng);
      return data;
    },
    staleTime: Infinity,
  });

  console.log({ selectEvents });

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (values) => {
      const formData = {
        events:
          values.eventType !== null &&
          values.eventType !== undefined &&
          values.eventType,
        format_event:
          values.eventFormat !== null &&
          values.eventFormat !== undefined &&
          values.eventFormat,
        passport:
          values.passport !== null &&
          values.passport !== undefined &&
          values.passport,
        reviews:
          values.comments !== null &&
          values.comments !== undefined &&
          values.comments,
        organization:
          values.organization !== null &&
          values.organization !== undefined &&
          values.organization,
        job_title:
          values.position !== null &&
          values.position !== undefined &&
          values.position,
      };
      const { data } = await UserService.registerEvents(formData);
      console.log({ data });
    },
    onSuccess: (res) => {
      console.log("success", res);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  return (
    <div className="profile-form">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        onFinish={onSubmitForm}
      >
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
                options={
                  selectEvents?.data?.length &&
                  selectEvents.data.map(({ id, title }) => {
                    return {
                      value: id,
                      label: title,
                    };
                  })
                }
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
                    value: "ONLINE",
                    label: "Онлайн",
                  },
                  {
                    value: "OFFLINE",
                    label: "Офлайн",
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
                    value: "YES",
                    label: "Да",
                  },
                  {
                    value: "NO",
                    label: "Нет",
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
