import { FC, useState, useRef } from 'react';
import { Grid } from '@material-ui/core'
import { useAppSelector } from 'app/store';
import * as sc from './NewItinieraryContainer.styles'
import { Itinerary } from 'types/models';
import moment from 'moment';
import PreferencesContainer from './PreferencesContainer';
import DateGrid from './DateGrid';
import ItineraryOptionsContainer from "./ItineraryOptionsContainer"
import CloseIcon from '@material-ui/icons/Close';
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
    const [collaborators, setCollaborators] = useState<any[]>(card.collaborators.slice(1));
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
    const [rating, setRating] = useState(card.restaurant_ratings || 3);
    const [price, setPrice] = useState(card.dining_budget || 2);
    const maxWalkRef = useRef<HTMLInputElement>();
    const maxDriveRef = useRef<HTMLInputElement>();

    const user = useAppSelector((state) => state.user.value);

    const handleSubmit = async () => {
        if (!user) return;
        const startDateArr = startRef.current?.value.split("-") || [];
        const endDateArr = endRef.current?.value.split("-") || [];
        if (!validate(startDateArr, endDateArr)) {
            setFail(true);
            return;
        }

        // Start and end dates are in midnight local time
        const start_date = moment(startRef.current!.value).toDate();
        const end_date = moment(endRef.current!.value).toDate();

        const newItinerary: Omit<Itinerary, "user_id"> = {
            _id: card._id,
            name: nameRef.current?.value || "",
            destination: destination?.name + ", " + destination?.region || "",
            dest_coords: {
                lat: destination.latitude,
                lng: destination.longitude
            },
            budget: Number(budgetRef.current?.value),
            dining_budget: price,
            restaurant_ratings: rating,
            max_walking_dist: Number(maxWalkRef.current?.value),
            max_driving_dist: Number(maxDriveRef.current?.value),
            collaborators: [...collaborators],
            comments: descRef.current?.value,
            tags: tags,
            start_date: start_date,
            end_date: end_date,
            activities: [], // TODO change
        };
        await updateItinerary(newItinerary).unwrap()
            .then((payload: any) => {
                setSuccess(true);
                handleShowEditItinerary();
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

    const parseDate = (s: string) => {
        let momentDate = moment(s);
        return momentDate.format("YYYY-MM-DD");
    }

    return (
        <sc.newItineraryContainer>
            <sc.StyledIconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={() => handleShowEditItinerary()}
            >
                <CloseIcon style={{ color: c.BLACK }} />
            </sc.StyledIconButton>
            <sc.header>Edit Itinerary:</sc.header>
            <sc.FormGrid direction="column">
                <ItineraryOptionsContainer
                    collabSetter={setCollaborators} destinationSetter={setDestination} tagSetter={setTags}
                    descRef={descRef} nameRef={nameRef} errorMessage={errorMessage} setFail={setFail} failSnackbar={failSnackBar}
                    defaultCollaborators={collaborators} defaultDestination={destination} defaultTags={tags} defaultDesc={card.comments || ""} defaultName={card.name} />
                <DateGrid budgetRef={budgetRef} endRef={endRef} startRef={startRef} defaultBudget={card.budget || 500}
                    defaultEnd={parseDate(card.end_date)} defaultStart={parseDate(card.start_date)} />
                <PreferencesContainer setPrice={setPrice} setRating={setRating} defaultRating={rating} defaultPrice={price}
                    defaultMaxDrive={card.max_driving_dist || 15} defaultMaxWalk={card.max_walking_dist || 5} maxDriveRef={maxDriveRef} maxWalkRef={maxWalkRef} />
                <Grid container item direction="row" spacing={3} alignItems="flex-end" justify="flex-end">
                    <Grid item xs={12} sm={9} md={7} lg={5}>
                        <sc.userButton onClick={() => openDialog()} >Delete</sc.userButton>
                        <sc.userButton onClick={() => handleSubmit()} >Update</sc.userButton>
                    </Grid>
                </Grid>
            </sc.FormGrid>
        </sc.newItineraryContainer>
    )
}

export default MainEditItineraryContainer
