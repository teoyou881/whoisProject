import { Space, Tag, Timeline, Typography } from "antd";
import React from "react";
import { diffWords } from "diff";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

/**
 *
 * @param {object} param
 * @param {object[]} param.items
 * @returns
 */

export default function History({ items }) {
    return (
        <Timeline>
            {items.map(
                (item) => (
                    console.log(item),
                    (
                        <Timeline.Item key={item.id}>
                            <Space direction="vertical">
                                <Space style={{ flexWrap: "wrap" }}>
                                    <Tag>
                                        <Link to={`/user/${item.editor}`}>
                                            person editing: {item.editor}
                                        </Link>
                                    </Tag>
                                    <Tag>person edited: {item.name}</Tag>
                                    <Tag>date: {item.date}</Tag>
                                    <Tag>features: {COLUMN_MAP[item.column]}</Tag>
                                </Space>
                                <Space>
                                    {getDiff(item).map((diff, index) => (
                                        <Typography.Text
                                            key={index}
                                            delete={diff.removed}
                                            style={{
                                                color: diff.added
                                                    ? "blue"
                                                    : diff.removed
                                                    ? "red"
                                                    : "grey",
                                            }}>
                                            {diff.value}
                                        </Typography.Text>
                                    ))}
                                    change details{" "}
                                </Space>
                            </Space>
                        </Timeline.Item>
                    )
                )
            )}
        </Timeline>
    );
}

const COLUMN_MAP = {
    tag: "tag",
    department: "department",
};

/**
 *
 * @param {object} param
 * @param {'tag' | 'department'} param.column
 * @param {string} param.before
 * @param {string} param.after
 * @return {Array<{value:string, removed?: boolean, added?: boolean}}
 */
function getDiff({ column, before, after }) {
    if (column === "tag") {
        const tags1 = before.split(",").map((item) => item.trim());
        const tags2 = after.split(",").map((item) => item.trim());
        if (tags1.length > tags2.length) {
            const tag = tags1.find((item) => !tags2.includes(item));
            if (tag) {
                return [{ value: tag, removed: true }];
            }
        } else if (tags1.length < tags2.length) {
            const tag = tags2.find((item) => !tags1.includes(item));
            if (tag) {
                return [{ value: tag, added: true }];
            }
        }
    }

    return diffWords(before, after);
}
