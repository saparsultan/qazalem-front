import { Alert, Space, Spin } from "antd";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>
  );
}
