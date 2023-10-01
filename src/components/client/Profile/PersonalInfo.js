"use client";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import UserService from "@/services/userService";

let userId;
if (typeof window !== "undefined") {
  userId = localStorage.getItem("userId");
}
const PersonalInfo = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [date, setDate] = useState("");

  const configs = useQuery({
    queryKey: ["configRegister"],
    queryFn: async () => {
      const { data } = await AuthService.config();
      return data;
    },
  });

  const { data } = useQuery({
    queryKey: ["userPersonal"],
    queryFn: async () => {
      const { data } = await UserService.getUserPersonal(userId);
      return data;
    },
    staleTime: Infinity,
  });

  console.log({ date });
  console.log("date-local", new Date(data?.date_of_birth));

  const dateLocal = new Date(data?.date_of_birth);

  useEffect(() => {
    form.setFieldsValue({
      iin: data?.iin_p_d,
      // birthDate: dateLocal,
      country: data?.country,
      city: data?.city,
      natonality: data?.citizenship,
      phone: data?.phone_number,
      course: data?.course,
      studies: data?.profession,
    });
  }, [data, form]);

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const valueInn = value?.iin && value?.iin === "" ? null : value?.iin;

      const formData = {
        iin_p_d: valueInn,
        citizenship: value?.natonality,
        field_of_activity: value?.scopeActivity,
        country: value?.country,
        date_of_birth: value?.birthDate,
        city: value?.city,
        phone_number: value?.phone,
        profession: value?.speciality,
        course: value?.course,
        education: value?.studies,
      };
      const { data } = await UserService.updatePersonal(userId, formData);
      console.log("data data data", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userPersonal"]);
      console.log("success");
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  console.log({ data });
  console.log({ userId });

  return (
    <div className="profile-form">
      <Form layout="vertical" form={form} onFinish={onSubmitForm}>
        <div className="form-row">
          <div className="form-item">
            <Form.Item
              name="birthDate"
              label="Дата рождения"
              // valuePropName="dateString"
            >
              <DatePicker
                style={{
                  width: "100%",
                }}
                onChange={(e) => setDate(e)}
              />
            </Form.Item>
            <Form.Item name="country" label="Страна проживания">
              <Select
                placeholder="Выберите страну"
                allowClear
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
              <Input placeholder="Введите специальность" />
            </Form.Item>
          </div>
          <div className="form-item">
            <Form.Item
              name="iin"
              label="ИИН"
              // rules={[
              //   {
              //     pattern: new RegExp(/^\d{1,12}$/),
              //     message:
              //   },
              // ]}
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

export default PersonalInfo;
