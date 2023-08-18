import { createReducer, createSetValueAction, setValueReducer } from "../../common/redux-helper";

export const Types = {
    SetValue: "search/SetValue",
    FetchAutoComplete: "search/FetchAutoComplete",
    FetchAllHistory: "search/FetchAllHistory",
};

export const actions = {
    // setValue: (key, value) => ({ type: Types.SetValue, key, value }),
    // createSetValueAction 에서 함수를 반환하고 있어서

    setValue: createSetValueAction(Types.SetValue),
    fetchAutoComplete: (keyword) => ({
        type: Types.FetchAutoComplete,
        keyword,
    }),
    // 전체 사용자의 history를 가져오기때문에 param으로 아무것도 필요없다.
    fetchAllHistory: () => ({ type: Types.FetchAllHistory }),
};

const INITIAL_STATE = {
    keyword: "",
    autoCompletes: [],
    history: [],
};

const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
});

export default reducer;
