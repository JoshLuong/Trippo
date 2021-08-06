import * as sc from "./AboutPage.styles";

// TODO: link to user documentation
function AboutPage() {
  return (
    <sc.containerDiv>
      <sc.leftHeaderDiv>
        <sc.aboutHeader>
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
        <sc.descHeader>
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
      </sc.leftHeaderDiv>
    </sc.containerDiv>
  );
}

export default AboutPage;
