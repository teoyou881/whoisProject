import { createReducer, createSetValueAction, setValueReducer } from "../../common/redux-helper";

export const Types = {
    SetValue: "search/SetValue",
    FetchAutoComplete: "search/FetchAutoComplete",
};

export const actions = {
    // setValue: (key, value) => ({ type: Types.SetValue, key, value }),
    // createSetValueAction 에서 함수를 반환하고 있어서

    setValue: createSetValueAction(Types.SetValue),
    fetchAutoComplete: (keyword) => ({
        type: Types.FetchAutoComplete,
        keyword,
    }),
};

const INITIAL_STATE = {
    keyword: "",
    autoCompletes: [],
};

const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
});

export default reducer;
