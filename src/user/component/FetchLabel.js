import { Space, Spin } from "antd";
import React from "react";
import useFetchInfo from "../../common/hook/useFetchInfo";

/**
 *
 * @param {object} param
 * @param {string} param.label
 * @param {string} param.actionType
 * @param {string=} param.fetchKey
 * @returns
 */

// Api 응답이 느리면 어떤 api인지를 나타내는
function FetchLable({ label, actionType, fetchKey }) {
    const { isSlow } = useFetchInfo(actionType, fetchKey);
    return (
        <Space>
            {label}
            {isSlow && <Spin size="small" />}
        </Space>
    );
}

export default FetchLable;
