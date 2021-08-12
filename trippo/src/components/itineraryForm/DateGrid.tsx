
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
        <sc.DateGrid item container spacing={3} direction="row">
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <sc.textField
                    fullWidth
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
            <Grid item container direction="row" xs={12} sm={10} md={8} lg={8} spacing={4}>
                <Grid item >
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
                <Grid item>
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
            </Grid>
        </sc.DateGrid>
    )
}

export default DateGrid
