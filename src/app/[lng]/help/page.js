"use client";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { Button, ConfigProvider, Form, Input, Radio, Select } from "antd";
import theme from "@/theme/themeConfig";

const HelpPage = () => {
  const [form] = Form.useForm();
  const [mode, setMode] = useState("top");
  const [valueRadio, setValueRadio] = useState(0);
  const onChange4 = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    setValueRadio(value);
  };

  const optionsConnect = [
    {
      label: "Номер телефона",
      value: 0,
    },
    {
      label: "Email",
      value: 1,
    },
  ];

  console.log({ valueRadio });

  return (
    <ConfigProvider theme={theme}>
      <section className="section under-header help__container">
        <div className="container">
          <div className="help">
            <h2 className="title title-h2 help__title">Помощь</h2>
            <div className="form-help">
              <div className="container container-small">
                <Form
                  form={form}
                  name="validateOnly"
                  layout="vertical"
                  // onFinish={onSubmitAuth}
                >
                  <Form.Item
                    name="gender"
                    label="Cвязаться с консульством"
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
                          label: "Австралия",
                        },
                        {
                          value: "FEMALE",
                          label: "Австрия",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Страна пребывания"
                    name="hostCountry"
                    rules={[
                      {
                        required: true,
                        message: "Поле обязательно к заполнению",
                      },
                    ]}
                  >
                    <Input placeholder="Введите страну пребывания" />
                  </Form.Item>
                  <Form.Item
                    label="Где вы сейчас находитесь"
                    name="yourLocation"
                    rules={[
                      {
                        required: true,
                        message: "Поле обязательно к заполнению",
                      },
                    ]}
                  >
                    <Input placeholder="Введите ваше местоположение" />
                  </Form.Item>

                  <Form.Item label="Как с вами связаться" required>
                    <Radio.Group
                      options={optionsConnect}
                      onChange={onChange4}
                      value={valueRadio}
                      optionType="button"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        alignItems: "center",
                        width: "100%",
                        textAlign: "center",
                      }}
                    />
                  </Form.Item>
                  {valueRadio === 0 ? (
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Поле обязательно к заполнению",
                        },
                      ]}
                    >
                      <InputMask mask="+7 (999) 999-99-99" maskChar="_">
                        {() => <Input placeholder="+7 (___) ___-__-__" />}
                      </InputMask>
                    </Form.Item>
                  ) : (
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Поле обязательно к заполнению",
                        },
                        {
                          type: "email",
                          message: "Введен неверный e-mail!",
                        },
                      ]}
                    >
                      <Input placeholder="Введите ваш email" />
                    </Form.Item>
                  )}
                  <Form.Item
                    label="Опишите кратко свою ситуацию"
                    name="situation"
                  >
                    <Input.TextArea placeholder="Введите ваше местоположение" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", marginBottom: "8px" }}
                    >
                      Отправить
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ConfigProvider>
  );
};

export default HelpPage;
