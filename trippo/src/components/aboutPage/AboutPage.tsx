import * as sc from './AboutPage.styles';

// TODO: link to user documentation
function AboutPage() {
    return (
        <sc.containerDiv>
            <sc.leftHeaderDiv>
                <sc.aboutHeader>About Trippo</sc.aboutHeader>
                <br/>
                <sc.descHeader>
                    <span>
                    Trippo is a collaborative, map-based, suggestive itinerary planner that allows users to create
                    create customizable itineraries while managing their expenses at each destination. 
                    </span>
                    <br/>
                    <span>
                    With Trippo you can plan for your favorite destinations, add collaborators, create budgets, and more!
                    Using multiple documents and spreadsheets is in the past, start using Trippo for your trips today!
                    </span>
                    <br/>
                    <br/>
                    
                    <span>
                    For questions or concerns regarding Trippo, please see the user documentation "here", or contact us at:&nbsp;
                    <a href="mailto: tripposupport@protonmail.com">tripposupport@protonmail.com</a>
                    </span>
                </sc.descHeader>
            </sc.leftHeaderDiv>
        </sc.containerDiv>
    )
}

export default AboutPage;
