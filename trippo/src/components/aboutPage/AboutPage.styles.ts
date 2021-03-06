import styled from "styled-components";
import * as c from "../../colors/colors";
import EmailIcon from "@material-ui/icons/Email";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import GitHubIcon from "@material-ui/icons/GitHub";

export const StyledLink = styled.a`
  color: ${c.WHITE};
`;
export const StyledGitHubIcon = styled(GitHubIcon)`
  margin-left: 0.5em;
`;

export const StyledWebIcon = styled(LanguageIcon)`
  margin-left: 0.5em;
`;

export const Developer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const StyledLinkedInIcon = styled(LinkedInIcon)`
  margin-left: 0.5em;
`;
export const StyledEmailIcon = styled(EmailIcon)``;

export const containerDiv = styled.div`
  display: flex;
  overflow-y: hidden;
  min-height: 100%;
  background: url(/about.jpg) no-repeat fixed center;
  background-size: cover;
  flex-direction: row;
  align-items: center;
`;

export const leftHeaderDiv = styled.div`
  text-align: left;
  width: 60%;
  padding: 5em;
  flex-align: start;
  @media (max-width: 600px) {
    width: 100%;
    padding: 2em;
  }
`;

interface HeaderProps {
  $size: string;
}
export const aboutHeader = styled.h1<HeaderProps>`
  color: #ffffff;
  left: 0;
  text-shadow: 1px 0px 3px ${c.DARK_GREY};
  font-size: ${(props) => props.$size};
  font-weight: extra bold;
  @media (max-width: 600px) {
    padding-top: 70px;
    font-size: 40px;
    text-align: center;
  }
`;

export const Divider = styled.div`
  height: 0.35em;
`;

interface descProps {
  $isAlignedCenter: boolean;
}

export const descHeader = styled.h2<descProps>`
  color: #ffffff;
  font-size: 22px;
  font-weight: normal;
  @media (max-width: 1130px) {
    margin-bottom: 0;
    margin-top: 0;
  }
  @media (max-width: 600px) {
    font-size: 20px;
    text-align: center;
    ${(props) =>
    props.$isAlignedCenter
      ? `
      display: flex;
      flex-direction: column;
      align-items: center;
    `
      : ``}
    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  a:link {
    color: white;
  }
  a {
    display: inline;
    align-items: center;
    span {
      margin-left: 7px;
    }
  }
`;

export const RightHeader = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 5em;
  width: 40%;
  height: 500px;
  @media (max-width: 600px) {
    position: relative;
    display: block;
    margin: 0;
    width: 100%;
    height: 450px;
  }
`;

export const IPhoneImage1 = styled.img`
  // https://stackoverflow.com/questions/6805482/css3-transition-animation-on-load
  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  animation-delay: 1s;
  animation: 1s ease-out 0s 1 slideInFromLeft;
  position: absolute;
  top: 30%;
  left: 20%;
  @media (max-width: 910px) {
    width: 200px;
    left: 15%;
  }
  @media (max-width: 600px) {
    top: 0;
    width: 200px;
    left: 15%;
  }
  @media (max-width: 400px) {
    left: 5%;
  }
`;

export const IPhoneImage2 = styled.img`
  position: absolute;
  top: 30%;
  left: 50%;
  @media (max-width: 910px) {
    width: 200px;
    left: 45%;
  }
  @media (max-width: 600px) {
    top: 0;
    width: 200px;
    left: 45%;
  }
  @media (max-width: 400px) {
    left: 35%;
  }
`;
