import { Route, Switch } from 'react-router-dom';
import './App.css';
import Quote from './components/quote';
import Liked from './components/liked';
import { useState,useEffect } from 'react';


function App() {

  let [quotesTotal,setQuoteList] = useState('')

  useEffect(() => {
    fetch("http://localhost:8000/advices")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.length);
      setQuoteList(data.length)
      });
  }, []);

 function QuotesTotal(value){
   setQuoteList(value)
 }

  return (
    <div className="App">
      <Switch>
        <Route exact path= "/">
          <Quote quotesTotal = {quotesTotal}/>
        </Route>
        <Route path = "/liked">
          <Liked/>
        </Route>
      </Switch>
     <div className='attribution'>
      <h4>coded by <a href='https://github.com/Jeff-Maina' target="_blank">Jeff</a>.</h4>
     </div>
    </div>
  );
}

export default App;
