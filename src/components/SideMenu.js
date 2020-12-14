import React from "react";
import { makeStyles, withStyles } from "@material-ui/core";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Drawer from "../pages/Drawer/Drawer";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Employees from "../pages/Employees/Employees";
import Header from "../components/Header";
import EngineDetail from "../pages/Employees/EngineDetail";
import EcEngineUseDetail from "../pages/Employees/EcEngineUseDetail";
import EcEngineRunStateDetail from "../pages/Employees/EcEngineRunStateDetail";

// withStyles & makeStyles

const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    height: "100%",
    backgroundColor: "",
  },
  appMain: {
    paddingLeft: "200px",
    width: "100%",
  },
};

const SideMenu = (props) => {
  const { classes } = props;
  return (
    <Router>
      <div className={classes.sideMenu}>
        <div className={classes.container}>
          <Drawer />
          <div className="main"></div>
        </div>
      </div>
      <div className={classes.appMain}>
        <Header />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/ecenginelist">
            <Employees />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/enginedetail">
            <EngineDetail />
          </Route>
          <Route path="/eceengineusedetail">
            <EcEngineUseDetail/>
          </Route>
          <Route path="/ecenginerunstatedetail">
            <EcEngineRunStateDetail/>
          </Route>


          EcEngineRunStateDetail
        </Switch>
      </div>
    </Router>
  );
};


export default withStyles(style)(SideMenu);
