import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  subheader: {
    margin: "0 auto",
    position: "absolute",
    left: "11%",
  },
}));
const SubHeader = () => {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", marginTop: "10px" }} className={classes.subheader}>
      <a href="#" style={{ color: "white",textDecorationLine: 'underline' }}>
        หน้าแรก
      </a>
      <p style={{ color: "white", margin : "0 10px 0 10px"}}> / </p>
      <b>
        <a style={{ color: "white"}}>ค้นหา</a>
      </b>
    </div>
  );
};

export default SubHeader;
