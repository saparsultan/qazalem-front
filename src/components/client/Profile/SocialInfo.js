"use client";
import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserService from "@/services/UserService";
import { useSession } from "next-auth/react";

let userId;
if (typeof window !== "undefined") {
  userId = localStorage.getItem("userId");
}

const SocialInfo = () => {
  // const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { data } = useQuery({
    queryKey: ["userSocial"],
    queryFn: async () => {
      const { data } = await UserService.getUserSocial(userId);
      return data;
    },
    // staleTime: Infinity,
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

  const { mutate: onSubmitForm } = useMutation({
    mutationFn: async (value) => {
      const formData = {
        facebook: value?.facebook,
        instagram: value?.instagram,
        tiktok: value?.tiktok,
        vk: value?.vk,
        twitter: value?.twitter,
        youtube: value?.youtube,
        discord: value?.discord,
        linkedin: value?.linkedin,
      };
      const { data } = await UserService.updateSocial(userId, formData);
      console.log("data data data", data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["userSocial"]);
      console.log("success");
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  return (
    <div className="profile-form">
      <Form
        form={form}
        onFinish={onSubmitForm}
        name="validateOnly"
        layout="vertical"
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
