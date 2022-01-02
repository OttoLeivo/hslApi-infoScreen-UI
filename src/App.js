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
  const [launches, setLaunces] = React.useState([])
  
  /*var utcSeconds = 1;
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  console.log(d)*/
  
 React.useEffect(() => {
fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({query : L_QUERY2})
}).then(response => response.json())
.then(data => setLaunces(data.data.stop.stoptimesWithoutPatterns))
//.then(data => console.log(data))
//.stoptimesWithoutPatterns

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
        {console.log(launches[0])}
        <h1>
            {launches.map(x => (
              <li key={x.scheduledArrival}>{x.trip.route.shortName}{" saapuu: "}{x.serviceDay+x.scheduledArrival}</li>
            ))}
        </h1>


      </header>
    </div>
  );
}

export default App;
