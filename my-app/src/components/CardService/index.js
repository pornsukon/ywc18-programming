import React, { useEffect, useState } from "react";
import halfLogo from "../../assets/images/halfhalf-logo.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, Avatar } from "antd";
import "antd/dist/antd.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const CardService = () => {
  const classes = useStyles();
  const [merchants, setMerchants] = useState();
  const getData = () => {
    axios.get(`https://panjs.com/ywc18.json`).then((res) => {
      const data = res.data;
      setMerchants(data.merchants);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ margin: "0 1% 0 3%", width: "100%" }}>
      {merchants &&
        merchants.map((item, i) => (
          <Card bordered={true} style={{marginBottom: "5px"}}>
            <Avatar shape="square" size={240} src={merchants[i].coverImageId}></Avatar>
          </Card>
        ))}
    </div>
  );
};

export default CardService;
