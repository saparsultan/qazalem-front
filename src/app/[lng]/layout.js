import React from "react";
import { Raleway } from "next/font/google";
import { dir } from "i18next";
import StyledComponentsRegistry from "@/providers/AntdProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import { AuthContextProvider } from "@/providers/AuthProvider";
// import Header from "@/app/[lng]/components/layout/Header";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";
import "@/scss/main.scss";
import { languages } from "@/app/i18n/settings";

const inter = Raleway({ subsets: ["latin"] });

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children, params: { lng } }) => {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <TanstackProvider>
          <AuthContextProvider>
            <StyledComponentsRegistry>
              <Header lng={lng} />
              <main>{children}</main>
              <Footer />
            </StyledComponentsRegistry>
          </AuthContextProvider>
        </TanstackProvider>
      </body>
    </html>
  );
};
export default RootLayout;