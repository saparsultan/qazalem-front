"use client";
import React, { useEffect } from "react";
import { Button, Form, Input, Radio } from "antd";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/userService";

const AdditionalInfo = () => {
  const [form] = Form.useForm();
  const { data } = useQuery({
    queryKey: ["userAdditional"],
    queryFn: async () => {
      const { data } = await UserService.getUserAdditional(10);
      return data;
    },
    staleTime: Infinity,
  });
  console.log({ data });

  useEffect(() => {
    form.setFieldsValue({
      relocate: data?.move_to_kazakhstan,
      ability: data?.abilities,
      instrument: data?.instrument_play,
      benefit: data?.benefit,
      volunteer: data?.volunteer,
    });
  }, [data, form]);

  return (
    <div className="profile-form">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
      >
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
