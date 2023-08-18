import React from "react";
import Search from "./search/container/Search";
import "antd/dist/antd.css";
import { Route } from "react-router-dom/cjs/react-router-dom";
import User from "./user/container/User";
import { useEffect } from "react";
import Login from "./auth/container/Login";
import Signup from "./auth/container/Signup";

export default function App() {
    //앱 마운트되는 시점에 loadingEl을 지워주자.
    useEffect(() => {
        const bodyEl = document.getElementsByTagName("body")[0];
        const loadingEl = document.getElementById("init-loading");
        bodyEl.removeChild(loadingEl);
    }, []);

    return (
        <>
            <Route exact path="/" component={Search}></Route>
            <Route path="/user/:name" component={User}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={Signup}></Route>
        </>
    );
}
