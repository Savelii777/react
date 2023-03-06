import React, {useState, memo, useCallback} from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import throttle from "lodash/throttle";
import ReactDOM from 'react-dom';
import axios from "axios";
import "../../style/login/list.css"



    const itemsCount = 1000;
    let items = {};
    let requestCache = {};
    let value = 0;
    let isClicked = false;
    const getUrl = (rows, start) =>
        `http://localhost:8080/lab4-1/api/auth/getLogin?rows=${rows}&start=${start}`;
const toggleExpand = (event) => {
    event.target.classList.toggle('expand')
    console.log(event.target)
};

    const Row = ({index, style}) => {
        const item = items[index];
        const [isItemDisplayed, setIsItemDisplayed] = useState(false);

        const handleElementClick = (event) => {
            if (!document.getElementById(`${index}.${index}`)){
                 fetch(
                    getUrl(index, index)
                )
                    .then(response => response.json())
                    .then(data => {
                        for (let i = 0; i < 10; i++) {
                            let h2 = document.createElement("h2");
                            h2.id = `${index}.${i}`
                            h2.className="head"
                            let text = document.createTextNode(`${index}.${data[i].number}`);
                            h2.appendChild(text);
                            let div = document.getElementById(`${index}`);
                            div.appendChild(h2);
                            // document.getElementById(`${index}`).textContent=`${index}.${data[i].number}: ${data[0].title}.${data[i].number}`
                        }
                    })
                    .catch(error => console.error("Error:", error));
            }
            setIsItemDisplayed(!isItemDisplayed);

        };
        if (index + 1 >= itemsCount) return null;

        return (
            <div   style={style}>
                <div onClick={handleElementClick}>
                    <div className="headerAndArrow">
                        <h2 className="head"> {item ? `${item.number}: ${item.title}` : "Loading..."}</h2>
                        <svg className="arrow" viewBox="0 0 20 20" width="20" height="20">
                            <path d={isClicked ? 'M2 14l8-8 8 8' : 'M2 6l8 8 8-8'}/>
                        </svg>
                        {isItemDisplayed && (
                                <div className="item" id={`${index}`}>
                                    <h2 className="head" > </h2>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };



    const isItemLoaded = ({index}) => !!items[index];

    const loadMoreItems = (visibleStartIndex, visibleStopIndex) => {
        console.log(visibleStartIndex)


        const key = [visibleStartIndex, visibleStopIndex].join(":"); // 0:10
        if (requestCache[key]) {
            return;
        }

        const length = visibleStopIndex+value - visibleStartIndex

        const visibleRange = [...Array(length).keys()].map(
            x => x + visibleStartIndex
        );
        const itemsRetrieved = visibleRange.every(index => !!items[index]);

        if (itemsRetrieved) {
            requestCache[key] = key;
            return;
        }

        return fetch(
            getUrl(length, visibleStartIndex)
        )
            .then(response => response.json())
            .then(data => {
                data.forEach((city, index) => {
                    items[index + visibleStartIndex] = city
                });
                value = value + 2;

            })
            .catch(error => console.error("Error:", error));
    };




    const loadMoreItemsThrottled = throttle(loadMoreItems, 100);
    export default () =>  (
        <AutoSizer className="container">
            {({height, width}) => (
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    loadMoreItems={loadMoreItemsThrottled}
                    itemCount={itemsCount}
                >
                    {({onItemsRendered, ref}) => (
                        <List
                            className="leaderboard__profiles"
                            height={height}
                            itemCount={itemsCount}
                            itemSize={50}
                            width={width}
                            ref={ref}
                            onItemsRendered={onItemsRendered}
                        >
                            {Row}
                        </List>
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    );
