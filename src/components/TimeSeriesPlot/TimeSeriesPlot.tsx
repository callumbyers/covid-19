import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Tabs, Tab } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { TimeSeriesPlotHighChart, ColorPicker, DataGrid } from '../../components';
import { AppContext } from '../../state/context';
import { MultiSelect, TabPanel } from '../../elements';
import { updateStartDate, updateEndDate, updateSelectedCountries } from '../../state/actionCreators';
import { Country, CountryDataPoint } from '../../interfaces';

import 'react-datepicker/dist/react-datepicker.css';
import './TimeSeriesPlot.css';

const TimeSeriesPlot = () => {
    const { state, dispatch } = useContext(AppContext);
    const [selectedTab, setSelectedTab] = useState(0);
    const [startIndex, setStartIndex] = useState(-1);
    const [endIndex, setEndIndex] = useState(-1);

    const updateSelected = (val: any) => {
        const selectedCountries = val.map((v: Country) => state.appData.find((a: any) => a.name == v));
        updateSelectedCountries(selectedCountries, dispatch);
    };

    const checkValidStartDate = (start: Date) => {
        const lessThanMax = start < state.maxDate;
        const lessThanEnd = start < state.endDate;
        const greaterThanEqualMin = start >= state.minDate;

        return lessThanEnd && lessThanMax && greaterThanEqualMin;
    };

    const checkValidEndDate = (end: Date) => {
        const greaterThanMin = end > state.minDate;
        const greaterThanStart = end > state.startDate;
        const lessThanEqualMax = end <= state.maxDate;

        return greaterThanMin && greaterThanStart && lessThanEqualMax;
    };

    const startDateOnChange = (start: Date) => {
        const valid = checkValidStartDate(start);
        if (valid) {
            updateStartDate(start, dispatch);
            setDateRangeIndices(start, state.endDate);
        }
    };

    const endDateOnChange = (end: Date) => {
        const valid = checkValidEndDate(end);
        if (valid) {
            updateEndDate(end, dispatch);
            setDateRangeIndices(state.startDate, end);
        }
    };

    const setDateRangeIndices = (start: Date, end: Date) => {
        const { data } = state.appData[0];
        const s = data.find((d: CountryDataPoint) =>
            moment(d.date).startOf('day').isSame(moment(start).startOf('day')),
        );
        const e = data.find((d: CountryDataPoint) => moment(d.date).startOf('day').isSame(moment(end).startOf('day')));

        if (s && e) {
            const si = data.indexOf(s);
            const ei = data.indexOf(e);

            setStartIndex(si);
            setEndIndex(ei);
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <div id="TimeSeriesPlot">
            <div className="Menu">
                <InputLabel id="DatePickerLabel">Select Date Range</InputLabel>
                <div id="DatePickers">
                    <DatePicker
                        onChange={(e: Date) => startDateOnChange(e)}
                        selected={state.startDate}
                        className="DatePicker"
                        placeholderText="Select start date"
                    />
                    <DatePicker
                        onChange={(e: Date) => endDateOnChange(e)}
                        selected={state.endDate}
                        className="DatePicker"
                        placeholderText="Select end date"
                    />
                </div>
                <div id="CountrySelectContainer">
                    <InputLabel id="CountrySelectLabel">Select Countries</InputLabel>
                    <MultiSelect
                        value={state.selectedCountries}
                        label={'Country'}
                        placeholder="Select Country"
                        options={state.countryOptions || []}
                        onChange={updateSelected}
                    />
                </div>
            </div>
            <div id="Main">
                <Tabs onChange={handleTabChange} className="Tabs" value={selectedTab}>
                    <Tab className="Tab" label="Plot" />
                    <Tab className="Tab" label="Colors" />
                </Tabs>
                <TabPanel index={selectedTab} value={0}>
                    <TimeSeriesPlotHighChart
                        appData={state.appData}
                        startDate={state.startDate}
                        endDate={state.endDate}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        selectedCountries={state.selectedCountries}
                    />
                    <DataGrid
                        selectedCountries={state.selectedCountries}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        startDate={state.startDate}
                        endDate={state.endDate}
                        defaultColors={state.defaultColors}
                    />
                </TabPanel>
                <TabPanel index={selectedTab} value={1}>
                    <ColorPicker />
                </TabPanel>
            </div>
        </div>
    );
};

export default TimeSeriesPlot;
