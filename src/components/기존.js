import React from "react";
import { Grid, Image, Input } from "../elements";
import { HiHome } from "react-icons/hi";

function header() {
  return (
    <Grid is_flex width="100%" height="30px" bg="#fff">
      <Grid margin="20px 0px 10px 0px">
        <img height={"30px"} src="literal_logo.png" alt="Instagram" />
      </Grid>
      <Grid
        padding="0px 100px 0px 100px"
        margin="0px 0px 0px 100px"
        width="700px"
        bg="green"
      >
        <Input placeholder="검색" />
      </Grid>
      <Grid is_flex padding="0px 50px 0px 200px">
        <img height="30px" src="home.png" alt="home" />
        <img height="30px" src="dm.png" alt="direct message" />
        <img height="30px" src="upload.png" alt="upload" />
        <Image margin="0px" size="55" src="profile.png" alt="profile" />
      </Grid>
    </Grid>
  );
}

export default header;
