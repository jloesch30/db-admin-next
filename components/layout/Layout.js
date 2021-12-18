import React, { Fragment } from "react";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <div
        className="bg-gradient-to-tr from-red-800 to-orange-300">{props.children}
      </div>
    </Fragment>
  );
};

export default Layout;