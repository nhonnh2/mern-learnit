//import library
import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//import component
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
//import provider context
import { AuthContext } from '../../contexts/AuthProvider';

function LoginForm({ redirectFrom }) {
  //context
  const { submitAuth } = useContext(AuthContext);

  // form finish and submit
  const onFinish = async (values) => {
    try {
      const loginData = await submitAuth(values, 'login');
      console.log(loginData);
      if (loginData.success) {
        redirectFrom();
      } else {
      }
    } catch (error) {
      console.log(error);
    }
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
          Don't have to account ?{' '}
          <Link to="/auth/register" className="text-blue-400">
            Register
          </Link>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
