"use client";
import React from "react";
import { Button, ConfigProvider, Form, Input } from "antd";
import theme from "@/theme/themeConfig";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useSearchParams } from "next/navigation";

const Login = (props) => {
  const [form] = Form.useForm();

  const { mutate: onSubmitAuth } = useMutation({
    mutationFn: async (values) => {
      const { data } = await AuthService.login(values.email, values.password);
      console.log("values", data);
    },
    onSuccess: (res) => {
      console.log("success");
      // localStorage.setItem("token", res);
      // console.log("values", res);
    },
    onError: (error) => {
      console.log("error-login", error);
    },
  });

  // const onSubmitAuth = async (values) => {
  //   const res = await axios.post(`${BASE_URL}login/`, {
  //     email: values.email,
  //     password: values.password,
  //   });
  //   console.log("res-axios", res);
  // };

  return (
    <ConfigProvider theme={theme}>
      <section className="section login__container">
        <div className="container">
          <div className="login">
            <h2 className="title title-h2 login__title">Авторизация</h2>
            <div className="form-login">
              <div className="container container-small">
                <Form
                  form={form}
                  name="validateOnly"
                  layout="vertical"
                  autoComplete="off"
                  onFinish={onSubmitAuth}
                >
                  <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                      {
                        type: "email",
                        message: "Введите корректный e-mail!",
                      },
                      {
                        required: true,
                        message: "Поле обязательно к заполнению",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item
                      label="Пароль"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Поле обязательно к заполнению",
                        },
                      ]}
                      style={{ marginBottom: "0px" }}
                    >
                      <Input.Password />
                    </Form.Item>
                    <div style={{ position: "absolute", top: "0", right: "0" }}>
                      <Link href="/">Забыли пароль?</Link>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", marginBottom: "8px" }}
                    >
                      Войти
                    </Button>
                    или <Link href="/">Зарегистрируйтесь</Link>
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

export default Login;
