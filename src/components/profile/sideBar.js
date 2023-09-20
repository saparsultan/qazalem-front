import React, { useState } from "react";
import { Button, Form, message, Radio, Upload } from "antd";
import Image from "next/image";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import imageAvatar from "@/assets/img/interview-1.jpg";

const beforeUpload = async (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    await message.error("Вы можете загрузить только файл JPG/PNG!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    await message.error("Изображение должно быть меньше 2 МБ!");
  }
  return isJpgOrPng && isLt2M;
};

const SideBar = (props) => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState(imageAvatar);
  const [value, setValue] = useState("MALE");

  const uploadButton = (
    <div>
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Загрузить
      </div>
    </div>
  );

  const handleChangeAvatar = (info) => {
    if (info.file.status === "uploading") {
      setLoadingUpload(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoadingUpload(false);
        console.log({ url });
        setImageUrl(url);
      });
    }
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Form layout="vertical" className="profile-form form-sidebar">
      <Form.Item>
        <Upload
          action="https://www.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          name="avatar"
          listType="picture-card"
          className="avatar-uploader form-avatar"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChangeAvatar}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageUrl ? <Image src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
            message: "Поле обязательно к заполнению",
          },
        ]}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Radio value="MALE">Мужчина</Radio>
          <Radio value="FEMALE">Женщина</Radio>
        </Radio.Group>
      </Form.Item>
      <Button
        type="primary"
        style={{
          marginLeft: "auto",
          width: "100%",
        }}
        htmlType="submit"
      >
        Обновить
      </Button>
    </Form>
  );
};

export default SideBar;
