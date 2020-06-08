import React, { useContext, useState } from 'react';
import { SimpleSelect } from '../../elements';
import { AppContext } from '../../state/context';
import { InputLabel, Button } from '@material-ui/core';
import { colorOptions } from '../../consts';
import { updateAppData, updateCountryColor } from '../../state/actionCreators';
import './ColorPicker.css';

const colorPickerStyle = {
    width: 800,
    height: 600,
    backgroundColor: '#3B3B3D',
    marginTop: 40,
};

const ColorPicker = () => {
    const { state, dispatch } = useContext(AppContext);
    const [country, setCountry] = useState('');
    const [color, setColor] = useState('');

    const updateSelectedCountry = (value: string) => {
        setCountry(value);
    };

    const updateSelectedColor = (value: string) => {
        setColor(value);
    };

    const saveColor = () => {
        if (country && color) {
            const newCountry = state.appData.find((r) => r.name === country);
            if (newCountry) {
                newCountry.color = color;
                updateCountryColor(newCountry, dispatch);
            }
        }
    };

    return (
        <div id="ColorPickerContainer">
            <div id="ColorPickerHeader">Change Country Color</div>
            <div className="ColorDropdown">
                <InputLabel shrink id="CountryColorLabel">
                    Country
                </InputLabel>
                <SimpleSelect
                    labelId="CountryColorLabel"
                    className="ColorPickerSelect"
                    value={country}
                    onChange={updateSelectedCountry}
                    label={'Country'}
                    placeholder="Select Country"
                    options={state.countryOptions || []}
                />
            </div>
            <div className="ColorDropdown">
                <InputLabel shrink id="CountryColorChoiceLabel">
                    Color
                </InputLabel>
                <SimpleSelect
                    labelId="CountryColorChoiceLabel"
                    className="ColorPickerSelect"
                    value={color}
                    onChange={updateSelectedColor}
                    label={'Color'}
                    placeholder="Select Color"
                    options={colorOptions}
                />
            </div>
            <Button onClick={saveColor} className="SaveButton">
                Save
            </Button>
        </div>
    );
};

export default ColorPicker;
