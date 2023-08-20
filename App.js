import  React from "react";
//import { renderToStaticMarkup } from "react-dom/server"
import logo from './logo.svg';
import './App.css';


function App() {

  const quotes = [
    "So you're a Dad now, BREATHE! You got this!",
    "Your own mental heath is important for you and baby, don't forget to take care of you too.", 
    "The prayer of a righteous man is powerful and effective.", 
    "Nothing in life will ever make you as happy as fatherhood.",
    "The job of being a Dad can be exausting at times, but remembering to laugh will brighten the day for everyone.",
    "When in doupt Pray, When you are sure of everything still Pray.", 
  ];


  //var times = [];
  var feedingSessionsCount = 1;
  var changeEveryInterval;
  var changeEvery = 60;

  function message() {
    let msg = "Welcome Back!";
    setInterval(() => {
      /**
       *  Process Order:
       *  1. Get json from backend -> (This is local for this project)
       *  2. Get a random number that does not match the last number used.  
       *  3. Parse the json to grab the X element (X = random number between the min and max of the json elements)
       *  4. Store json element into var Msg
       *  5. Push update to HTML via innerText
       * 
       *  On error, post error on the console, leaving the last valid message in the HTML.
       * 
       */
      try {
        msg = "";
        // add logic here
        const i = Math.floor(Math.random() * quotes.length);
        msg = quotes[i];
        // Done change bottom part.
        document.getElementById("message").innerHTML = msg;
      } catch (err) {
        console.log(err);
      }
    }, 10 * 1000);
    return msg;
  };

  function changeFreqUpdated() {
    let v = document.getElementById("changeFreq").value;
    if (v >= 1) {
      changeEvery = v;
      clearInterval(changeEveryInterval);
      changeEveryInterval = setInterval( () => {
        alert("It's time to check for poop!!!");
      },changeEvery * 60000);
      console.log(`running every ${changeEvery} min.`);
    }else {
      clearInterval(changeEveryInterval);
      console.log(`value was less than 1 min. Alert disabled.`);
    }
  }
  function feedingSessionUpdated(elem) {
    const count = document.getElementById("feedingSessions");
    const list = document.getElementById("feedingSessionsList");

    if (count.value < 1) {
      count.value  = 1;
    } else if (count.value > 24) {
      count.value =24;
    }

    if (feedingSessionsCount == count.value ) {
      // Do nothing....
    } else if (feedingSessionsCount < count.value ) {
      // Add Elements
      while (feedingSessionsCount != count.value){
        let element = document.createElement('tr');

        let elementId = document.createElement('td');
        elementId.innerText = feedingSessionsCount + 1;
        element.appendChild(elementId);

        let elementTime = document.createElement('td');
        let timeInput = document.createElement('input');
        timeInput.setAttribute('type','time');
        elementTime.appendChild(timeInput);
        element.appendChild(elementTime);

        let elementEnabled = document.createElement('td');
        let enabledInput = document.createElement('input');
        enabledInput.setAttribute('type','checkbox')
        elementEnabled.appendChild(enabledInput);
        element.appendChild(elementEnabled);

  
        list.firstElementChild.appendChild(element);
        feedingSessionsCount++;
        }
      
    } else {
      // Remove Elements
      while (count.value > 0 && feedingSessionsCount != count.value && feedingSessionsCount > 1){
          list.firstElementChild.removeChild(list.firstElementChild.lastElementChild);
          feedingSessionsCount--;
      }
    }
    count.value = feedingSessionsCount;
  }

  function createFeedTable() {
    return (
      <table>
        <tr>
          <th>Count</th>
          <th>Time</th>
          <th>Fed</th>
        </tr>
        {createFeedRow(1)}
      </table>
    );
  }

  function createFeedRow(rowId) {
    return (
      <tr>
        <td>
          {rowId}
        </td>
        <td>
          <input type="time"/>
        </td>
        <td>
          <input type="checkbox" value="false" />
        </td>
      </tr>
    );
  }

  function tabSelected(word) {
    try{
      const list = document.getElementById("settings");
      for(let X of list.children) {
        let results = X.id.includes(word);
        if (results){
            X.classList.add("selected");
            document.getElementById(X.id + "-cnt").classList.add("selected");
        }else {
            X.classList.remove("selected");
            document.getElementById(X.id + "-cnt").classList.remove("selected");
        }
      }
    } catch (err) {
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span id="appName">D
          <span id="appNameA"></span>A
          <span id="appNameB"></span>
        </span>
        <h3 id="message">{message()}</h3>
        <div id="settings">
          <button type="button" className="setting-tab" id="tab-food" onClick={() =>{tabSelected('food')}}>Feed me</button>
          <button type="button" className="setting-tab active" id="tab-poop" onClick={()=>{tabSelected('poop')}}>Change me</button>
        </div>
        <div id="settings-content">
          <div className="settings-content" id="tab-poop-cnt">
          <label htmlFor="changeFreq">How often is a change required? (mins)</label>
            <input id="changeFreq" type="number" placeholder="0" min={0} onChange={() =>{changeFreqUpdated()}} />
          <p></p>
          </div>
          <div className="settings-content" id="tab-food-cnt">
            <label htmlFor="feedingSessions">How many Feedings Session?</label>
            <input id="feedingSessions" type="number" placeholder="1" min={1} max={24} onChange={() =>{feedingSessionUpdated()}} />
            <div id="feedingSessionsList" >{createFeedTable()}</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
