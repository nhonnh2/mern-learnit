//import library
import React from 'react';
//import component
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <Form
        name="normal_login"
        className="login-form mt-4 flex flex-col items-center"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        size="large"
      >
        {/* field username */}
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            className="h-[45px] w-[300px]"
          />
        </Form.Item>
        {/* field password */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            className="h-[43px] w-[300px]"
          />
        </Form.Item>
        {/* field confirm password */}
        <Form.Item
          name="confirm"
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

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            className="h-[43px] w-[300px]"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm password"
          />
        </Form.Item>
        {/* field submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button mt-5"
          >
            Log in
          </Button>
        </Form.Item>
        {/* bottom-form */}
        <div className="bottom-form text-white">
          Already have to account ?{' '}
          <Link to="/auth/login" className="text-blue-400">
            login
          </Link>
        </div>
      </Form>
    </>
  );
}

export default RegisterForm;
