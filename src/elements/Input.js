import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Text from "./Text";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
    margin,
    //추가
    padding,
    height,
    rows,
    cols,
    children,
    _ref,
    width,
    size,
    bg,
    border,
    _style,
  } = props;

  //추가
  const style = {
    width,
    size,
    bg,
    margin,
    padding,
    height,
    border,
  };

  if (multiLine) {
    return (
      //추가 is_flex, baseline // ElTextArea 프롭스 수정
      <Grid is_flex baseline>
        {label && (
          <Text margin="0px" size={size} center bold>
            {" "}
            {label}
          </Text>
        )}
        <ElTextArea
          {...style}
          ref={_ref}
          rows={rows}
          cols={cols}
          value={value ? value : ""}
          placeholder={placeholder}
          onChange={_onChange}
          // margin={margin} //style에 넣었으니 안써도 되나?
        />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      {/* 추가 is_flex baseline, ElInput 프롭스 변경 */}
      <Grid is_flex baseline>
        {label && (
          <Text margin="0px" size={size} center>
            {" "}
            {label}
          </Text>
        )}
        {is_submit ? (
          <ElInput
            {...style}
            ref={_ref}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value ? value : ""}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
            style={_style}
          />
        ) : (
          //ElInput 프롭스 변경
          <ElInput
            alue={value ? value : ""}
            {...style}
            ref={_ref}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            style={_style}
          />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  is_submit: false,
  margin: "4% 2% 4% 2%", //수정
  onSubmit: () => {},
  _onChange: () => {},
  bg: "#fff",
  //추가
  padding: "2% 2% 2% 2%",
  width: "20%",
  size: "14px",
  border: "",
};

const ElTextArea = styled.textarea`
  border: 1px solid #212121;
  border-radius: 10px;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  /* margin-bottom: 10px; 삭제필요 */
  //추가
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  min-height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  resize: none;
  outline: none;
  word-break: keep-all;
  word-wrap: break-word;
  &:focus {
    outline: none;
  }
  border: ${(props) => props.border};
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  border-radius: 8px;
  width: 100%;
  padding: 8px 4px; //수정
  box-sizing: border-box;
  margin-bottom: 5px; //수정
  //추가
  background-color: ${(props) => props.bg};
  outline: none;
  -webkit-appearance: none;
  border: ${(props) => props.border};
`;

export default Input;
