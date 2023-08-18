import React from "react";
import AuthLayout from "../component/AuthLayout";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Signup() {
    return (
        <>
            <AuthLayout>
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Please input your name!" }]}>
                    <Input autoFocus addonAfter={EMAIL_SUFFIX} placeholder="Name" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Authenticate your mail
                    </Button>
                    Or <Link to="/login">Login</Link>
                </Form.Item>
            </AuthLayout>
        </>
    );
}

const EMAIL_SUFFIX = "@company.com";

export default Signup;
