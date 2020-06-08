import React, { useEffect, useContext } from 'react';
import Dashboard from './Dashboard';
import { timeSeriesUrl } from '../../consts';
import { AppContext } from '../../state/context';
import { Country, CountryDataPoint } from '../../interfaces';
import {
    updateStartDate,
    updateEndDate,
    updateMinDate,
    updateMaxDate,
    updateCountryOptions,
    updateAppData,
} from '../../state/actionCreators';

interface InitialData {
    [key: string]: CountryDataPoint[];
}

const mapData = (dataObject: InitialData) => {
    const keys: string[] = Object.keys(dataObject);
    const appData: Country[] = [];

    for (const k of keys) {
        appData.push({
            name: k,
            data: dataObject[k]
                .map((d: any) => ({
                    date: new Date(d.date),
                    confirmed: d.confirmed,
                }))
                .sort((a, b) => (a.date < b.date ? -1 : 1)),
            total: dataObject[k].reduce((sum, current) => sum + current.confirmed, 0),
            color: null,
        });
    }
    return appData;
};

const DashboardContainer = () => {
    const { state, dispatch } = useContext(AppContext);
    useEffect(() => {
        const fetchData = (url: string) => {
            fetch(url)
                .then((res: any) => res.json())
                .then((data: any) => {
                    const dataArray: Country[] = mapData(data);
                    const options: string[] = Object.keys(data);

                    const l = dataArray[0].data.length;
                    const startDate = dataArray[0].data[0].date;
                    const endDate = dataArray[0].data[l - 1].date;

                    updateStartDate(new Date(startDate), dispatch);
                    updateMinDate(new Date(startDate), dispatch);
                    updateEndDate(new Date(endDate), dispatch);
                    updateMaxDate(new Date(endDate), dispatch);
                    updateCountryOptions(options, dispatch);
                    updateAppData(dataArray, dispatch);
                })
                .catch(() => {
                    throw new Error('Error fetching data');
                });
        };

        fetchData(timeSeriesUrl);
    }, []);

    return <Dashboard />;
};

export default DashboardContainer;
