import React from "react";
import { Raleway } from "next/font/google";
import { dir } from "i18next";
import StyledComponentsRegistry from "@/providers/AntdProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import { AuthContextProvider } from "@/providers/AuthProvider";
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

const RootLayout = ({ children, params: { lng } }) => {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <TanstackProvider>
          <AuthContextProvider>
            <StyledComponentsRegistry>
              <ConfigProvider theme={theme}>
                <Header lng={lng} />
                <main>{children}</main>
                <Footer />
              </ConfigProvider>
            </StyledComponentsRegistry>
          </AuthContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
};
export default RootLayout;
