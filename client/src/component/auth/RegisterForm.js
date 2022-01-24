//import library
import { LockOutlined, UserOutlined } from '@ant-design/icons';
//import component
import { Button, Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import AlertMessage from '../layout/AlertMessage';

function RegisterForm({ redirectFrom }) {
  //state alert
  const [alert, setAlert] = useState();
  //context
  const { submitAuth } = useContext(AuthContext);
  // form finish and submit
  const onFinish = async (values) => {
    try {
      const registerData = await submitAuth(values, 'register');
      console.log(registerData);
      if (!registerData.success) {
        setAlert({ type: 'error', message: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form
        name="normal_register"
        className="login-form mt-4 flex flex-col items-center"
        onFinish={onFinish}
        size="large"
      >
        {/* //Alert err */}
        <AlertMessage className="h-[45px] w-[300px] mb-2" info={alert} />
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
            Register
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
