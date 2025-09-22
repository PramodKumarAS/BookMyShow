import React from "react";
import { Button, Form, Input, message, Radio } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../API/user";
import "../Register.css";

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const onFinishRegisterForm = async (values) => {
    const { isAdmin, isPartner, ...restValues } = values;

    if (isAdmin) restValues.role = "Admin";
    if (isPartner) restValues.role = "Partner";

    try {
      const response = await registerUser(restValues);

      if (response.success) {
        messageApi.success("User registration is successful!");
        navigate("/login");
      } else if (response.userPresentError) {
        messageApi.error("Email is already taken!");
      } else {
        messageApi.error("Something went wrong!");
      }
    } catch (error) {
      console.error("error", error);
      messageApi.error("Something went wrong! Please try again.");
    }
  };

  return (
    <>
      {contextHolder}
      <header className="App-header">
        <main className="main-area">
          <section className="left-section">
            <h1>Register to BookMyShow</h1>
            <p>Create your account in just a few steps</p>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinishRegisterForm}>
              {/* Name */}
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input
                  placeholder="Enter your full name"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  placeholder="Enter your email"
                  prefix={<MailOutlined />}
                />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>

              {/* Admin Role */}
              <Form.Item
                label="Register as an Admin?"
                name="isAdmin"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option!" }]}
              >
                <Radio.Group>
                  <Radio value="partner">Yes</Radio>
                  <Radio value="user">No</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Partner Role */}
              <Form.Item
                label="Register as a Partner?"
                name="isPartner"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option!" }]}
              >
                <Radio.Group>
                  <Radio value="partner">Yes</Radio>
                  <Radio value="user">No</Radio>
                </Radio.Group>
              </Form.Item>

              {/* Submit */}
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  className="ant-btn-modern"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            <p>
              Already a user? <Link to="/login">Login now</Link>
            </p>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;
