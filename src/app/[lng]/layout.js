import React from "react";
import { Raleway } from "next/font/google";
import { dir } from "i18next";
import TanstackProvider from "@/providers/TanstackProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { AuthContextProvider } from "@/providers/AuthProvider";
import StyledComponentsRegistry from "@/providers/AntdProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { languages } from "@/app/i18n/settings";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import "@/app/globals.css";
import "@/scss/main.scss";

const inter = Raleway({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: "Web-сервис QazAlem",
  description:
    "Портал Qazalem-уникальный интернет-сервис, который объединяет соотечественников, проживающих за пределами Казахстана",
};

const RootLayout = async ({ children, params: { lng } }) => {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <NextAuthProvider>
          <TanstackProvider>
            <AuthContextProvider>
              <StyledComponentsRegistry>
                <ConfigProvider theme={theme}>
                  <Header lng={lng} />
                  <main>{children}</main>
                  <Footer lng={lng} />
                </ConfigProvider>
              </StyledComponentsRegistry>
            </AuthContextProvider>
          </TanstackProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
