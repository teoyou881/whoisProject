import { all, call, put, takeEvery } from "redux-saga/effects";
import { Types, actions } from ".";
import { callApi } from "../../common/util/api";
import { makeFetchSaga } from "../../common/util/fetch";

function* fetchUser({ name }) {
    const { isSuccess, data } = yield call(callApi, {
        url: "/user/search",
        params: { keyword: name },
    });

    if (isSuccess && data) {
        console.log("slefbl");
        const user = data.find((item) => item.name === name);
        if (user) {
            yield put(actions.setValue("user", user));
        }
    }
}

export default function* () {
    yield all([
        // takeEvery(Types.FetchUser, fetchUser)

        //사가 미들웨어와 사가 함수 사이에 makeFetchSaga가 있다.
        //사가 함수에서 yield 시켜주면 makeFetchSaga 통해서 사가 미들웨어로 넘어간다.
        //API 캐싱 데이터가 있는 경우에는, makeFetchsaga 에서 캐싱된 데이터를 사가 함수에 전달.
        takeEvery(Types.FetchUser, makeFetchSaga({ fetchSaga: fetchUser, canCache: false })),
    ]);
}
