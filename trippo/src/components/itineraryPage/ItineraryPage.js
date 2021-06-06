import React, {useState} from 'react';
import Container from '../itineraryEdit/Container';
import * as sc from "./ItineraryPage.styles"

function ItineraryPage() {
  const [showItinerary, setShowItinerary] = useState(true);

  function handleOpenItinerary(){
    setShowItinerary(!showItinerary)
  }
    // TODO: REMOVE INLINE STYLE
    
    // consume search, etc.
    // relative is imporant for absolute calendar
    //585px
    return (
      <div style={{position: "relative", display:"flex"}}> 
      <sc.SideBar style={{width: "2em"}}>
        <button onClick={handleOpenItinerary}>
          {
            showItinerary ? <i class="fas fa-chevron-left"></i> : <i class="fas fa-chevron-right"></i>
          }
        </button>
      </sc.SideBar>
      {
        showItinerary ? 
        <sc.Container>
          <Container></Container>
        </sc.Container> : null
      }
        <div style={{display:"inline-block", backgroundColor: "grey", height:"65vh", flex: "1"}}>
        </div>
      </div>
    );
}
  
export default ItineraryPage;
  