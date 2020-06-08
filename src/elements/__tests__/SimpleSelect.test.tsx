import * as React from 'react';
import { SimpleSelect } from '../SimpleSelect/SimpleSelect';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<SimpleSelect options={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
});
