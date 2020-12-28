import React, { useEffect } from "react";
import { useState } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
// http://127.0.0.1:8000/room/TBKSZR
// http://127.0.0.1:8000/room/KAMVBP

const Room = (props) => {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const [roomCode, setRoomCode] = useState(props.match.params.roomCode);
  const [song, setSong] = useState({});

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  const getCurrentSong = () => {
    fetch(`/spotify/current-song`)
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => setSong(data));
  };

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          props.leaveRoomCallback();
          props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        data.is_host && authenticateSpotify();
      });
  };

  const leaveButtonPress = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_request) => {
      props.leaveRoomCallback();
      props.history.push("/");
    });
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  useEffect(() => {
    getRoomDetails();

    const interval = setInterval(() => {
      getCurrentSong();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const renderSettingsButton = () => (
    <Grid item xs={12} align="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => updateShowSettings(true)}
      >
        Settings
      </Button>
    </Grid>
  );

  const renderSettings = () => (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <CreateRoomPage
          update
          votesToSkipProp={votesToSkip}
          guestCanPauseProp={guestCanPause}
          roomCode={roomCode}
          updateCallBack={getRoomDetails}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => updateShowSettings(false)}
        >
          Close
        </Button>
      </Grid>
    </Grid>
  );

  return showSettings ? (
    renderSettings()
  ) : (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      <MusicPlayer
        imageURL={song?.image_url}
        title={song?.title}
        artist={song?.artist}
        duration={song?.duration}
        time={song?.time}
        isPlaying={song?.is_playing}
      />
      {isHost && renderSettingsButton()}
      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          onClick={leaveButtonPress}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;
