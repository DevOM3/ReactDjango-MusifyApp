import {
  Card,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const MusicPlayer = ({
  imageURL,
  title,
  artist,
  isPlaying,
  time,
  duration,
}) => {
  const songProgress = (time / duration) * 100;

  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={imageURL} height="100%" width="100%" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {artist}
          </Typography>
          <div>
            <IconButton>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress
        variant="determinate"
        value={songProgress}
      ></LinearProgress>
    </Card>
  );
};

export default MusicPlayer;
