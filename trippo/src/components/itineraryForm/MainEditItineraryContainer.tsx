import { FC, useState, useRef } from 'react';
import { Dialog, Grid } from '@material-ui/core'
import { useAppSelector } from 'app/store';
import * as sc from './NewItinieraryContainer.styles'
import { Itinerary } from 'types/models';
import moment from 'moment';
import PreferencesContainer from './PreferencesContainer';
import DateGrid from './DateGrid';
import ItineraryOptionsContainer from "./ItineraryOptionsContainer"
import CancelIcon from '@material-ui/icons/Close';
import * as c from "../../colors/colors";

interface Props {
    card: any;
    handleShowEditItinerary: () => void;
    setSuccess: (isSuccessful: boolean) => void;
    updateItinerary: (arg: Partial<Itinerary>) => any;
    openDialog: () => void;
}

const MainEditItineraryContainer: FC<Props> = ({ card, setSuccess, handleShowEditItinerary, updateItinerary, openDialog }) => {

    // Itinerary Options state
    const [collaborators, setCollaborators] = useState<any[]>(card.collaborators);
    const [tags, setTags] = useState<string[]>(card.tags);
    const [destination, setDestination] = useState<any>({ name: card.destination, ...card.dest_coords });
    const nameRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLInputElement>();
    const [errorMessage, setErrorMessage] = useState("");
    const [failSnackBar, setFail] = useState(false);

    // Date Grid state
    const budgetRef = useRef<HTMLInputElement>();
    const startRef = useRef<HTMLInputElement>();
    const endRef = useRef<HTMLInputElement>();

    // Preference Grid state
    const [rating, setRating] = useState(card.restaurant_ratings);
    const [price, setPrice] = useState(card.dining_budget);
    const [maxTravel, setMaxTravel] = useState(card.max_traveling_dist);

    const user = useAppSelector((state) => state.user.value);

    const handleSubmit = async () => {
        if (!user) return;
        const startDateArr = startRef.current?.value.split("-") || [];
        const endDateArr = endRef.current?.value.split("-") || [];
        if (!validate(startDateArr, endDateArr)) {
            setFail(true);
            return;
        }

        let dest = { ...destination }

        // has wikiDataId if destination was updated
        if (destination.wikiDataId) {
            dest.name = destination?.name + ", " + destination?.region;
            dest.lat = destination.latitude;
            dest.lng = destination.longitude;
        }

        let bud = Number(budgetRef.current?.value)
        if (bud < 0) bud = 0;

        // Start and end dates are in midnight local time
        const start_date = moment(startRef.current!.value).toDate();
        const end_date = moment(endRef.current!.value).toDate();
        const newItinerary: Omit<Itinerary, "user_id"> = {
            _id: card._id,
            name: nameRef.current?.value || "",
            destination: dest?.name,
            dest_coords: {
                lat: dest.lat,
                lng: dest.lng
            },
            budget: bud || null,
            dining_budget: price,
            restaurant_ratings: rating,
            max_traveling_dist: maxTravel,
            collaborators: [...collaborators],
            comments: descRef.current?.value,
            tags: tags,
            start_date: start_date,
            end_date: end_date,
            activities: card.activities,
        };
        await updateItinerary(newItinerary).unwrap()
            .then((payload: any) => {
                setSuccess(true);
                handleShowEditItinerary();
            })
            .catch((error: any) => {
                setErrorMessage("Something went wrong. Please make sure itinerary names are unique or try again later.")
                setFail(true);
            });
    }

    const validate = (startDateArr: string[], endDateArr: string[]) => {
        setErrorMessage(" ");
        let ret: boolean = true;
        let emptyFields: string[] = [];
        if (!(typeof nameRef.current?.value === "string" && nameRef.current?.value !== "")) {
            ret = false;
            emptyFields.push("Name");
        }
        if (!(typeof destination?.name === "string" && destination?.name !== "")) {
            ret = false;
            emptyFields.push("Destination");
        }
        if (startDateArr.length < 3 || endDateArr.length < 3) {
            ret = false;
            emptyFields.push("Start and End Date");
        }
        if (emptyFields.length > 0) {
            let msg = "Please fill in these required fields: "
            for (let i = 0; i < emptyFields.length; i++) {
                msg += emptyFields[i];
                if (i !== emptyFields.length - 1) {
                    msg += ", ";
                } else msg += ".";
            }
            setErrorMessage(msg);
        }
        const start_date = new Date(Date.UTC(Number(startDateArr[0]), Number(startDateArr[1]) - 1, Number(startDateArr[2])));
        const end_date = new Date(Date.UTC(Number(endDateArr[0]), Number(endDateArr[1]) - 1, Number(endDateArr[2])));
        if (end_date < start_date) {
            ret = false;
            setErrorMessage("Please ensure start date is before end date.");
        }
        return ret;
    }

    const parseDate = (s: string) => {
        let momentDate = moment(s);
        return momentDate.format("YYYY-MM-DD");
    }

    return (
        <Dialog
            open={true}
            onClose={() => handleShowEditItinerary()}
        > <sc.newItineraryContainer>
                <sc.StyledIconButton
                    color="inherit"
                    edge="start"
                    onClick={() => handleShowEditItinerary()}
                >
                    <CancelIcon style={{ color: c.WHITE }} />
                </sc.StyledIconButton>
                <sc.header>Edit Itinerary:</sc.header>
                <sc.FormGrid>
                    <ItineraryOptionsContainer
                        user={user}
                        collabSetter={setCollaborators}
                        destinationSetter={setDestination}
                        tagSetter={setTags}
                        setErrorMessage={setErrorMessage}
                        descRef={descRef}
                        nameRef={nameRef}
                        errorMessage={errorMessage}
                        setFail={setFail}
                        failSnackbar={failSnackBar}
                        defaultCollaborators={collaborators}
                        defaultDestination={destination}
                        defaultTags={tags}
                        defaultDesc={card.comments || ""}
                        defaultName={card.name} />
                    <DateGrid budgetRef={budgetRef}
                        endRef={endRef} startRef={startRef}
                        defaultBudget={card.budget || undefined}
                        defaultEnd={parseDate(card.end_date)}
                        defaultStart={parseDate(card.start_date)} />
                    <PreferencesContainer
                        setPrice={setPrice}
                        setRating={setRating}
                        defaultRating={rating}
                        defaultPrice={price}
                        defaultMaxTravel={maxTravel}
                        setMaxTravel={setMaxTravel} />
                    <Grid container item direction="row" spacing={3} alignItems="flex-end" justify="flex-end">
                        <sc.ButtonGrid item xs={12} sm={9} md={7} lg={5}>
                            <sc.userButton onClick={() => openDialog()} >Delete</sc.userButton>
                            <sc.userButton onClick={() => handleSubmit()} >Update</sc.userButton>
                        </sc.ButtonGrid>
                    </Grid>
                </sc.FormGrid>
            </sc.newItineraryContainer>
        </Dialog>
    )
}

export default MainEditItineraryContainer
