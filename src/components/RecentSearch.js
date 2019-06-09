import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

  class RecentSearch extends React.Component {

    state = {
      pastsearches: []
    }


    componentDidMount () {
      let { lastSearches } = this.props;
      this.setState({pastsearches:[...lastSearches]});
    }

    removeSerachItem = async (index) => {
      let { lastSearches } = this.props;

      lastSearches.splice(index, 1)

      await localStorage.setItem('pastsearches', JSON.stringify(lastSearches));

      var updatedpastSearchs = JSON.parse(localStorage.getItem('pastsearches'));
      this.setState({pastsearches: [...updatedpastSearchs]});
    }

    render() {
        let { lastSearches } = this.props;
        
        return (
          lastSearches && (<div className='recent-search'>
            <span >Last Searches </span> 
              <Paper >
                {
                  lastSearches && lastSearches.map((lastSearch,index)=>(
                    <div key={index}>
                      <List onClick={()=>this.removeSerachItem(index)} component="nav" aria-label="Main mailbox folders">
                        <ListItem >
                        <ListItemText primary={lastSearch} />
                          <ListItemSecondaryAction>
                            <IconButton name="delete" edge="end" aria-label="Comments">
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                     </div>
                  ))
                }
              </Paper>
            </div>)
          );
        }
    };

  export default RecentSearch;