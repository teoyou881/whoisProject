import { createReducer, createSetValueAction, setValueReducer } from "../../common/redux-helper";

export const Types = {
    SetValue: "user/SetValue",
};

export const actions = {
    setValue: createSetValueAction(Types.SetValue),
};

const INITIAL_STATE = {
    user: undefined,
};

const reducer = createReducer(INITIAL_STATE, {
    [Types.SetValue]: setValueReducer,
});
export default reducer;
