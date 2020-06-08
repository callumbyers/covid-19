import React, { useEffect, useContext } from 'react';
import * as HighCharts from 'highcharts';
import { ChartProps, CountryDataPoint } from '../../interfaces';
import { Country } from '../../interfaces';
import { updateDefaultColors } from '../../state/actionCreators';
import { AppContext } from '../../state/context';
import darkUnica from 'highcharts/themes/dark-unica';
import './TimeSeriesHighChart.css';

darkUnica(HighCharts);

const TimeSeriesHighChart = ({ appData, startDate, endDate, startIndex, endIndex, selectedCountries }: ChartProps) => {
    const { state, dispatch } = useContext(AppContext);

    const getDataToDisplay = (dataArray: any) => {
        if (startIndex > -1 && endIndex > -1) {
            return dataArray
                .slice(startIndex, endIndex + 1)
                .map((d: CountryDataPoint) => [d.date.getTime(), d.confirmed]);
        } else {
            return dataArray.map((d: CountryDataPoint) => [d.date.getTime(), d.confirmed]);
        }
    };

    useEffect(() => {
        const chart = HighCharts.chart('highchart-component', {
            title: {
                text: 'Active Covid-19 Cases by Country',
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Month',
                },
            },
            yAxis: {
                title: {
                    text: 'Number of cases',
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
            },
            series:
                selectedCountries &&
                selectedCountries.map((s: Country) => {
                    return {
                        name: s.name,
                        color: s.color,
                        data: getDataToDisplay(s.data),
                        type: 'line',
                    };
                }),
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 800,
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom',
                            },
                        },
                    },
                ],
            },
        });

        updateDefaultColors(chart.options.colors, dispatch);

        chart.reflow();
    }, [appData, selectedCountries, startDate, endDate, startIndex, endIndex]);

    return <div id="highchart-component" />;
};

export default TimeSeriesHighChart;
