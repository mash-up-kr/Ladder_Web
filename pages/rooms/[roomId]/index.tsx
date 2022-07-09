import React, { useState } from "react";
import type { NextPage } from "next";
import styled from "@emotion/styled";
import { NowPlaying } from "~/components/domains";
import AddSongScreen from "~/components/domains/AddSongScreen";
import { Layout } from "~/components/uis";
import IconButton from "~/components/uis/IconButton";

const TITLE = "매쇼~쉬는탐";
const DESC = "곡을 추가하거나 좋아요를 해보세요!";

const RoomPage: NextPage = () => {
  const [openAddSongScreen, setOpenAddSongScreen] = useState(false);
  console.log(openAddSongScreen);

  return (
    <Layout>
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>{TITLE}</StyledTitle>
          <StyledDesc>{DESC}</StyledDesc>
        </StyledHeader>

        <StyledContentWrapper>
          <NowPlaying noPlaylist />
          <NowPlaying noPlaylist />
          <NowPlaying noPlaylist />
        </StyledContentWrapper>

        <StyledIconWrapper>
          <IconButton
            iconName="star"
            iconText="곡 추가"
            onClick={() => setOpenAddSongScreen((prev) => !prev)}
          />
          <IconButton iconName="heart" iconText="이모지" />
          <IconButton iconName="union" iconText="무드 변경" />
        </StyledIconWrapper>
      </StyledContainer>

      {openAddSongScreen && (
        <AddSongScreen onClickBackButton={() => setOpenAddSongScreen(false)} />
      )}
    </Layout>
  );
};

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledHeader = styled.div``;

const StyledTitle = styled.h1`
  font-weight: 700;
  font-size: 28px;
  line-height: 155%;
  margin: 10px 0 0;
`;

const StyledDesc = styled.h4`
  font-weight: 500;
  font-size: 14px;
  line-height: 145%;
  letter-spacing: -0.02em;
  color: #6b6b6b;
  margin: 8px 0 0;
  margin-bottom: 34px;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  gap: 36px;
  margin-top: 22px;
  justify-content: center;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: center;
`;

export default RoomPage;
