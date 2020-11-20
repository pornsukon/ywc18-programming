import React, {useState} from "react";

import CardService from "../../components/CardService";
import Header from "../../components/Header";
import SearchFilter from "../../components/SearchFilter";
import SubHeader from "../../components/SubHeader";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import background from "../../assets/images/result-bg.png";

const useStyles = makeStyles((theme) => ({
  header: {
    marginLeft: "10%",
  },
  subheader: {
    margin: "0 auto",
    position: "absolute",
    left: "10%",
  },
  bgsub: {
    minHeight: 46,
    backgroundColor: "#27397c",
  },
  result: {
    padding: "20px",
    width: "100%",
    minHeight: 40,
  },
}));

const SearchMerchant = () => {
  const classes = useStyles();
  const [serchvalue, setSearchvalue] = useState("ทั้งหมด")
  return (
    <>
      <div className={classes.header}>
        <Header />
      </div>
      <div
        style={{
          backgroundImage: `url(${background})`,
          minHeight: "100vh",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className={classes.bgsub}>
          <SubHeader />
        </div>

        <p style={{ margin: "1% 0 0 1%", fontSize: "1.25rem" }}>
          ผลการค้นหา {serchvalue}
        </p>
        <div style={{ marginTop: "3.5%", display: "flex", paddingBottom: "4%" }}>
          <SearchFilter setSearchvalue={setSearchvalue} />
          <CardService />
        </div>
      </div>
    </>
  );
};

export default SearchMerchant;
