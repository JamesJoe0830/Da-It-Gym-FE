import styled from "styled-components";
import * as COLOR from "../../constants/color";
import * as FONT from "../../constants/font";
export const FollowUserWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 75px;
  background-color: ${COLOR.White};
  box-shadow: 0px 4px 4px ${COLOR.Shadow};
  border-radius: 10px;
  padding: 6px 0px 6px 16px;
`;

export const FollowUserImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 10px;
`;

export const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin: 12px 10px;
`;

export const UserInfoBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const FollowUserName = styled.div`
  font-size: ${FONT.L};
  color: ${COLOR.Black};
`;
export const FollowInfo = styled.div`
  font-size: ${FONT.S};
  color: ${COLOR.Gray4};
`;
export const InbodyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const InbodyTitle = styled.div`
  font-size: ${FONT.S};
  font-weight: ${FONT.Bold};
  color: ${COLOR.Gray4};
`;
export const InbodyScore = styled.div`
  font-size: ${FONT.L};
  font-weight: ${FONT.Bold};
  color: ${COLOR.Primary};
`;
