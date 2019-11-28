import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { textAlign } from '@material-ui/system';

const useStyles = {
    root: {
      marginTop: '40px',
      flexGrow: 1,
      marginBottom: '20px',
      
    },
    paper: {
      margin: 'auto',
      maxWidth: 1000,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  };
  
  class UserList extends React.Component {

    render() {

        let { user } = this.props;
    
        return (
            <div style={useStyles.root}>
              <Paper style={useStyles.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase style={useStyles.image} >
                      <img style={useStyles.img} alt="complex" src={user.avatar_url} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          Github User Name : { user.login }
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Github User link : {user.html_url}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Button color="primary">
                      <Link to={`/user/${user.login}`}> See Detail</Link>
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        }

    };
 
  export default UserList;