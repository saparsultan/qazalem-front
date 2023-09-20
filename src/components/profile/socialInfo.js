import React from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import Image from "next/image";

const SocialInfo = (props) => {
  return (
    <Form name="validateOnly" layout="vertical" autoComplete="off">
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
  );
};

export default SocialInfo;
