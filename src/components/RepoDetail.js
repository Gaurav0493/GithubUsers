import React from 'react';
import Typography from '@material-ui/core/Typography';

  class RepoDetail extends React.Component {

    state = {
        repo: {},
        user: {}
        };

    getRepo = async (match) => {
        const response = await fetch(`https://api.github.com${match.url}`);
        const data = await response.json();
        this.setState({repo: data, user: data.owner})
        console.log(data);
        console.log(data.owner);
      }

    componentDidMount () {
        let { match } = this.props;
        this.getRepo(match);
    }

    render() {
        let { repo, user } = this.state;

        return (
            <React.Fragment>
            <div className="user-detail" >
                    <Typography gutterBottom color="primary" variant="subtitle1">
                          Github Name : { repo.name }
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Description : {repo.description? repo.description : "No Description present"}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Language : { repo.language }
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" >
                         Created on : {repo.created_at}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" color="secondary">
                          Created By : {user.login}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Github Repo link : {repo.html_url}
                        </Typography>
            </div>
            </React.Fragment>
          );
        }
    };
  
  export default RepoDetail;