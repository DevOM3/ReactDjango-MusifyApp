import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import RoomJoinPage from './RoomJoinPage';
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { useState } from 'react';

const HomePage = () => {
    const [roomCode, setRoomCode] = useState(null);

    useEffect(() => {
        const checkIfExist = async () => {
            fetch('/api/user-in-room').then(response => response.json()).then(data => setRoomCode(data.code))
        }
        checkIfExist();
    }, []);

    const clearRoomCode = () => setRoomCode(null);

    const renderHomePage = () => 
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                    Musify!
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" to="/join" component={Link}>
                        Join a Room
                    </Button>
                    <Button color="secondary" to="/create" component={Link}>Create a Room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>

    return (
        <Router>
            <Switch>
                <Route path="/join" component={RoomJoinPage}/>
                <Route path="/create" component={CreateRoomPage}/>
                <Route path="/room/:roomCode" render={props => <Room {...props} leaveRoomCallback={clearRoomCode} />}/>
                <Route exact path="/" render={() => roomCode ? <Redirect to={`/room/${roomCode}`}/> : renderHomePage()}></Route>
            </Switch>
        </Router>
    )
}

export default HomePage;
