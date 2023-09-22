import { Button, Form, Input } from "antd";
const StepThird = ({
  form,
  onFinish,
  onBack,
  setFacebook,
  setTwit,
  setInsta,
  setYouTube,
  setTikTok,
  setDiscord,
  setVk,
  setLinkedIn,
}) => {
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <div className="form-row">
        <div className="form-item">
          <Form.Item name="facebook" label="Facebook">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setFacebook(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="instagram" label="Instagram">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setInsta(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="tiktok" label="TikTok">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setTikTok(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="vk" label="VK">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setVk(e.target.value)}
            />
          </Form.Item>
        </div>
        <div className="form-item">
          <Form.Item name="twitter" label="Twitter">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setTwit(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="youtube" label="YouTube">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setYouTube(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="discord" label="Discord">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setDiscord(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="linkedin" label="LinkedIn">
            <Input
              placeholder="Укажите ссылку"
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </Form.Item>
        </div>
      </div>
      <div
        className="form-btns"
        style={{
          marginTop: 24,
        }}
      >
        <Button onClick={onBack}>Назад</Button>
        <Button
          type="primary"
          style={{
            marginLeft: "auto",
          }}
          htmlType="submit"
        >
          Далее
        </Button>
      </div>
    </Form>
  );
};

export default StepThird;
