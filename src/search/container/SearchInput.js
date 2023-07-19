import React from "react";
import { AutoComplete, Input, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state";
import Search from "./Search";

export default function SearchInput() {
    //error: state에서 search가 없었다.
    //==>
    //const reducer = combineReducers({
    //common: commonReducer,
    //search: searchReducer,
    //});
    //common/util/store 에서 수정.
    const keyword = useSelector((state) => state.search.keyword);
    const dispatch = useDispatch();
    function setKeyword(value) {
        if (value !== keyword) {
            dispatch(actions.setValue("keyword", value));
            dispatch(actions.fetchAutoComplete(value));
        }
    }

    const autoCompletes = useSelector((state) => state.search.autoCompletes);
    console.log(autoCompletes);
    function goToUser(value) {}
    return (
        <>
            <AutoComplete
                value={keyword}
                onChange={setKeyword}
                onSelect={goToUser}
                style={{ width: "100%" }}
                options={autoCompletes.map((item) => ({
                    value: item.name,
                    label: (
                        <Space>
                            <Typography.Text strong>{item.name}</Typography.Text>
                            <Typography.Text type="secondary">{item.department}</Typography.Text>
                            <Typography.Text>{item.tag}</Typography.Text>
                        </Space>
                    ),
                }))}
                autoFocus>
                <Input size="large" placeholder="Enter your keyword" prefix={<SearchOutlined />} />
            </AutoComplete>
        </>
    );
}
