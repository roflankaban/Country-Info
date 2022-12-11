import {
  AppBar,
  Box,
  TextField,
  Typography,
  Button,
  Link,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

import React, { useState } from "react";

function Footer() {
  return (
    <AppBar
      position="static"
      color="secondary"
      
    >
      <Box display="flex" justifyContent="space-around">
        <Box margin="1rem">
          <Typography>Copyright &copy; Nov 2022, *Some official text*</Typography>
        </Box>
        <Box margin="1rem">
          <IconButton href={"https://twitter.com"} target="_blanck" aria-label="delete" color="primary">
                    <TwitterIcon fontSize="inherit" />
          </IconButton> 
          <IconButton href={"https://facebook.com"} target="_blanck" aria-label="delete" color="primary">
                    <FacebookIcon fontSize="inherit" />
          </IconButton>
          <IconButton href={"https://youtube.com"} target="_blanck" aria-label="delete" color="primary">
                    <YouTubeIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
}

export default Footer;
