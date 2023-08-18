import { Col, Form, Row, Typography } from "antd";
import React from "react";

/**
 *
 * @param {object} param
 * @param {()=>void} param.onFinish
 * @param {import('react').ReactNode} param.children
 */

function AuthLayout({ children, onFinish }) {
    return (
        <>
            <Row justify="center" style={{ marginTop: 100 }}>
                <Col>
                    <Typography.Title style={{ fontFamily: "Caligraphy" }}>
                        Must Find
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify="center">
                <Form
                    initialValues={{ remember: true }}
                    style={{ width: 300, marginTop: 50 }}
                    onFinish={onFinish}>
                    {children}
                </Form>
            </Row>
        </>
    );
}

export default AuthLayout;
