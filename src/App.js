import './App.css';
import React from 'react';

//550 karttalaskuri
//serviceday + scheduledArrival = Unix Timestamp time
// ilkantie H1632 ja HSL:1293139

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

function App() {
const launches = useLaunches()

function calc(x, y){
  let unixT = x + y 
  console.log("Unix "+unixT)

  let paiva1 = new Date(unixT * 1000)

  let datenowUnix = Math.floor(Date.now()/1000)
  console.log("date now "+Math.floor(Date.now()/1000))

  let diffrence = unixT-datenowUnix
  console.log("diffrence "+diffrence)

  let answer = unixT + diffrence
  console.log("answer "+answer)
  
  let paiva2 = new Date(diffrence * 1000)
  console.log("paiva2 "+paiva2)
  
  //paiva1.toString()

  //console.log("paiva1 "+paiva1)
  //console.log(paiva1.getMinutes())
  
  return(paiva2.getMinutes().toString())
}
  return (
    <div className="App">
      <header className="App-header"> 
        <h1>
            {launches.map(x => (
              <li key={x.scheduledArrival}>
                {"bus "+x.trip.route.shortName+" saapuu: "}{calc(x.serviceDay, x.scheduledArrival)}
              </li>
            ))}
        </h1>
      </header>
    </div>
  );
}



function useLaunches() {
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
  return launches
}

export default App;
