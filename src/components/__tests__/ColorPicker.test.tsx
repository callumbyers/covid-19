import * as React from 'react';
import ColorPicker from '../ColorPicker/ColorPicker';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(<ColorPicker />).toJSON();
    expect(tree).toMatchSnapshot();
});
