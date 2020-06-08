import * as React from 'react';
import TimeSeriesPlotHighChart from '../TimeSeriesPlotHighChart/TimeSeriesHighChart';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(
            <TimeSeriesPlotHighChart
                appData={[]}
                startDate={new Date()}
                endDate={new Date()}
                selectedCountries={[]}
                startIndex={-1}
                endIndex={-1}
            />,
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
