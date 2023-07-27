import { all, call, put, takeEvery, takeLeading } from "redux-saga/effects";
import { Types, actions } from ".";
import { callApi } from "../../common/util/api";
import { deleteApiCache, makeFetchSaga } from "../../common/util/fetch";

function* fetchUser({ name }) {
    const { isSuccess, data } = yield call(callApi, {
        url: "/user/search",
        params: { keyword: name },
    });

    if (isSuccess && data) {
        const user = data.find((item) => item.name === name);
        if (user) {
            yield put(actions.setValue("user", user));
        }
    }
}

function* fetchUpdateUser({ user, key, value }) {
    const oldValue = user[key];
    //positive 방식으로 먼저 값을 넣는다.
    yield put(actions.setValue("user", { ...user, [key]: value }));
    const { isSuccess, data } = yield call(callApi, {
        url: "/user/update",
        method: "post",
        //params 는 쿼리파라미터에 사용한다.
        //params: { name: user.name, key, value, oldValue },
        //post의 data는 data를 사용
        data: { name: user.name, key, value, oldValue },
    });

    if (isSuccess && data) {
        //성공했을 때
        //user1을 치고 department를 변경하고 다시 user1을 치면 cache 값을 사용하고 있기 때문에
        //최신 데이터로 업데이트가 되지 않는다.
        //여기서 cache를 날려줘야 한다.
        //인자를 넣어주면 그에 맞는 type값의 cache만 지우고 안넣어주면 모든 cache를 다 지운다.
        deleteApiCache();
    } else {
        //실패하면 예전 user를 넣어준다.
        yield put(actions.setValue("user", user));
    }
}

export default function* () {
    yield all([
        // takeEvery(Types.FetchUser, fetchUser)

        //사가 미들웨어와 사가 함수 사이에 makeFetchSaga가 있다.
        //사가 함수에서 yield 시켜주면 makeFetchSaga 통해서 사가 미들웨어로 넘어간다.
        //API 캐싱 데이터가 있는 경우에는, makeFetchsaga 에서 캐싱된 데이터를 사가 함수에 전달.
        takeEvery(Types.FetchUser, makeFetchSaga({ fetchSaga: fetchUser, canCache: false })),
        takeLeading(
            Types.FetchUpdateUser,
            makeFetchSaga({ fetchSaga: fetchUpdateUser, canCache: false })
        ),
    ]);
}
