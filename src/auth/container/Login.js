import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AuthLayout from "../component/AuthLayout";

function Login() {
    return (
        <>
            <AuthLayout onFinish={() => {}}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "Please input your Username!" }]}>
                    <Input autoFocus prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Please input your Password!" }]}>
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                {/* <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a href="">Forgot password</a>
                </Form.Item> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Log in
                    </Button>
                    Or <Link to="/signup">Sign up now!</Link>
                </Form.Item>
            </AuthLayout>
        </>
    );
}

export default Login;
