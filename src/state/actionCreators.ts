import { Types } from './reducers';
import { Country } from '../interfaces';

export const updateStartDate = (startDate: Date, dispatch: any) =>
    dispatch({
        type: Types.updateStartDate,
        payload: startDate,
    });

export const updateMinDate = (minDate: Date, dispatch: any) =>
    dispatch({
        type: Types.updateMinDate,
        payload: minDate,
    });

export const updateEndDate = (endDate: Date, dispatch: any) =>
    dispatch({
        type: Types.updateEndDate,
        payload: endDate,
    });

export const updateMaxDate = (maxDate: Date, dispatch: any) => {
    dispatch({
        type: Types.updateMaxDate,
        payload: maxDate,
    });
};

export const updateCountryOptions = (options: any, dispatch: any) =>
    dispatch({
        type: Types.updateCountryOptions,
        payload: options,
    });

export const updateAppData = (dataArray: any, dispatch: any) => {
    dispatch({
        type: Types.updateAppData,
        payload: dataArray,
    });
};

export const updateSelectedCountries = (dataArray: any, dispatch: any) =>
    dispatch({
        type: Types.updateSelectedCountries,
        payload: dataArray,
    });

export const updateCountryColor = (country: Country, dispatch: any) => {
    dispatch({
        type: Types.updateCountryColor,
        payload: country,
    });
};

export const updateDefaultColors = (colors: any, dispatch: any) =>
    dispatch({
        type: Types.updateDefaultColors,
        payload: colors,
});
