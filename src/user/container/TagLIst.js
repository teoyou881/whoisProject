import { Input, Tag, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state";
import { PlusOutlined } from "@ant-design/icons";

export default function TagLIst() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const tags = user?.tag ? user.tag.split(",").map((item) => item.trim()) : [];

    const [isAdd, setIsAdd] = useState(false);
    const [tempTag, setTempTag] = useState("");

    function onDelete(tag) {
        const newTag = tags.filter((item) => item !== tag).join(", ");
        dispatch(actions.fetchUpdateUser({ user, key: "tag", value: newTag, fetchKey: "tag" }));
    }
    function onAdd() {
        setIsAdd(true);
        setTempTag("");
    }
    function onSave() {
        if (!tempTag) {
            setIsAdd(false);
        } else if (tags.includes(tempTag)) {
            message.error("there is already same tag");
        } else {
            const newTag = user?.tag ? `${user.tag}, ${tempTag}` : tempTag;
            dispatch(actions.fetchUpdateUser({ user, key: "tag", value: newTag, fetchKey: "tag" }));
            setIsAdd(false);
        }
    }
    return (
        <>
            {tags.map((item) => (
                <Tag key={item} closable onClose={() => onDelete(item)}>
                    {item}
                </Tag>
            ))}
            <Tag onClick={onAdd}>
                <PlusOutlined />
                New Tag
            </Tag>
            {isAdd && (
                <Input
                    autoFocus
                    type="text"
                    size="small"
                    style={{ width: 100 }}
                    value={tempTag}
                    onChange={(e) => setTempTag(e.target.value)}
                    onBlur={() => setIsAdd(false)}
                    onPressEnter={onSave}></Input>
            )}
        </>
    );
}
