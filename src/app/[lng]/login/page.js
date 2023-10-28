"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, ConfigProvider, Form, Input } from "antd";
import { useTranslation } from "@/app/i18n/client";
import theme from "@/theme/themeConfig";
import { LINK_URLS } from "@/utils/constants";

const Login = ({ params: { lng } }) => {
  const { t } = useTranslation(lng, "auth");
  const { t: tForm } = useTranslation(lng, "form");
  const { t: tlayout } = useTranslation(lng, "layout");
  const router = useRouter();
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitAuth = async (values) => {
    signIn("credentials", {
      username: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    }).then((res) => {
      if (res?.error) {
        console.log("error message", res?.error);
      } else {
        router.push(`/${lng}/${LINK_URLS.profile}/${LINK_URLS.main}`);
      }
    });
  };

  // setError('email', {message: "Something went wrong.", type: "error"})

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
                        message: tForm("rulesEmail"),
                      },
                      {
                        required: true,
                        message: tForm("requiredField"),
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
                    <Input placeholder={tForm("placeholderEmail")} />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item
                      label={tForm("password")}
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: tForm("requiredField"),
                        },
                      ]}
                      style={{ marginBottom: "0px" }}
                    >
                      <Input.Password
                        placeholder={tForm("placeholderEnterPassword")}
                      />
                    </Form.Item>
                    <div style={{ position: "absolute", top: "0", right: "0" }}>
                      <Link href={`/${lng}/${LINK_URLS.login}`}>
                        {tForm("forgotPassword")}
                      </Link>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", marginBottom: "8px" }}
                    >
                      {tlayout("login")}
                    </Button>
                    {tForm("or")}&nbsp;
                    <Link href={`/${lng}/${LINK_URLS.signUp}`}>
                      {tForm("register")}
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
