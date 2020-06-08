import React from 'react';
import { TimeSeriesPlot } from '../../components';
import { Tabs, Tab } from '@material-ui/core';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div id="Dashboard">
            <h1 className="Header">Covid-19 Active Cases</h1>
            <TimeSeriesPlot />
        </div>
    );
};

export default Dashboard;
