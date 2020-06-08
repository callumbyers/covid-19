import React, { createContext, useReducer } from 'react';
import { appReducer } from './reducers';
import { IState, CountryOption } from '../interfaces';

const initialState: IState = {
    appData: [],
    minDate: new Date(),
    maxDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    selectedCountry: null,
    selectedCountries: [],
    countryOptions: null,
    defaultColors: [],
};

const AppContext = createContext<{ state: IState; dispatch: React.Dispatch<any> }>({
    state: initialState,
    dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
