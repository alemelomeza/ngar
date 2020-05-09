import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

const GET_USERS = gql`
{
    users {
        id
        login
        avatar_url
    }
}
`

const User = ({ user: { login, avatar_url } }) => (
    <div className="Card">
        <div>
            <img alt="avatar" className="Card--avatar" src={avatar_url} />
            <h1 className="Card--name">{login}</h1>
        </div>
        <a href={`https://github.com/${login}`} className="Card--link">See profile</a>
    </div>
)

function App() {
  const { loading, error, data } = useQuery(GET_USERS)

  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <h1>Github | Users</h1>
      {data.users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;
