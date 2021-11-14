import React, {useCallback, useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';
import wiki from 'wikijs';

import style from './wiki_styles';
import {Card} from "../../../design_system/card/card";
import {CloseCircleFilled} from "@ant-design/icons";
import Autocomplete from "../../../design_system/autocomplete/autocomplete";
import {debounce} from "lodash";
import {autocompleteWiki} from "../../../actions/wiki";
import {Component} from "./config";

const useStyles = createUseStyles(style);

const Wiki = () => {
    const classes = useStyles();
    const [search, setsearch] = useState(null);
    const [wikiSearchReturn, setwikiSearchReturn] = useState([]);
    const [displayResult, setdisplayResult] = useState([]);

    const useWikiSearchEngine = (e) => {
        e.preventDefault();

        setwikiSearchReturn([]);

        const pointerToThis = this;

        var url = "https://en.wikipedia.org/w/api.php";

        var params = {
            action: 'query',
            list: 'search',
            srsearch: search,
            format: 'json'
        };

        url = url + '?origin=*';
        Object.keys(params).forEach((key) => {
            url += "&" + key + "=" + params[key];
        });

        fetch(url)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (response) {
                    console.log("response", response);
                    // console.log(response);
                    let tmp = [];
                    for (var key in response.query.search) {
                        tmp.push({
                            queryResultPageFullURL: `https://fr.wikipedia.org/wiki/${response.query.search[key].title}`,
                            queryResultPageID: response.query.search[key].pageid,
                            queryResultPageTitle: response.query.search[key].title,
                            queryResultPageSnippet: response.query.search[key].snippet
                        });
                    }
                    setwikiSearchReturn(tmp);
                }
            )
            .then(
                function (response) {
                    for (var key2 in wikiSearchReturn) {
                        // console.log(pointerToThis.state.wikiSearchReturnValues);
                        let page = wikiSearchReturn[key2];
                        let pageID = page.queryResultPageID;
                        let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;
                        console.log("url", urlForRetrievingPageURLByPageID);
                        fetch(urlForRetrievingPageURLByPageID)
                            .then(
                                function (response) {
                                    return response.json();
                                }
                            )
                            .then(
                                function (response) {
                                    page.queryResultPageFullURL = response.query.pages[pageID].fullurl;
                                    if (pointerToThis){
                                        pointerToThis.forceUpdate();
                                    }
                                }
                            )
                    }
                }
            )
    };

    useEffect(() => {
        let tmp = [];
        console.log(wikiSearchReturn);
        for (var key3 in wikiSearchReturn) {
            tmp.push(
                <div className={classes.searchResultDiv} key={key3}>
                    <h3><a href={wikiSearchReturn[key3].queryResultPageFullURL}>{wikiSearchReturn[key3].queryResultPageTitle}</a></h3>
                    <span className='link'>
                        <div className={classes.myText}>Article here :</div>
                        <a target={"_blank"} href={wikiSearchReturn[key3].queryResultPageFullURL}>{wikiSearchReturn[key3].queryResultPageFullURL}</a></span>
                    <div className={classes.searchResultDiv}><div className={classes.myText}>Description :</div>
                        <p className={classes.description} dangerouslySetInnerHTML={{__html: wikiSearchReturn[key3].queryResultPageSnippet}}></p>
                    </div>
                    <div className={classes.MiddleLine}></div>
                </div>
            );
        }
        setdisplayResult(tmp);
    }, [wikiSearchReturn]);

    return (
        <Card className={classes.container}>
            <h2>Wikipedia</h2>
            <form action="">
                <input className={classes.searchBar} type="text" value={search || ''} onChange={e => setsearch(e.target.value)} placeholder='Search Wikipedia Articles' />
                <button className={classes.btnSearch} type='submit' onClick={useWikiSearchEngine}>Search</button>
            </form>
            {displayResult}
        </Card>
    )
};

export default Wiki;
