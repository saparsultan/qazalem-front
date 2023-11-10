// const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: {
  //   plugins: {
  //     add: [new AntdDayjsWebpackPlugin()],
  //   },
  // },
  images: {
    domains: ["192.168.1.235", "qazalem.ziz.kz", "youtube.com"],
    unoptimized: false,
  },
};

module.exports = nextConfig;
