import logo from './logo.svg';
import './App.css';
import React from 'react';

//550 karttalaskuri
//serviceday + scheduledArrival = Unix Timestamp time
// ilkantie H1632 ja HSL:1293139

/*const L_QUERY2 = `{
  stops(name: "ilkantie") {
    name
    code
    gtfsId
  }

}`*/

//Ilkantiepysäkki
const L_QUERY2 = `{
  stop(id: "HSL:1293139") {
    name
    code
        stoptimesWithoutPatterns(numberOfDepartures: 5) {
      stop {
        platformCode
        code
        id
      }
      serviceDay
      scheduledArrival
      scheduledDeparture
      trip {
        route {
          shortName
        }
      }
      headsign
      
    }
  }
}`

/*const L_QUERY2 = `{
  stops(name: "Eliel Saarisen") {
    code
    name
      id
    stoptimesWithoutPatterns(numberOfDepartures: 5) {
      stop {
        platformCode
        code
        id
      }
      serviceDay
      scheduledArrival
      scheduledDeparture
      trip {
        route {
          shortName
        }
      }
      headsign
      
    }
  }

}`*/

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
