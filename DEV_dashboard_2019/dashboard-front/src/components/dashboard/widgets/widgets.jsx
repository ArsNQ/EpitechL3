import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {getWidgets} from "../config";
import styles from './widgets_styles';
import { Responsive as ResponsiveReactGridLayout  } from 'react-grid-layout';
import {createUseStyles} from "react-jss";
import {useWindowSize} from "../../../hooks/useWindowSize";
import GoogleMapWidget from '../../googleMap/GoogleMapWidget/myGoogleWidget';

const useStyles = createUseStyles(styles);


const Widgets = ({match : {params}}) => {
    const category = params.id;
    const classes = useStyles();
    const [width] = useWindowSize();
    const containerRef = useRef(null);
    const service = useSelector(store => store.service);
    const { services : categoryServices } = useSelector(store => store.dashboard[category] || []);
    const widgets = getWidgets(categoryServices, service);
    const defaultLayout = getFromLS(`layout-${category}`) || {};

    const onLayoutChange = useCallback((layouts)=>  {
        const isInitialise = layouts.reduce((acc,item) => {
            if (item.x > 0 || acc === true) return true;
            return false;
        },false);
        if (!isInitialise) return;
            const layoutsObj = layouts.reduce((acc,val) => {

                return({
                    ...acc,
                    [val.i] : {
                        ...val
                    }
                })
            },{});
            return saveToLS(`layout-${category}`, layoutsObj);
    },[category]);

    return(
        <div className={classes.container} ref={containerRef} >
                <ResponsiveReactGridLayout
                                      verticalCompact
                                      layouts={defaultLayout}
                                      onLayoutChange={onLayoutChange}
                                      width={width - 350}
                                      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                      cols={{lg: 14, md: 10, sm: 6, xs: 4, xxs: 2}}>
                    {
                        widgets.map(({Component, data, layout, service}) => {
                            const id = `${service}-${data?.code}`;
                            return(
                                <div key={id} data-grid={defaultLayout[id] || layout}>
                                    <Component {...{data}}  />
                                </div>
                            );
                        })
                    }
                </ResponsiveReactGridLayout>
        </div>
    )
};

export default Widgets;

function getFromLS(key) {
    let res = {};
    if (global.localStorage) {
        try {
            res = JSON.parse(global.localStorage.getItem(key))

        } catch (e) {
        }
    }
    return res;
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    }
}
