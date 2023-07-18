import { Button, Dropdown } from "antd";
import React from "react";
import { SettingFilled, SmileOutlined } from "@ant-design/icons";

/*
 *    @param {object} param
 *    @param {()=>void} param.logout
 *
 *
 */

export default function Settings({ logout }) {
    const items = [
        {
            key: "1",
            label: <button onClick={() => logout}>log out</button>,
        },
    ];
    return (
        <Dropdown
            // overlay={}
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight">
            <Button shape="circle" icon={<SettingFilled />} />
        </Dropdown>
    );
}
