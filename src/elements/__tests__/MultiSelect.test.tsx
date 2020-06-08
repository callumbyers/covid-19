import * as React from 'react';
import { MultiSelect } from '../MultiSelect/MultiSelect';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<MultiSelect options={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
});
