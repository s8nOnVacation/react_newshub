import React, { createContext, useEffect, useState } from "react";
import moment from 'moment'

export const NewsContext = createContext();

export const NewsContextProvider = (props) => {
  const [updates, setNewupdates] = useState([]);

  const [search, setSearchQuery] = useState();
  const [date, setDateQuery] = useState();

  const [url, setUrl] = useState("https://webhose.io/nseFilter?token=e26b4fce-afbf-4232-b9e3-e6d99e5b597d&format=json&size=21&article.language:english site.type%3Anews");

  const findnews = async () => {
    const response = await fetch(url)
    const result = await response.json()
    console.log(result.docs)
    setNewupdates(result.docs)
  }

  useEffect(() => {
    findnews()
  }, [url])

  const makeChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const makeChangeDate = (e) => {
    setDateQuery(e.target.value)
  }

  const handleinput = (e) => {
    e.preventDefault()
    console.log(moment(date).valueOf())
    if (moment(date).valueOf() < moment().valueOf()) { setUrl(`https://webhose.io/nseFilter?token=e26b4fce-afbf-4232-b9e3-e6d99e5b597d&format=json&size=21&q=${search} published:>${moment(date).valueOf()} article.language:english site.type%3Anews`) }
    else { setUrl(`https://webhose.io/nseFilter?token=e26b4fce-afbf-4232-b9e3-e6d99e5b597d&format=json&size=21&q=${search} article.language:english site.type%3Anews`) }
  }

  function topnews(e) {
    setUrl(`https://webhose.io/nseFilter?token=e26b4fce-afbf-4232-b9e3-e6d99e5b597d&format=json&size=21&q=${e} article.language:english site.type%3Anews`)
  }

  function pagerefresh() {
    setUrl("https://webhose.io/nseFilter?token=e26b4fce-afbf-4232-b9e3-e6d99e5b597d&format=json&size=21&article.language:english site.type%3Anews")
  }

  function slideshow() {
    var x = document.getElementById("check-class");
    if (x.style.display === "block"){
      x.style.display = "none";
      x.style.margin = "2rem auto";
      x.style.right = "2rem";
    } else {
      x.style.display = "block";
    }
  }

  if (Object.keys(updates).length > 0) {

    return (
      <React.Fragment>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="App">
          <h2 className="head__text"><a href="#" title="Go to Newshub Homepage" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => pagerefresh()}>NewsHub</a></h2>
          <a href="javascript:void(0);" className="mobile-icon" onClick={slideshow}> <i className="fa fa-bars"></i> </a>
          <div className="row clearfix">
            <ul className="main-nav animated slideInDown button__burger" id="check-class">
              <li><a href="#finance" onClick={() => topnews("finance")}>Finance</a></li>
              <li><a href="#politics" onClick={() => topnews("politics")}>Politics</a></li>
              <li><a href="#technology" onClick={() => topnews("technology")}>Technology</a></li>
              <li><a href="#sports" onClick={() => topnews("sports")}>Sports</a></li>
              <li><a href="#bollywood" onClick={() => topnews("bollywood")}>Bollywood</a></li>
            </ul>
          </div>
        </div>

        <form className="form" onSubmit={handleinput}>
          <input type="search" placeholder="Search..." title="Enter your search text" value={search} onChange={makeChange} />
          <input type="date" id="start" title="Select the starting date for the news to be displayed. The news will be automatically sorted according to relevancy." name="trip-start" value={date} onChange={makeChangeDate} min="2020-01-01" max={moment().format("YYYY-MM-DD")} />
          <button className="buttonsearch fa fa-search"> SEARCH</button>
        </form>

        <NewsContext.Provider value={{ updates }}>
          {props.children}
        </NewsContext.Provider>
      </React.Fragment>
    );
  }
  else return (<NewsContext.Provider value={{ updates }}>
    {props.children}
  </NewsContext.Provider>
  )
}
