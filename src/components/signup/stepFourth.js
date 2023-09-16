import React, { useEffect, useState } from "react";
import { Form, Input, Radio, Checkbox, Button } from "antd";

const StepFourth = ({
  form,
  onFinish,
  onBack,
  setRelocate,
  setAbility,
  setInstrument,
  setBenefit,
  setVolunteer,
}) => {
  const valuesForm = Form.useWatch([], form);
  const personalValue = valuesForm?.personal;
  const [submittable, setSubmittable] = useState(false);

  useEffect(() => {
    personalValue === true ? setSubmittable(true) : setSubmittable(false);
  }, [personalValue]);
  const onChangePersonal = (e) => {
    setSubmittable(e.target.checked);
  };

  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item name="relocate" label="Хотите ли вы переехать в Казахстан?">
        <Input onChange={(e) => setRelocate(e.target.value)} />
      </Form.Item>
      <Form.Item name="ability" label="Какие у вас есть способности?">
        <Input onChange={(e) => setAbility(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="instrument"
        label="На каком инструменте вы умеете играть?"
      >
        <Input onChange={(e) => setInstrument(e.target.value)} />
      </Form.Item>
      <Form.Item
        name="benefit"
        label="Какую пользу вы можете принести на мероприятиях?"
      >
        <Input onChange={(e) => setBenefit(e.target.value)} />
      </Form.Item>
      <Form.Item name="volunteer" label="Вы волонтер?">
        <Radio.Group onChange={(e) => setVolunteer(e.target.value)}>
          <Radio value={true}>Да</Radio>
          <Radio value={false}>Нет</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="personal"
        valuePropName="checked"
        rules={[
          {
            required: true,
            message: "Поле обязательно к заполнению",
          },
        ]}
      >
        <Checkbox onChange={onChangePersonal}>
          Даю согласие на предоставление и обработку персональных данных
        </Checkbox>
      </Form.Item>
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
          disabled={!submittable}
        >
          Зарегистрироваться
        </Button>
      </div>
    </Form>
  );
};

export default StepFourth;
