import React from "react";
import { Raleway } from "next/font/google";
import { dir } from "i18next";
import { ConfigProvider } from "antd";
import { useTranslation } from "@/app/i18n";
import TanstackProvider from "@/providers/TanstackProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { AuthContextProvider } from "@/providers/AuthProvider";
import StyledComponentsRegistry from "@/providers/AntdProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { languages } from "@/app/i18n/settings";
import theme from "@/theme/themeConfig";
import "@/app/globals.css";
import "@/scss/main.scss";
import ruRU from "antd/es/locale/ru_RU";

const inter = Raleway({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}
export async function generateMetadata({ params: { lng } }) {
  async function GenerateMetadata() {
    const { t } = await useTranslation(lng, "default");
    return {
      title: t("homeMetaTitle"),
      description: t("homeMetaDesc"),
    };
  }
  return GenerateMetadata();
}

const RootLayout = async ({ children, params: { lng } }) => {
  console.log({ inter });
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <NextAuthProvider>
          <TanstackProvider>
            <Header lng={lng} />
            <AuthContextProvider>
              <StyledComponentsRegistry>
                <ConfigProvider theme={theme} locale={ruRU}>
                  <main>{children}</main>
                </ConfigProvider>
              </StyledComponentsRegistry>
            </AuthContextProvider>
            <Footer lng={lng} />
          </TanstackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
