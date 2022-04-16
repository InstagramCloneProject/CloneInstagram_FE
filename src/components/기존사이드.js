import React from "react";
import { Grid, Image, Text, Button } from "../elements";

function Follower() {
  return (
    <Grid width="500px" bg="#fafafa">
      <Grid width="430px" padding="0px 30px" height="">
        <Grid is_flex>
          <Grid is_flex width="auto" padding="0px">
            <Image shape="circle" size="60" />
            <Text margin="0px 20px" bold>
              testo_hi
            </Text>
          </Grid>
        </Grid>
        <Text size="20px" textAlign="left" bold color="#a5a5a5">
          회원님을 위한 추천
        </Text>
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image shape="circle" size="30" />
            <Text margin="0px 10px" bold>
              sparta0416
            </Text>
          </Grid>
          <Text bold color="#0095F6">
            팔로우
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Follower;
