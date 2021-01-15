import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPerson, getTag, getRelation, updateTag } from "./actions/index";
import Home from "./components/Home";
import Persons from "./components/Persons";
import Tags from "./components/Tag";
import SetRelation from "./components/SetRelation";
import CheckRelation from "./components/CheckRelation";
import "antd/dist/antd.css";
import "./App.css";
import { HomeOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPerson());
    dispatch(getRelation());
    dispatch(getTag());
    dispatch(updateTag());
  }, [dispatch]);

  return (
    <React.Fragment>
      <HomeOutlined style={{ cursor: "pointer",fontSize:"25px", color:"red" }}
        onClick={() => {
          window.location = "/";
        }} />
      <h1>
        Relationship Builder App
      </h1>

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/people" component={Persons} />
          <Route path="/tag" component={Tags} />
          <Route path="/setRelation" component={SetRelation} />
          <Route path="/checkRelation" component={CheckRelation} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
