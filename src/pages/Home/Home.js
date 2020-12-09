import React from "react";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  textColorDarkBlue: {
    color: "#045762",
  },
  textCenter: {
    textAlign: "center",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={(classes.textColorDarkBlue, classes.textCenter)}>
      <h1>Hello Home Page</h1>
    </div>
  );
}
