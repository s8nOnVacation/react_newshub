import React from "react";
import moment from 'moment';

function NewsArticle({ data }) {
    return (
        <div class="post">
            {data.article.media.main_image ? <div class="post__image post__image--1" style={{ backgroundImage: 'url(' + data.article.media.main_image + ')', backgroundSize: 'cover', backgroundPosition: 'center center' }}></div> : <div class="post__image post__image--1" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1510951459752-aac634df6e86?h=240&ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=50bdf8b5068e794a82c849cc7e269ed3)", backgroundSize: 'cover', backgroundPosition: 'center center' }}></div>}
            <div class="post__content">
                <div class="post__inside">
                    <h3 class="post__title">{data.article.title}</h3><br />
                    {data.article.author ? <h6 class="post__author">{data.article.author}<br />{moment(data.article.published).format("MMMM Do YYYY || h:mm:ss a")}</h6> : <h6 class="post__author">{moment(data.article.published).format("MMMM Do YYYY || h:mm:ss a")}</h6>}

                    <p class="post__excerpt">
                        {data.article.summary}
                    </p>

                    <h6 class="post__author fa fa-tag" style={{ marginBottom: "7%" }}>Tags:</h6>
                    {data.article.categories.map((tags) => (<p class="post__author" style={{ cursor: 'pointer', marginTop: '-5px' }}>{'>>>'}{tags.name}</p>))}

                    <button class="btn--accent post__button">
                        <a href={data.article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'inherit', color: 'inherit' }}>
                            Read more
                            <i class="fa fa-chevron-right"></i>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsArticle;