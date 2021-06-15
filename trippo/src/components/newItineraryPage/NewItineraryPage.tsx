import React from 'react'
import NewItineraryContainer from './NewItineraryContainer'
import * as sc from './NewItineraryPage.styles'

function NewItineraryPage() {
    return (
        <sc.newItineraryDiv>
            <div
                style={{
                    height: "7em",
                    width: "100%",
                    boxShadow: "0 4.5px 4px 0 rgba(0, 0, 0, 0.4)",
                    textAlign: "center",
                }}>
                search bar
                    </div>
            <NewItineraryContainer />
        </sc.newItineraryDiv>
    )
}

export default NewItineraryPage
