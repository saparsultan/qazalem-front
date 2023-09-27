"use client";
import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/userService";

const SocialInfo = () => {
  const [form] = Form.useForm();
  const { data } = useQuery({
    queryKey: ["userSocial"],
    queryFn: async () => {
      const { data } = await UserService.getUserSocial(10);
      return data;
    },
    staleTime: Infinity,
  });

  console.log({ data });

  useEffect(() => {
    form.setFieldsValue({
      facebook: data?.facebook,
      instagram: data?.instagram,
      tiktok: data?.tiktok,
      vk: data?.vk,
      twitter: data?.twitter,
      youtube: data?.youtube,
      discord: data?.discord,
      linkedin: data?.linkedin,
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
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          Далее
        </Button>
      </Form>
    </div>
  );
};

export default SocialInfo;
