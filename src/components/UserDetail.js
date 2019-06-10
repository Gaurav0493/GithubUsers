import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import RepoList from './RepoList';

  class UserDetail extends React.Component {
    state = {
        user: {},
        repos: []
    };

    getUserRepos = async (match) =>{
        const response = await fetch(`https://api.github.com/users/${match.params.id}/repos`);
        const data = await response.json();
        this.setState({repos: data})
        console.log(data);

    }

    getUser = async (match) => {
        const response = await fetch(`https://api.github.com/users/${match.params.id}`);
        const data = await response.json();
        this.setState({user: data})
         console.log(data);
      }

    componentDidMount () {
        let { match } = this.props;
        this.getUser(match);
        this.getUserRepos(match);
    }

    render() {
        let { user, repos } = this.state;

        return (
            <React.Fragment>
            <div className="user-detail" >
              <Paper style={{height: '100%'}}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase >
                      <img alt="complex" src={user.avatar_url} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom color="primary" variant="subtitle1">
                          Github Name : { user.name }
                        </Typography>
                        <Typography gutterBottom color="primary" variant="subtitle1">
                          Bio: { user.bio ? user.bio : "Not added" }
                        </Typography>
                        <Typography gutterBottom color="primary" variant="subtitle1">
                          Company: { user.company ? user.company : "Not added" }
                        </Typography>
                        <Typography gutterBottom color="primary" variant="subtitle1">
                          Github Username : { user.login }
                        </Typography>
                        <Typography gutterBottom variant="body2" >
                          Github link : {user.html_url}
                        </Typography>
                        <Typography gutterBottom variant="body2" >
                          Followers : {user.followers}
                        </Typography>
                        <Typography gutterBottom variant="body2" >
                          Following : {user.following}
                        </Typography>
                        <Typography gutterBottom variant="body2" >
                          Location : {user.location}
                        </Typography>
                        <Typography gutterBottom variant="body2" >
                          Public Repositorites : {user.public_repos ? user.public_repos : "Not added"}
                        </Typography>
                        <Typography style={{ marginBottom: -25 }} gutterBottom variant="body2" >
                          Email : {user.email ? user.email : "Not added"}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom color="secondary" variant="body2" >
                         Created on {user.created_at}
                        </Typography>
                        <Typography gutterBottom color="secondary" variant="body2" >
                         Last updated on {user.updated_at}
                        </Typography>
                      </Grid> 
                    </Grid>
                   </Grid>
                </Grid>
              </Paper>
            </div>
            <div >
                <div className="repo-list">
                <Typography variant="body4" color="primary" align="center ">
                {user.name? `${user.name}'s Repositorites`: 'Users Repositorites'}
                </Typography>
                </div>
                {repos &&
                    repos.map(repo =>(
                    <RepoList repo={repo} user={user}/>
                    ) )
                }
            </div>
            </React.Fragment>
          );
        }
    };

  export default UserDetail;