"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useAuthContext } from "@/providers/AuthProvider";
import theme from "@/theme/themeConfig";
import { LINK_URLS } from "@/utils/constants";
import AuthService from "@/services/AuthService";
import { useTranslation } from "@/app/i18n/client";
import { signIn } from "next-auth/react";

const Login = ({ props, params: { lng } }) => {
  const { t } = useTranslation(lng, "auth");
  const router = useRouter();
  const { setAuth } = useAuthContext();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");

  // const { mutate: onSubmitAuth } = useMutation({
  //   mutationFn: async (values) => {
  //     const { data } = await AuthService.login(values.email, values.password);
  //     const accessToken = data?.access;
  //     const refreshToken = data?.refresh;
  //     const userId = data?.user?.id;
  //     setAuth(data?.user);
  //     localStorage.setItem("token", accessToken);
  //     localStorage.setItem("refresh", refreshToken);
  //     localStorage.setItem("userId", userId);
  //   },
  //   onSuccess: () => {
  //     router.push(`/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`, {
  //       scroll: false,
  //     });
  //   },
  //   onError: (error) => {
  //     console.log("error-login", error);
  //     setErrorMessage("unauthorized");
  //   },
  // });

  // const onSubmitAuth = async (values) => {
  //   const res = await signIn("credentials", {
  //     username: "sultansyzdyc@gmail.com",
  //     password: "@Aa123456ved",
  //     redirect: true,
  //     callbackUrl: "/",
  //   });
  //   // router.push(props.callbackUrl ?? "http://localhost:3000");
  //
  //   console.log("res res res", res);
  //
  //   if (!res?.error) {
  //     router.push(props.callbackUrl ?? "http://localhost:3000");
  //   }
  // };

  const onSubmitAuth = async (values) => {
    signIn("credentials", {
      username: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    }).then((res) => {
      if (res?.error) {
        console.log("error message", res?.error);
        // setError('email', {message: "Something went wrong.", type: "error"})
      } else {
        router.push("/");
      }
    });
  };

  return (
    <ConfigProvider theme={theme}>
      <section className="section login__container">
        <div className="container">
          <div className="login">
            <h2 className="title title-h2 login__title">
              {t("authorization")}
            </h2>
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
                      <Link href={`/${lng}/${LINK_URLS.login}`}>
                        Забыли пароль?
                      </Link>
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
                    или{" "}
                    <Link href={`/${lng}/${LINK_URLS.signUp}`}>
                      Зарегистрируйтесь
                    </Link>
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
