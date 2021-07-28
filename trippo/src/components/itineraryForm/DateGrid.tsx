
import { FC, MutableRefObject } from 'react';
import { Grid, InputAdornment } from '@material-ui/core'
import * as sc from './NewItinieraryContainer.styles'


interface Props {
    defaultBudget: any;
    defaultStart: string;
    defaultEnd: string;
    budgetRef: MutableRefObject<HTMLInputElement | undefined>;
    startRef: MutableRefObject<HTMLInputElement | undefined>;
    endRef: MutableRefObject<HTMLInputElement | undefined>;
}

const DateGrid: FC<Props> = ({ budgetRef, startRef, endRef, defaultBudget, defaultEnd, defaultStart }) => {

    return (
        <sc.DateGrid item container spacing={2} direction="row">
            <Grid item xs={8} lg={3}>
                <sc.textField
                    inputRef={budgetRef}
                    defaultValue={defaultBudget}
                    id="outlined-number"
                    label="Budget"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    variant="outlined"
                />
            </Grid >
            <Grid item xs={8} lg={3}>
                <sc.textField
                    defaultValue={defaultStart}
                    required
                    inputRef={startRef}
                    id="start_date"
                    label="Start date"
                    type="date"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid >
            <Grid item xs={6} lg={3}>
                <sc.textField
                    defaultValue={defaultEnd}
                    required
                    inputRef={endRef}
                    id="end_date"
                    label="End date"
                    type="date"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </sc.DateGrid>
    )
}

export default DateGrid
