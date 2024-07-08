import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

const Login = () => {
  const { login, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async ({ username, password }) => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        username,
        password,
      });
      const { token, userId } = res.data;
      login(token, userId);

      if (location?.state?.from) navigate(location.state.from);

      alert("Login successful");
    } catch (err) {
      console.error(err);
      alert("Error logging in user");
    }
  };
  if (isAuthenticated) {
    return (
      <Button type="primary" onClick={() => logout()}>
        Log Out
      </Button>
    );
  }
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
