import React, {useState} from 'react';
import * as sc from "./Day.styles";
import * as d from "../../app/destinations/destinationTypes";
import TimeSlot from './TimeSlot';
import moment from 'moment';
import Settings from './Settings';
import { Grid } from '@material-ui/core';

function Day({ date, handleCalendarView}) {

    const [settings, setSettings] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleSettingsView = () => {
        setSettings(!settings);
    }

    const handleEditView = () => {
        setEdit(!edit);
    }

    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h*60*60*1000));
        return this;
    }

    let timeSlots = [
        {time: new Date(date.setHours(8)),
        destination: "Hotel",
        type: d.HOTEL,
        comments: [
            "unpack", "rest"
        ],
        suggested: [
            {
                destination: "Aquarium",
                type: d.OTHER,
                comments: "3 min away"
            },
            {
                destination: "Park",
                comments: "10 min away"
            }
        ]
        },
        {time: new Date(date.setHours(8)),
            destination: "Hotel",
            comments: [
                "unpack", "rest"
            ],
            suggested: [
                {
                    destination: "Aquarium",
                    comments: "3 min away"
                },
                {
                    destination: "Park",
                    comments: "10 min away"
                }
            ]
            },
            {time: new Date(date.setHours(8)),
                destination: "Hotel",
                comments: [
                    "unpack", "rest"
                ],
                suggested: [
                    {
                        destination: "Aquarium",
                        comments: "3 min away"
                    },
                    {
                        destination: "Park",
                        comments: "10 min away"
                    }
                ]
                },
                {time: new Date(date.setHours(8)),
                    destination: "Hotel",
                    comments: [
                        "unpack", "rest"
                    ],
                    suggested: [
                        {
                            destination: "Aquarium",
                            comments: "3 min away"
                        },
                        {
                            destination: "Park",
                            comments: "10 min away"
                        }
                    ]
                    },
                    {time: new Date(date.setHours(8)),
                        destination: "Hotel",
                        comments: [
                            "unpack", "rest"
                        ],
                        suggested: [
                            {
                                destination: "Aquarium",
                                comments: "3 min away"
                            },
                            {
                                destination: "Park",
                                comments: "10 min away"
                            }
                        ]
                        },
                        {time: new Date(date.setHours(8)),
                            destination: "Hotel",
                            comments: [
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "rest"
                            ],
                            suggested: [
                                {
                                    destination: "Aquarium",
                                    comments: "3 min away"
                                },
                                {
                                    destination: "Park",
                                    comments: "10 min away"
                                }
                            ]
                            },
                            {time: new Date(date.setHours(13)),
                                destination: "Hotel",
                                comments: [
                                    "unpack", "rest"
                                ],
                                suggested: [
                                    {
                                        destination: "Aquarium",
                                        comments: "3 min away"
                                    },
                                    {
                                        destination: "Park",
                                        comments: "10 min away"
                                    }
                                ]
                                }
    ];

    return (
      <sc.dayDiv>
          <sc.dayDate>
              {
                  settings ? <button float="left" onClick={handleSettingsView}>
                  <i class="fas fa-chevron-left"></i><i class="fas fa-list"></i>
              </button> :  <button float="left" onClick={handleCalendarView}>
                <i class="fas fa-chevron-left"></i><i class="far fa-calendar-alt"></i>
            </button>
              }
            <div><div>{moment(date).format('dddd MMMM D Y')}</div></div>
            <button onClick={handleSettingsView}>
                <i class="fas fa-cog"></i>
            </button>
          </sc.dayDate>
          {
              settings ? <Settings></Settings> :
              <div>
              {
                  timeSlots.map(slot => {
                      return (
                      <div>
                          <TimeSlot timeSlot={slot} showEdit={edit}>
                          
                          </TimeSlot>
                      </div>
                      );
                  })
              }
                <Grid style={{marginTop: "0.65em",textAlign: "center", borderTop: "2px solid #F5F3F3"}} lg={12} md={12} sm={12} xs={12}>
                    {
                        edit ? 
                        <><sc.EditButton marginRight="2em"onClick={() => alert("TODO")}>Cancel</sc.EditButton><sc.Spacer/></>
                         : null
                    }
                    <sc.EditButton onClick={handleEditView}>{
                        edit ? "Done" : "Edit"
                    }</sc.EditButton>
                </Grid>
            </div>
          }
      </sc.dayDiv>
    );
}
  
export default Day;
  