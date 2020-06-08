import * as React from 'react';
import TabPanel from '../TabPanel/TabPanel';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<TabPanel index={0} value={0} />).toJSON();
    expect(tree).toMatchSnapshot();
});