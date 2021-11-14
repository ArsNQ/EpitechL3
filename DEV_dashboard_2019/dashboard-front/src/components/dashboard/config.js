import Weather from "../widgets/weather/weather";
import News from "../widgets/news/news";
import Spotify from "../widgets/spotify/spotify";
import Wiki from "../widgets/wiki/wiki";
import GoogleMapWidget from "../googleMap/GoogleMapWidget/myGoogleWidget";


const dashboardConfig = {
    weather: {
        component: Weather,
        dataPath: 'locations',
        isArray: true,
        layout: {
            x: 0, y: 0, w: 4, h:2
        }
    },
    news: {
        component: News,
        dataPath: 'locations',
        isArray: true,
        layout: {
            x: 0, y: 0, w: 3, h:4
        }
    },
    spotify: {
        component: Spotify,
        dataPath: 'config',
        layout: {
            x: 0, y: 0, w: 4, h:1
        }
    },
    wikipedia: {
        component: Wiki,
        dataPath: 'config',
        layout: {
            x: 0, y: 0, w: 4, h:4
        }
    },
    googleMap: {
        component: GoogleMapWidget,
        dataPath: 'config',
        layout: {
            x: 0, y: 0, w: 4, h:2
        }
    },
};


export const getWidgets = ( categoryServices, allService ) => {
    if (!categoryServices || !allService) return [];
    let widgets = [];
    categoryServices.forEach((service) => {
        const serviceConfig = dashboardConfig[service];
        if(serviceConfig) {
            if (serviceConfig.isArray) {
                allService[service][serviceConfig.dataPath].forEach((widget) => {
                    widgets = [...widgets, {
                        Component: serviceConfig.component,
                        data: widget,
                        layout: serviceConfig.layout,
                        service
                    }]
                });
            } else {
                widgets = [...widgets, {
                    Component: serviceConfig.component,
                    layout: serviceConfig.layout,
                    service
                }]
            }
        }
    });

    return widgets;
};
