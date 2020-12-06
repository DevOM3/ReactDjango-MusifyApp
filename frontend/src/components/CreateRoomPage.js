import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useState } from 'react';

const CreateRoomPage = (props) => {
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(2);

    const handleVotesChange = e => {
        setVotesToSkip(e.target.value);
    }

    const handleGuestCanPauseChange = e => {
        setGuestCanPause(e.target.value === 'true' ? true : false);
    }

    const handleRoomButtonPressed = e => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };

        fetch('/api/create-room', requestOptions).then(response => response.json()).then(data => props.history.push('/room/' + data.code));
    }

    return (
        <Grid container spacing={1} alignContent="center">
            <Grid item xs={12} align="center">
                <Typography component="h4" variant='h4'>
                    Create a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText>
                        <div align="center">Guest Control of Playback State</div>
                    </FormHelperText>
                    <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
                        <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary" />} 
                            label="Play/Pause" 
                            labelPlacement="bottom" 
                        />
                        <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary" />} 
                            label="No Control" 
                            labelPlacement="bottom" 
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                        onChange={handleVotesChange}
                        required={true} 
                        type="number" 
                        defaultValue={2} 
                        inputProps={{
                            min: 1,
                            style: {
                                textAlign: "center"
                            }
                        }} 
                    />
                    <FormHelperText>
                        <div align="center">
                            Votes Required to Skip Song
                        </div>
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>Create A Room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    )
}

export default CreateRoomPage;
