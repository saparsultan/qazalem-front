import { App } from "antd";

export default function ProfileMainLayout({ children, params: { lng } }) {
  return <App>{children}</App>;
}
