import React from "react";
import { Grid, Text, Input, Button, Image } from "../elements/index";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import styled from "styled-components";

import { history } from "../redux/configureStore";

function PostDetail() {
  const [is_like, setIsLike] = React.useState(false);
  const changeLike = () => {
    setIsLike(!is_like);
  };
  return (
    <Grid width="60vw" height="85vh" margin="80px auto" display="flex">
      {/* 좌측 사진 */}
      <Picture> 사진 배경화면 </Picture>

      {/* 우측 게시글 */}
      <Grid width="30vw" height="85vh">
        <Wrap>
          {/* 상단네임 */}
          <Grid is_flex borderBottom="1px solid #bcbcbc" position="fixed">
            <Grid is_flex width="auto" padding="0px 8px">
              <Image
                border="1px solid #bcbcbc"
                shape="circle"
                size="40"
                src="myprofile.png"
              />
              <Text margin="0px 10px" bold>
                hanghae123
              </Text>
              <Text> • </Text>
              <Text bold margin="0px 10px" color="#0095F6">
                팔로잉
              </Text>
            </Grid>
            <Grid width="30px" margin="0px 20px">
              <Icon src="more.png" alt="see more" />
            </Grid>
          </Grid>

          {/* 본문내용  제일 바깥 그리드 높이 조절해주니까 안으로 들어와짐*/}
          <Grid display="flex" padding="10px 5px 0 10px" height="30%">
            <Grid>
              <Grid is_flex width="40%">
                <Image
                  border="1px solid #bcbcbc"
                  shape="circle"
                  size="40"
                  src="myprofile.png"
                />
                <Text bold textAlign="left">
                  hanghae12355555
                </Text>
              </Grid>
              <Grid padding="0px 0px 0px 55px">
                <Text margin="0" textAlign="left">
                  CSS 너무 어려워....방망이 깎는 장인... 인스타 얕봤다가는
                  큰코다친다!!자동으로 넘어가 져야하는데..
                </Text>
                <Text
                  margin="40px 0px"
                  color="#8e8e8e"
                  size="10px"
                  textAlign="left"
                >
                  15시간 전
                </Text>
                <div style={{ display: "flex", width: "200px" }}>
                  <Image
                    border="1px solid #bcbcbc"
                    shape="circle"
                    size="40"
                    src="myprofile.png"
                  />
                  <Text bold textAlign="left" margin="">
                    sparta111
                  </Text>
                </div>
                <Text margin="0px 0px 0px 50px " textAlign="left">
                  CSS 너무 어려워....방망이 깎는 장인... 인스타 얕봤다가는
                  큰코다친다!!자동으로 넘어가 져야하는데..
                </Text>
              </Grid>
              <Grid is_flex width="49%"></Grid>
            </Grid>
          </Grid>

          {/* 댓글내용 */}
          <Grid></Grid>
        </Wrap>

        {/* 하단 고정 메뉴 */}
        <Grid width="30vw" height="25vh" position="fixed">
          <div style={{ width: "30vw", height: "16vh" }}>
            <Grid is_flex>
              <Grid is_flex width="auto" padding="10px 16px">
                <Grid is_flex>
                  {is_like ? (
                    <RiHeart3Fill
                      style={{ cursor: "pointer", margin: "0px 20px 0px 0px" }}
                      size="28"
                      color="#ed4a57"
                      onClick={changeLike}
                    />
                  ) : (
                    <RiHeart3Line
                      style={{ cursor: "pointer", margin: "0px 20px 0px 0px" }}
                      size="28"
                      onClick={changeLike}
                    />
                  )}
                  <Icon
                    onClick={() => {
                      history.push("/postDetail");
                    }}
                    src="comment.png"
                    alt="comment"
                  />
                  <Icon src="dm.png" alt="direct message" />
                </Grid>
              </Grid>
              <Grid width="50px">
                <Icon size="20" src="scrap.png" alt="scrap" />
              </Grid>
            </Grid>

            {/* 좋아요 개수 */}
            <Grid padding="0px 18px">
              <Text bold textAlign="left" margin="0">
                좋아요 10개
              </Text>
              <Text color="#8e8e8e" size="10px" textAlign="left">
                15시간 전
              </Text>
            </Grid>
          </div>

          {/* 댓글 작성 */}
          <CommentBox>
            <Grid is_flex width="80%" margin="5px 30px 0px 0px">
              <img
                src="emoji.png"
                style={{ cursor: "pointer", padding: "0px 16px 8px 0" }}
                height={"30px"}
                alt="emoticon"
              />
              <Input border="none" placeholder="댓글 달기..."></Input>
            </Grid>
            <Text bold color="#0095F6" cursor="pointer">
              게시
            </Text>
          </CommentBox>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PostDetail;

const Picture = styled.div`
  width: 30vw;
  height: 85vh;
  background-image: url(https://cdn.univ20.com/wp-content/uploads/2015/07/74c65e31a2ac254a807006765be8fcf5-700x448.gif);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Wrap = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  width: 30vw;
  height: 60vh;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;
const CommentBox = styled.div`
  padding: 10px 8px;
  display: flex;
  flex: 1, 1, 0;
  border-top: 1px solid #efefef;
`;
