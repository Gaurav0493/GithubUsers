import React, { useEffect, useState } from 'react';
import './App.css';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import RepoDetail from './components/RepoDetail';
import RecentSearch from './components/RecentSearch';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux'; 


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL} >
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user/:id" exact component={UserDetail} />
        <Route path="/repos/:id/:id" exact component={RepoDetail} />
        </Switch>
      </Router>
  );
}

const Home = () => {

  const [ users, setUsers] = useState([]);
  const [ search, setSearch] = useState("");
  const [ query, setQuery] = useState("");
  const [ lastSearches, setlastSearches] = useState([]);

  useEffect (()=> {
    searchUser();
  },[query]);

  const searchUser = async () => {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await response.json();
    setUsers(data.items);
  }

  const updateSearch =  e => {
    setSearch(e.target.value);
  }

  const getUserSearch =  e => {
    e.preventDefault();
    setQuery(search);
    updateLastSearches(search);
  }

  const resetSearch = e => {
    setQuery("");
    setSearch("");
  }

  const updateLastSearches =  (search) => {
    let oldSearchs = [...lastSearches];
    oldSearchs.push(search);
    setlastSearches(oldSearchs);
    localStorage.setItem('pastsearches', JSON.stringify(oldSearchs));
  }

  var storeSearch = JSON.parse(localStorage.getItem('pastsearches'));

  return (
    <div className="App">
      <p> Look for Github Users</p>
      <form onSubmit={getUserSearch} className='search-form' >
        <TextField className='search-bar' type="text" value={search} onChange={updateSearch}/>
        <Button color="primary" className='search-button' type="submit"> Search </Button>
        <Button color="secondary" className='clear-search-button' type="button" onClick={resetSearch}> Clear Result</Button>
      </form>

    {storeSearch &&  storeSearch.length > 0 && <div>
      <RecentSearch lastSearches={storeSearch}/>
      </div>}
      <div className='user-list'>
      {users &&
        users.map((user, index) =>(
          <UserList key={index} user={user}/>
        ) )
      }
      </div>
    </div>
  );
}

export default connect()(App);
