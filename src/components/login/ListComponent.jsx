import React, { useState, useEffect, useRef } from 'react';
import "../../style/login/list.css"
import {items} from "../../utils/const/listConst"
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import axios from "axios";
import {useInView} from 'react-intersection-observer';


export function LazyList() {

    const [value, setValue] = useState(1);


    const lastItemRef = useRef(null);

    // const {ref, inView} = useInView({
    //     threshold: 0.1,
    // })
    // console.log(inView)
    // Обработчик вызываемый IntersectionObserver-ом при пересечении элемента
    const handleIntersection = (entries, observer) => {
        // Элемент последний в списке при совпадении высоты скролла и высоты контейнера списка
        if (entries[0].isIntersecting) {
            // Вызываем функцию прокрутки к последнему элементу
            items.onLastItemVisible();

        }
    };

    // Создание объекта IntersectionObserver и привязка его к последнему элементу списка
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection);
        if (lastItemRef.current) {
            observer.observe(lastItemRef.current);
        }

        // Очистка IntersectionObserver-а при удалении компонента
        return () => {
            observer.disconnect();
        };
    }, [lastItemRef]);


    const fetchData = () => {

            axios.get(`http://localhost:8080/lab4-1/api/auth/getLogin?value=` + value)
                .then(res => {
                    items.splice(0, items.length, ...res.data)
                    setValue(value + 5);
                })


        console.log(items)
    };

function HierarchicalListItem({title, children}) {
        const [expanded, setExpanded] = useState(false);
        const [isExpanded, setIsExpanded] = useState(false);
        const toggleExpand = () => {
            setExpanded(!expanded);
            setIsExpanded(!isExpanded);
        };

        return (
            <li className={expanded ? 'expanded' : 'leaderboard__profile'}>
                <div onClick={toggleExpand}>
                    <div className="headerAndArrow">
                        <h2>{title}</h2>
                        <svg className="arrow" viewBox="0 0 20 20" width="20" height="20">
                            <path d={isExpanded ? 'M2 14l8-8 8 8' : 'M2 6l8 8 8-8'}/>
                        </svg>
                    </div>
                    {children && (
                        true
                    )}
                </div>
                {expanded && children && (
                    <ul>
                        {children.map((child, index) => {
                                    <HierarchicalListItem key={index} title={child.title} children={child.children}
                                                          ref={lastItemRef}/>
                        })}
                    </ul>
                )}
            </li>
        );
    }



    return (

                        <>
                            {items.map((item, index) => (

                                    <HierarchicalListItem key={index} title={item.title} children={item.children}/>


                            ))}

                        </>


    );

}
