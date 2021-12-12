import logo from './logo.svg';
import './App.css';
import React from 'react';

const L_QUERY2 = `{
  stops(name: "Herttoniemenranta") {
    name
    lat
    id
    lon
    
    wheelchairBoarding
  }
}`

function App() {
 React.useEffect(() => {
fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({query : L_QUERY2})
}).then(response => response.json())
.then(data => console.log(data))

  }, [])

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
           {
           }
         
      </header>
    </div>
  );
}

export default App;
