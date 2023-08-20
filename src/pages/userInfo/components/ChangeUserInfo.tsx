import { User } from "@/interfaces/user";
import { Button, Checkbox, Form, Input } from "antd";
interface UserProps {
    userInfo: User;
  }
const ChangeUserInfo = ({userInfo}: UserProps) => {
    console.log(userInfo)
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleOk = () => {

  }
  return (
    <section id="change-user-info">
      <Form
        name="user-info"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="First Name: " name="first-name">
          <Input value={userInfo.firstName}/>
        </Form.Item>
        <Form.Item label="Last Name:" name="last-name">
            <Input value={userInfo.lastName}/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <button key="submit" onClick={handleOk} className="primary-btn px-4 py-2">
              Update your information
            </button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default ChangeUserInfo;
