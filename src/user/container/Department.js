import { Button, Input, message } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../state";

export default function Department() {
    // 수정상태인지 아닌지
    const [isEditDepartment, setIsEditDepartment] = useState(false);
    // 수정상태에서 input의 값을 저장하기 위해서.
    const [tempDepartment, setTempDepartment] = useState("");
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    function onSaveDepartment() {
        if (tempDepartment) {
            dispatch(
                actions.fetchUpdateUser({
                    user,
                    key: "department",
                    value: tempDepartment,
                    fetchKey: "department",
                })
            );
            setIsEditDepartment(false);
        } else {
            message.error("department value is necessary");
        }
    }

    function onEditDepartment() {
        setIsEditDepartment(true);
        setTempDepartment(user.department);
    }

    return (
        <>
            {isEditDepartment && (
                <Input
                    autoFocus // antd에서 제공   아래코드와 같은 효과
                    //ref={(ref) => ref && ref.focus()}
                    value={tempDepartment}
                    onChange={(e) => setTempDepartment(e.target.value)}
                    onPressEnter={onSaveDepartment}
                    //input에서 벗어나면 수정모드를 해제
                    onBlur={() => setIsEditDepartment(false)}
                    style={{ width: "100%" }}></Input>
            )}
            {!isEditDepartment && (
                <Button
                    type="text"
                    block
                    onClick={onEditDepartment}
                    style={{ textAlign: "left", padding: 0 }}>
                    {user.department}
                </Button>
            )}
        </>
    );
}
