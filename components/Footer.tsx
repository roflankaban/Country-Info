import { AppBar, Box, IconButton, Link, Toolbar } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import React from 'react'



function Footer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0,background: '#2E3B55' }}>
        <Toolbar>
          <IconButton href={"https://twitter.com"} target="_blanck" aria-label="delete" color="primary">
                    <TwitterIcon fontSize="inherit" />
          </IconButton> 
          <IconButton href={"https://facebook.com"} target="_blanck" aria-label="delete" color="primary">
                    <FacebookIcon fontSize="inherit" />
          </IconButton>
          <IconButton href={"https://youtube.com"} target="_blanck" aria-label="delete" color="primary">
                    <YouTubeIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}


export default Footer