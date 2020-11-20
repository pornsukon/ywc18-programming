import React, { useEffect, useState } from "react";
import halfLogo from "../../assets/images/halfhalf-logo.png";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import "antd/dist/antd.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logo: {
    height: "60px",
    padding: "10px 10px",
  },
  search: {
    borderRadius: "25px !important",
  },
  formControl: {
    height: "100%",
    minWidth: 120,
  },
}));

const Header = () => {
  const classes = useStyles();
  const { Option } = Select;
  const [province, setProvince] = useState();
  const [categories, setCategories] = useState();

  
  const { Search } = Input;

  const getData = () => {
    axios.get(`https://panjs.com/ywc18.json`).then((res) => {
      const data = res.data;
      setProvince(data.provinces);
      setCategories(data.categories)
    });
  };

  useEffect(() => {
    if (!categories) {
      getData();
    }
  }, [categories]);

  return (
    <div  style={{display: "flex"}}>
      <img className={classes.logo} src={halfLogo}></img>
      <Input.Group  style={{marginTop: "10px"}} compact>
      <Select defaultValue="พื้นที่ใกล้ฉัน" style={{ width: 152}}>
        <Option value="พื้นที่ใกล้ฉัน">
          <LocationOnIcon color={"#000000"} />
          พื้นที่ใกล้ฉัน
        </Option>
        <Option value="สถานที่ทั้งหมด">
          <LocationOnIcon color={"#000000"} />
          สถานที่ทั้งหมด
        </Option>
        {province &&
          province.map((item, i) => <Option value={item}>{item}</Option>)}
      </Select>
    
      <Input
          suffix={<SearchIcon className="site-form-item-icon" />}
          placeholder="ค้นหา ชื่อ ร้านอาหาร และเครื่องดื่ม ร้านธงฟ้า ร้านค้า OTOP และสินค้าทั่วไป"
          style={{ borderRadius: "0 10px 10px 0" , maxWidth: 800, height: 40}}
        />
      </Input.Group>
    </div>
  );
};

export default Header;
