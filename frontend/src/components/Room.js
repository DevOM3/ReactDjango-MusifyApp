import React, { useEffect } from 'react';
import { useState } from 'react';
import { Grid, Button, Typography } from "@material-ui/core";

const Room = props => {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [roomCode, setRoomCode] = useState(props.match.params.roomCode);
    
    const getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + roomCode).then(response => {
            if (!response.ok) {
                props.leaveRoomCallback();
                props.history.push("/");
            }
            response.json()
        }).then(data => {
            setVotesToSkip(data.votes_to_skip)
            setGuestCanPause(data.guest_can_pause)
            setIsHost(data.is_host)
        });
    }

    const leaveButtonPress = () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        };
        fetch('/api/leave-room', requestOptions).then(_request => {
            props.leaveRoomCallback();
            props.history.push("/");
        })
    }
    
    useEffect(() => {
        getRoomDetails();
    }, []);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {guestCanPause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {isHost.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" onClick={leaveButtonPress}>
                    Leave Room
                </Button>
            </Grid>
        </Grid>
    )
}

export default Room;
