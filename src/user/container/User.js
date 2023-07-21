import { PageHeader, Row, Col } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export default function User() {
    const history = useHistory();
    const state = useSelector((state) => state);
    console.log(state);
    const user = useSelector((state) => state.user.user);

    return (
        <Row justify="center">
            <Col xs={24} md={20} lg={14}>
                <PageHeader onBack={history.goBack} title="user info">
                    {user.name}
                </PageHeader>
            </Col>
        </Row>
    );
}
