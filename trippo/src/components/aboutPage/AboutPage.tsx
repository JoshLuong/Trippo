import * as sc from "./AboutPage.styles";

// TODO: link to user documentation
function AboutPage() {
  return (
    <sc.containerDiv>
      <sc.leftHeaderDiv>
        <sc.aboutHeader $size="48px">
          <span>About Trippo</span>
        </sc.aboutHeader>
        <sc.RightHeader>
          <sc.IPhoneImage1
            width="35%"
            src="./iphone1.png"
            alt="iphone mockup"
          />
          <sc.IPhoneImage2
            width="35%"
            src="./iphone2.png"
            alt="iphone mockup"
          />
        </sc.RightHeader>
        <sc.descHeader $isAlignedCenter={false}>
          <span>
            Trippo is a collaborative, map-based, suggestive itinerary planner
            that allows users to create create customizable itineraries while
            managing their expenses at each destination.
          </span>
          <br />
          <br />
          <span>
            With Trippo, you can plan for your favorite destinations, add
            collaborators, create budgets, get Yelp® suggested activities, and
            more!
            <br />
            Say Goodbye to using traditional documents and spreadsheets, and say
            Hello to Trippo!
          </span>
          <br />
          <br />

          <span>
            For questions or concerns regarding Trippo, please see the user
            documentation "here", or contact us.&nbsp;
            <br />
            <a href="mailto: tripposupport@protonmail.com">
              <sc.StyledEmailIcon />
              <span>tripposupport@protonmail.com</span>
            </a>
          </span>
        </sc.descHeader>
        <sc.aboutHeader $size="36px">
          <span>Meet The Developers</span>
        </sc.aboutHeader>
        <sc.descHeader $isAlignedCenter>
          <sc.Developer>
            <span>Joshua Luong</span>
            <sc.StyledLink
              target="blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/joshua-luong/"
            >
              <sc.StyledLinkedInIcon />
            </sc.StyledLink>
            <sc.StyledLink
              target="blank"
              rel="noreferrer"
              href="https://joshluong.com/"
            >
              <sc.StyledWebIcon />
            </sc.StyledLink>
            <sc.StyledLink
              target="blank"
              rel="noreferrer"
              href="https://github.com/JoshLuong"
            >
              <sc.StyledGitHubIcon />
            </sc.StyledLink>
          </sc.Developer>
          <sc.Developer>
            <span>Andre</span>
            <sc.StyledLink
              target="blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/andre-r-60762918a/"
            >
              <sc.StyledLinkedInIcon />
            </sc.StyledLink>
            <sc.StyledLink
              target="blank"
              rel="noreferrer"
              href="https://github.com/andreram"
            >
              <sc.StyledGitHubIcon />
            </sc.StyledLink>
          </sc.Developer>
          <sc.Developer>
            <span>Rohit Bassi</span>
            <sc.StyledLink target="blank" rel="noreferrer" href="https://www.linkedin.com/in/r-bassi/">
              <sc.StyledLinkedInIcon />
            </sc.StyledLink>
            <sc.StyledLink target="blank" rel="noreferrer" href="https://rohitbassi.me/">
              <sc.StyledWebIcon />
            </sc.StyledLink>
            <sc.StyledLink target="blank" rel="noreferrer" href="https://github.com/r-bassi">
              <sc.StyledGitHubIcon />
            </sc.StyledLink>
          </sc.Developer>
          <sc.Developer>
            <span>Richard Ho</span>
            <sc.StyledLink target="blank" rel="noreferrer" href="https://github.com/rho1207">
              <sc.StyledGitHubIcon />
            </sc.StyledLink>
          </sc.Developer>
        </sc.descHeader>
      </sc.leftHeaderDiv>
    </sc.containerDiv>
  );
}

export default AboutPage;