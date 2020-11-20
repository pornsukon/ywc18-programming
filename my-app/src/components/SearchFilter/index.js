import Paper from "@material-ui/core/Paper";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "antd/dist/antd.css";
import { Radio, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import axios from "axios";
import { InputNumber } from "antd";

const useStyles = makeStyles((theme) => ({
  searchfilter: {
    width: "25%",
    height: "100%",
    marginLeft: "1%",
  },
}));

const SearchFilter = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("ทั้งหมด");
  const [subvalue, setSubvalue] = React.useState("ทั้งหมด");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [categories, setCategories] = useState();
  const [province, setProvince] = useState();
  const [priceRange, setPriceRange] = useState();

  const getData = () => {
    axios.get(`https://panjs.com/ywc18.json`).then((res) => {
      const data = res.data;
      setCategories(data.categories);
      setProvince(data.provinces);
      setPriceRange(data.priceRange);
    });
  };
  const { Option } = Select;

  useEffect(() => {
    if (!categories) {
      getData();
    }
    setSubvalue("ทั้งหมด");
  }, [categories, value]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleChangeSubValue = (event) => {
    setSubvalue(event.target.value);
  };

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  return (
    <Paper className={classes.searchfilter} variant="outlined" square>
      <div style={{ padding: "20px" }}>
        <p style={{ margin: "0 0 20px 0", fontSize: "16px" }}>ประเภทร้านค้า</p>
        <Radio.Group onChange={handleChange} value={value}>
          <Radio style={radioStyle} value={"ทั้งหมด"}>
            ทั้งหมด
          </Radio>
          {categories &&
            categories.map((item, i) => (
              <Radio style={radioStyle} value={categories[i].name}>
                {categories[i].name}
              </Radio>
            ))}
        </Radio.Group>
        <p style={{ marginTop: "32px", fontSize: "1rem" }}>จังหวัด/ใกล้ฉัน</p>
        <Select defaultValue="พื้นที่ใกล้ฉัน" style={{ width: "100%" }}>
          <Option value="พื้นที่ใกล้ฉัน">
            <LocationOnIcon height="20" color={"#000000"} />
            พื้นที่ใกล้ฉัน
          </Option>
          <Option value="สถานที่ทั้งหมด">
            <LocationOnIcon color={"#000000"} />
            สถานที่ทั้งหมด
          </Option>
          {province &&
            province.map((item, i) => <Option value={item}>{item}</Option>)}
        </Select>
        {value != "ร้านอาหารและเครื่องดื่ม" && (
          <>
            <p style={{ marginTop: "32px", fontSize: "1rem" }}>
              ช่วงราคาสินค้า(บาท)
            </p>
            <InputNumber
              min={0}
              placeholder={"ราคาต่ำสุด"}
              style={{ width: "45%" }}
            />
            <span style={{ margin: "0 2%" }}>
              <b>-</b>
            </span>
            <InputNumber
              min={0}
              placeholder={"ราคาสูงสุด"}
              style={{ width: "45%" }}
            />
          </>
        )}
        {value == "ร้านอาหารและเครื่องดื่ม" && (
          <>
            <p style={{ marginTop: "32px", fontSize: "1rem" }}>ราคา</p>
            <Select placeholder={"กรุณาเลือก"} style={{ width: "100%" }}>
              <Option value="ทั้งหมด">ทั้งหมด</Option>
              {priceRange &&
                priceRange.map((item, i) => (
                  <Option value={item}>{item}</Option>
                ))}
            </Select>
          </>
        )}
        <Radio.Group style={{ width: "100%" }} value={"ตกลง"}>
          <Radio.Button
            style={{ width: "100%", textAlign: "center", marginTop: "5%" }}
            value="ตกลง"
          >
            ตกลง
          </Radio.Button>
        </Radio.Group>
        {value != "ทั้งหมด" && (
          <>
            <p style={{ marginTop: "32px", fontSize: "1rem" }}>ประเภท{value}</p>

            <Radio.Group onChange={handleChangeSubValue} value={subvalue}>
              <Radio style={radioStyle} value={"ทั้งหมด"}>
                ทั้งหมด
              </Radio>
              {value == "ร้านอาหารและเครื่องดื่ม" &&
                categories[0].subcategories.map((item, i) => (
                  <Radio style={radioStyle} value={item}>
                    {item}
                  </Radio>
                ))}
              {value == "ร้านค้า OTOP" &&
                categories[1].subcategories.map((item, i) => (
                  <Radio style={radioStyle} value={item}>
                    {item}
                  </Radio>
                ))}
              {value == "สินค้าทั่วไป" &&
                categories[3].subcategories.map((item, i) => (
                  <Radio style={radioStyle} value={item}>
                    {item}
                  </Radio>
                ))}
            </Radio.Group>
          </>
        )}
      </div>
    </Paper>
  );
};

export default SearchFilter;
