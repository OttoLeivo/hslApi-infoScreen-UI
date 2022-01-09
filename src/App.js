import './App.css';
import React from 'react';

//550 karttalaskuri
//serviceday + scheduledArrival = Unix Timestamp time

//ilkantie H1632 ja HSL:1293139 => itäkeskus
const ilkantieItaK_query = `{
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

const ilkantieWestend_query = `{
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

//calculates unix time to readable time and returns it as date
function calc(x, y){

  // arrival of bus = serviceDay(current day 00 am) + scheduledArrival(seconds from the beginning of the day) 
  let arrivalUnixT = x + y 
  //console.log("arrivalUnixT "+arrivalUnixT)

  //current time as unix time
  let datenowUnix = Math.floor(Date.now()/1000)
  //console.log("datenow unix variable"+datenowUnix)
  
  //if bus already gone, need to add +1 otherwise shows next bus in 59 minutes
  /*if(arrivalUnixT<datenowUnix){
    arrivalUnixT = datenowUnix
  }*/

  //arrival of bus - current time = arrival time
  let diffrence = arrivalUnixT-datenowUnix
  //console.log("arrivalUnixT - datenowUnix = diffrence "+diffrence)
  
  //diffrence unix time to readable date
  if(diffrence<0){
    return("Meni jo")
  }
  else{
    let paiva = new Date(diffrence * 1000)
   //console.log("paiva2(diffrence) "+paiva)
    return(paiva.getMinutes().toString()+" min")
  }

}

  return (
    <div className="App">
      <header className="App-header"> 
      <h1>Itäkeskus/Kannelmäki H1632</h1>
        <h1>
            {launches.map(x => (
              <li key={x.scheduledArrival}>
                {x.trip.route.shortName+" saapuu: "}{calc(x.serviceDay, x.scheduledArrival)}
              </li>
            ))}
        </h1>
      </header>
    </div>
  );
}


function useLaunches() {
  const [launches, setLaunces] = React.useState([])
  
 React.useEffect(() => {
fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({query : ilkantieItaK_query})
}).then(response => response.json())
.then(data => setLaunces(data.data.stop.stoptimesWithoutPatterns))

  }, [])
  return launches
}

export default App;
