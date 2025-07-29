import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Radio, message } from 'antd';
import { registerUser } from '../API/user';
import {useNavigate} from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 11,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
 
  const [form] = Form.useForm();
  const [messageApi,contextHolder] = message.useMessage();
  const navigate = useNavigate()

  const onFinishRegister = async (value) => {

    const {isAdmin, isPartner, ...restValues } = value

    if(isAdmin) {
      restValues.role = "Admin"
    }

    if(isPartner) {
      restValues.role = "Partner"
    }

    try {
        const response = await registerUser(restValues);
        if(response.success){
          messageApi.success("User Registration is successfull!!")
          navigate('/login')
        }else{
          messageApi.error("Something went wrong!!")
        }
    } catch (error) {
        console.log("Registration failed:", error);
    }
};

  return ( 
        <>
            {contextHolder}

            <Form  
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinishRegister}
              initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: "+91",
              }}
              style={{
                maxWidth: 600,
              }}
              scrollToFirstError>
                      
              <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Name!',
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: '100%',
                      }}
                    />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>

              <Form.Item
                      label="Register as an Admin?"
                      htmlFor="isAdmin"
                      name="isAdmin"
                      className="d-block text-center"
                      initialValue={false}
                      rules={[{ required: true, message: "Please select an option!" }]}
                    >
                      <div className="d-flex justify-content-start">
                    
                        <Radio.Group
                          name="radiogroup"
                          className="flex-start"
                        >
                          <Radio value={'partner'}>Yes</Radio>
                          <Radio value={'user'}>No</Radio>
                        </Radio.Group>
                      </div>
              </Form.Item>

              <Form.Item
                      label="Register as a Partner"
                      htmlFor="isPartner"
                      name="isPartner"
                      className="d-block text-center"
                      initialValue={false}
                      rules={[{ required: true, message: "Please select an option!" }]}
                    >
                      <div className="d-flex justify-content-start">
                    
                        <Radio.Group
                          name="radiogroup"
                          className="flex-start"
                        >
                          <Radio value={'partner'}>Yes</Radio>
                          <Radio value={'user'}>No</Radio>
                        </Radio.Group>
                      </div>
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
        </>
    );
};

export default Register;