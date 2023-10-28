"use client";
import { useSession } from "next-auth/react";
import { Button, Form, Input, Skeleton } from "antd";
import { useTranslation } from "@/app/i18n/client";

const ChangePassword = ({ lng }) => {
  const { data: session } = useSession();
  const { t: tForm } = useTranslation(lng, "form");
  return (
    <div className="profile-form">
      <Form name="validateOnly" layout="vertical" autoComplete="off">
        {!session?.user ? (
          <Skeleton
            paragraph={{
              rows: 8,
            }}
          />
        ) : (
          <>
            <Form.Item
              label={tForm("labelCurrentPassword")}
              name="changePassword"
              rules={[
                {
                  required: true,
                  message: tForm("requiredField"),
                },
              ]}
            >
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                placeholder={tForm("placeholderEnterPassword")}
              />
            </Form.Item>
            <Form.Item
              label={tForm("labelNewPassword")}
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: tForm("requiredField"),
                },
              ]}
            >
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                placeholder={tForm("placeholderEnterPassword")}
              />
            </Form.Item>

            <Form.Item
              label={tForm("labelNewConfirmPassword")}
              name="confirm"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: tForm("rulesEnterConfirmPassword"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(tForm("passwordDontMatch")),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder={tForm("placeholderEnterConfirmPassword")}
              />
            </Form.Item>
            <Button
              type="primary"
              disabled
              style={{
                marginLeft: "auto",
              }}
              htmlType="submit"
            >
              {tForm("change")}
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default ChangePassword;
