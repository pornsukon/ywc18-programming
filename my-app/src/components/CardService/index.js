import React, { useEffect, useState } from "react";
import halfLogo from "../../assets/images/halfhalf-logo.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, Avatar, Button } from "antd";
import "antd/dist/antd.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import car from "../../assets/images/ที่จอดรถ.png";
import book from "../../assets/images/รับจองล่วงหน้า.png";
import deliver from "../../assets/images/บริการจัดส่งอาหาร.png";

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

  const priceLevel = [1, 2, 3, 4];
  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ margin: "0 1% 0 3%", width: "100%" }}>
      {merchants &&
        merchants.map((item, i) => (
          <Card bordered={true} style={{ marginBottom: "5px" }}>
            <div style={{ display: "flex" }}>
              <Avatar
                shape="square"
                size={240}
                src={merchants[i].coverImageId}
              ></Avatar>
              <div>
                <div style={{ display: "flex" }}>
                  <p style={{ marginLeft: 20 }} fontSize={"20px"}>
                    <b>{merchants[i].shopNameTH}</b>
                  </p>
                  {(merchants[i].isOpen == "Y" ||
                    merchants[i].isOpen == "N") && (
                    <>
                      <Button
                        type="primary"
                        style={{
                          background:
                            merchants[i].isOpen == "Y" ? "#1bc300" : "#a1a1a1",
                          borderColor: "white",
                          padding: "0px 7px",
                          margin: "0px 8px 0px 16px",
                          fontSize: "12px",
                          height: 20,
                        }}
                      >
                        {merchants[i].isOpen == "Y" ? "เปิดอยู่" : "ปิดแล้ว"}
                      </Button>
                    </>
                  )}
                </div>
                <div
                  style={{
                    width: "120%",
                    marginLeft: 20,
                    height: 30,
                    color: "#999999",
                  }}
                >
                  {merchants[i].subcategoryName}
                  <span style={{ marginLeft: "2%", marginRight: "2%" }}>|</span>
                  {merchants[i].priceLevel &&
                    priceLevel.map((item, j) =>
                      merchants[i].priceLevel >= item ? (
                        <span style={{ color: "#222222" }}>฿</span>
                      ) : (
                        <span style={{ color: "#BBBBBB" }}>฿</span>
                      )
                    )}
                  {merchants[i].priceLevel && (
                    <span style={{ marginLeft: "2%", marginRight: "2%" }}>
                      |
                    </span>
                  )}
                  {merchants[i].addressDistrictName}
                  {"  "}
                  {merchants[i].addressProvinceName}
                </div>
                <hr
                  style={{
                    marginLeft: 20,
                    backgroundColor: "#999999",
                    border: "0.002px solid rgb(238, 238, 238)",
                    width: "120%",
                  }}
                />
                {merchants[i].highlightText && (
                  <p style={{ marginLeft: 20 }} fontSize={"20px"}>
                    {merchants[i].highlightText
                      .replace("<strong>", "")
                      .replace("</strong>", "")}
                  </p>
                )}
                {merchants[i].recommendedItems && (
                  <p style={{ marginLeft: 20 }}>
                    <b>เมนูแนะนำ: </b>
                    {merchants[i].recommendedItems.map((item, j) =>
                      j != merchants[i].recommendedItems.length - 1
                        ? item + ", "
                        : item
                    )}
                  </p>
                )}
                {merchants[i].facilities &&
                  merchants[i].facilities.map((item, j) =>
                    item == "ที่จอดรถ" ? (
                      <Avatar
                        style={{
                          marginLeft: 20,
                          border: "1px solid #1bc300",
                        }}
                        src={car}
                      ></Avatar>
                    ) : item == "รับจองล่วงหน้า" ? (
                      <Avatar
                        style={{
                          marginLeft: 20,
                          border: "1px solid #1bc300",
                          padding: "5px",
                        }}
                        src={book}
                      ></Avatar>
                    ) : item == "บริการจัดส่งอาหาร" ? (
                      <Avatar
                        style={{
                          marginLeft: 20,
                          border: "1px solid #1bc300",
                        }}
                        src={deliver}
                      ></Avatar>
                    ) : (
                      <div></div>
                    )
                  )}
              </div>
            </div>
          </Card>
        ))}
      <Button
        style={{
          height: "50px",
          borderRadius: "5px",
          fontSize: "14px",
          marginTop: "40px",
          marginLeft: "35%",
          padding: "4px 15px",
          width: "30%",
        }}
      >
        ดูเพิ่มเติม
      </Button>
    </div>
  );
};

export default CardService;
