import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = {
    root: {
      marginTop: '20px',
      flexGrow: 1,
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
  
  class Repolist extends React.Component {


    render() {
        let { repo, user } = this.props;

        return (
            <div style={useStyles.root}>
              <Paper style={useStyles.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom color="primary">
                          Repo Name : { repo.name }
                        </Typography>
                        <Typography variant="body2" >
                          Description: {repo.description? repo.description : "No Description present"}
                        </Typography>
                        <Typography variant="body2" >
                          Language: {repo.language}
                        </Typography>
                        <Typography variant="body2"  gutterBottom>
                          Github Repo link : <href>{repo.html_url}</href>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{ cursor: 'pointer' }}>
                         Created on {repo.created_at}
                        </Typography>
                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                          <Link to={`/repos/${user.login}/${repo.name}`}> See Detail</Link>
                        </Typography>
                      </Grid> 
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        }
    };
  
  export default Repolist;