import React, { useState, useEffect } from 'react'
import Collapsible from 'react-collapsible'
import './NewsCard.css'

const NewsCard = () => {

    const [newsType] = useState('apple')
    const [lang, setNewLang] = useState('en')
    const [newsArr, setNewsArr] = useState([])


    const handleChange = (newValue) => {
        setNewLang(newValue)
    }

    useEffect(() => {
        console.log("..content rerendered..");

        fetch(`https://newsapi.org/v2/everything?q=${newsType}&language=${lang}&sortBy=popularity&apiKey=`)
            .then(response => response.json())
            .then(json => {
                console.log(json.articles);
                setNewsArr(json.articles)
            })

    }, [newsType, lang])

    return (
        <>
            <section>
<h2>..the latest Apple News.. </h2>
                <article className="middle">
                    <select name="" id="language" onChange={(e) => handleChange(e.target.value)} value={lang} >
                        <option value='de' >German</option>
                        <option value='en'>English</option>
                        <option value='fr'>French</option>
                    </select>
                </article>

                <div className="flex">
                    {newsArr.map((items) => (

                        <article className="cards">

                            <img src={items.urlToImage} onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "";
                            }} alt="pic" />

                            <h1>{items.title}</h1>

                            <Collapsible trigger="..more..">
                                <p>{items.description.slice(0, 150)}</p>
                                <p>{items.publishedAt}</p>
                                <a href={items.url} target="_blank" rel="noreferrer">Read more</a>
                            </Collapsible>

                        </article >
                    ))}
                </div>
            </section>
        </>
    )
}

export default NewsCard
