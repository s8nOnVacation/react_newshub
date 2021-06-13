
import React, { useContext } from "react";
import { NewsContext } from "./NewsContext";
import NewsArticle from "./NewsArticle";
import $ from 'jquery';

function News(props) {
    const { updates } = useContext(NewsContext);

    if (Object.keys(updates).length > 0) {
        return (
            <div className="posts">
                {updates.map((news) => (
                    <NewsArticle data={news} key={news.article.url} />
                ))}
            </div>
        );
    }
    else {
        return (
            <div id="root">
                <div className="background">
                    <h1 className="open-sans tera ls-xlarge bold">NEWSHUB<br />
                        <span className="epsilon ls-medium">BECAUSE GK IS IMPORTANT</span><br /><br />
                        <span className="loader"><span className="loader-inner"></span></span>
                    </h1>
                </div>
                {window.addEventListener("load", function () { $(".wrapper").fadeOut("slow") })}
            </div>
        );
    }
}

export default News;