import Image from "next/image";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

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

const StepFirst = ({
  form,
  loadingUpload,
  imageUrl,
  handleChangeAvatar,
  onFinish,
  setName,
  setSurname,
  setMiddlename,
  setGender,
  setEmail,
  setPassword,
  emailCheck,
}) => {
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

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="form-row">
        <div className="form-item form-item--full">
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              {
                required: true,
                message: "Поле обязательно к заполнению",
              },
            ]}
          >
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
            />
          </Form.Item>
          <Form.Item name="surname" label="Фамилия">
            <Input
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Введите фамилию"
            />
          </Form.Item>
          <Form.Item name="middlename" label="Отчество">
            <Input
              onChange={(e) => setMiddlename(e.target.value)}
              placeholder="Введите отчество"
            />
          </Form.Item>
        </div>
        <div className="form-auto">
          <Form.Item label="Фотография">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              name="avatar"
              listType="picture-card"
              className="avatar-uploader form-avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChangeAvatar}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "230px",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </div>
      </div>
      <Form.Item
        name="gender"
        label="Пол"
        rules={[
          {
            required: true,
            message: "Поле обязательно к заполнению",
          },
        ]}
      >
        <Select
          placeholder="Выберите пол"
          style={{
            width: "100%",
          }}
          allowClear
          options={[
            {
              value: "MALE",
              label: "Мужской",
            },
            {
              value: "FEMALE",
              label: "Женский",
            },
          ]}
          onChange={(name) => setGender(name)}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Введен неверный e-mail!",
          },
          {
            required: true,
            message: "Поле обязательно к заполнению",
          },
          () => ({
            validator() {
              if (emailCheck === false) {
                return Promise.resolve();
              } else {
                return Promise.reject(new Error("Email уже существует"));
              }
            },
          }),
        ]}
      >
        <Input
          onChange={(e) => setEmail(e)}
          autoComplete="off"
          placeholder="Введите email"
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Поле обязательно к заполнению",
          },
        ]}
      >
        <Input.Password
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          placeholder="Введите пароль"
        />
      </Form.Item>

      <Form.Item
        label="Повторить пароль"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, подтвердите свой пароль",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Пароль, который вы ввели, не соответствует"),
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Подтвердите пароль" />
      </Form.Item>
      <div
        className="form-btns"
        style={{
          marginTop: 24,
        }}
      >
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

export default StepFirst;
