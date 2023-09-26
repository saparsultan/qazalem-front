"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button, ConfigProvider, Form, Input } from "antd";
import AuthService from "@/services/AuthService";
import { useAuthContext } from "@/providers/AuthProvider";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import theme from "@/theme/themeConfig";

const Login = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const { auth, setAuth } = useAuthContext();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: onSubmitAuth } = useMutation({
    mutationFn: async (values) => {
      const { data } = await AuthService.login(values.email, values.password);
      const accessToken = data?.access;
      const refreshToken = data?.refresh;
      setAuth(data?.user);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh", refreshToken);
    },
    onSuccess: () => {
      router.push("/profile", { scroll: false });
    },
    onError: (error) => {
      console.log("error-login", error);
      setErrorMessage("unauthorized");
    },
  });

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
                      () => ({
                        validator() {
                          if (errorMessage === "unauthorized") {
                            return Promise.reject(
                              new Error("Неверный email или пароль"),
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="Введите ваш email" />
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
                      <Input.Password placeholder="Введите ваш пароль" />
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
                    или <Link href="/sign-up">Зарегистрируйтесь</Link>
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
