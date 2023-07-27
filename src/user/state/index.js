import {
    FETCH_KEY,
    createReducer,
    createSetValueAction,
    setValueReducer,
} from "../../common/redux-helper";

export const Types = {
    SetValue: "user/SetValue",
    FetchUser: "user/'FetchUser'",
    FetchUpdateUser: "user/FetchUpdateUser",
};

export const actions = {
    setValue: createSetValueAction(Types.SetValue),
    fetchUser: (name) => ({ type: Types.FetchUser, name }),
    //fetchKey 용도: tag와 department 둘다 이 액션으로 처리할 것이기 때문에
    // 구별할 값이 필요하다.
    // fetchKey는 이름 충돌을 피하기 위해 Symbol을 사용하고 있다.
    fetchUpdateUser: ({ user, key, value, fetchKey }) => ({
        type: Types.FetchUpdateUser,
        user,
        key,
        value,
        [FETCH_KEY]: fetchKey,
    }),
};

const INITIAL_STATE = {
    user: undefined,
};

const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
});

export default reducer;
