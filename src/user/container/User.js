import { PageHeader, Row, Col, Descriptions, Typography, Space, Spin } from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Types, actions } from "../state";
import DescriptionsItem from "antd/lib/descriptions/Item";
import useFetchInfo from "../../common/hook/useFetchInfo";
import Department from "./Department";
import TagLIst from "./TagLIst";
import History from "../../common/component/History";

/**  
@param {object} param
@param {import('react-router').match} param.match
*/ import FetchLable from "./../component/FetchLabel";

//Route를 통해서 렌더링 되는 컴포넌트에는 항상 match라는 속성값이 입력된다.
export default function User({ match }) {
    const name = match.params.name;
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(actions.fetchUser(name));
    }, [name]);

    // const isFetched = true;
    const { isFetched, isSlow } = useFetchInfo(Types.FetchUser);

    return (
        <Row justify="center">
            <Col xs={24} md={20} lg={14}>
                <PageHeader
                    onBack={history.goBack}
                    title={
                        <FetchLable label="User Info" actionType={Types.FetchUser} />
                        /*  <Space>
                            UserInfo
                            {isSlow && <Spin size="small" />}
                        </Space> */
                    }>
                    {user && (
                        <Descriptions layout="vertical" bordered column={1}>
                            <DescriptionsItem label="name">
                                <Typography>{user.name}</Typography>
                            </DescriptionsItem>
                            <DescriptionsItem
                                label={
                                    <FetchLable
                                        label="Department"
                                        actionType={Types.FetchUpdateUser}
                                        fetchKey="department"
                                    />
                                }>
                                <Department />
                            </DescriptionsItem>
                            <DescriptionsItem
                                label={
                                    <FetchLable
                                        label="Tag"
                                        actionType={Types.FetchUpdateUser}
                                        fetchKey="tag"
                                    />
                                }>
                                <TagLIst />
                            </DescriptionsItem>
                            <DescriptionsItem label="edit log">
                                <History />
                            </DescriptionsItem>
                        </Descriptions>
                    )}
                    {!user && isFetched && (
                        <Typography.Text>User just typed does not exist</Typography.Text>
                    )}

                    {/* {user?.name} */}
                    {/* 새로고침을 했을 때 user 정보는 undefined이기 때문에 name을 가져오려다 error가 발생한다.
                        optional chaining을 사용해서 에러발생을 막고,
                        path parameter에 정보가 있기 때문에 그 정보를 표기해주자. */}
                </PageHeader>
            </Col>
        </Row>
    );
}
