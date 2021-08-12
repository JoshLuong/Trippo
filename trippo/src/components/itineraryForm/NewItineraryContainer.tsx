import { FC, useState, useRef } from 'react';
import { Grid } from '@material-ui/core'
import { useAppSelector } from 'app/store';
import * as sc from './NewItinieraryContainer.styles'
import { Itinerary } from 'types/models';
import moment from 'moment';
import PreferencesContainer from './PreferencesContainer';
import DateGrid from './DateGrid';
import ItineraryOptionsContainer from "./ItineraryOptionsContainer"

interface Props {
    handleShowNewItinerary: (canShow: boolean) => void;
    setSuccess: (isSuccessful: boolean) => void;
    createItinerary: (arg: Partial<Itinerary>) => any;
}

const NewItineraryContainer: FC<Props> = ({ setSuccess, handleShowNewItinerary, createItinerary }) => {

    // Itinerary Options state
    const [collaborators, setCollaborators] = useState<any[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [destination, setDestination] = useState<any>(null);
    const nameRef = useRef<HTMLInputElement>();
    const descRef = useRef<HTMLInputElement>();
    const [errorMessage, setErrorMessage] = useState("");
    const [failSnackBar, setFail] = useState(false);

    // Date Grid state
    const budgetRef = useRef<HTMLInputElement>();
    const startRef = useRef<HTMLInputElement>();
    const endRef = useRef<HTMLInputElement>();

    // Preference Grid state
    const [rating, setRating] = useState(3);
    const [price, setPrice] = useState(2);
    const [maxTravel, setMaxTravel] = useState(10);


    const user = useAppSelector((state) => state.user.value);

    const handleSubmit = async () => {
        if (!user) return;
        console.log(startRef.current?.value);
        const startDateArr = startRef.current?.value.split("-") || [];
        const endDateArr = endRef.current?.value.split("-") || [];
        if (!validate(startDateArr, endDateArr)) {
            setFail(true);
            return;
        }

        let bud = Number(budgetRef.current?.value)
        if (bud < 0) bud = 0;
        // Start and end dates are in midnight local time
        const start_date = moment(startRef.current!.value).toDate();
        const end_date = moment(endRef.current!.value).toDate();
        const newItinerary: Omit<Itinerary, "_id" | "user_id"> = {
            name: nameRef.current?.value || "",
            destination: destination?.name + ", " + destination?.region || "",
            dest_coords: {
                lat: destination.latitude,
                lng: destination.longitude
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
            activities: [], // TODO change
        };
        console.log(newItinerary);
        await createItinerary(newItinerary).unwrap()
            .then((payload: any) => {
                setSuccess(true);
                handleShowNewItinerary(false);
            })
            .catch((error: any) => {
                setErrorMessage("Something went wrong. Try again later.")
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
        if (end_date <= start_date) {
            ret = false;
            setErrorMessage("Please ensure start date is before end date.");
        }
        return ret;
    }

    return (
        <sc.newItineraryContainer>
            <sc.header>New Itinerary:</sc.header>
            <sc.FormGrid direction="column">
                <ItineraryOptionsContainer
                    user={user} collabSetter={setCollaborators} destinationSetter={setDestination}
                    tagSetter={setTags} setErrorMessage={setErrorMessage} descRef={descRef} nameRef={nameRef} errorMessage={errorMessage}
                    setFail={setFail} failSnackbar={failSnackBar}
                    defaultCollaborators={collaborators} defaultDestination={destination} defaultTags={tags} defaultDesc={""} defaultName={""} />
                <DateGrid budgetRef={budgetRef} endRef={endRef} startRef={startRef} defaultBudget={undefined} defaultEnd={""} defaultStart={""} />
                <PreferencesContainer setPrice={setPrice} setRating={setRating} defaultRating={rating} defaultPrice={price}
                    defaultMaxTravel={maxTravel} setMaxTravel={setMaxTravel} />
                <Grid container item direction="row" spacing={3} alignItems="flex-end" justify="flex-end">
                    <Grid item xs={12} sm={9} md={6} lg={4}>
                        <sc.userButton onClick={() => handleShowNewItinerary(false)} >Cancel</sc.userButton>
                        <sc.userButton onClick={handleSubmit}>Submit</sc.userButton>
                    </Grid>
                </Grid>
            </sc.FormGrid>
        </sc.newItineraryContainer>
    )
}

export default NewItineraryContainer
