import { IState, Country, CountryOption } from '../interfaces';

export enum Types {
    updateStartDate = 'UPDATE_START_DATE',
    updateEndDate = 'UPDATE_END_DATE',
    updateAppData = 'UPDATE_APP_DATA',
    updateSelectedCountry = 'UPDATE_SELECTED_COUNTRY',
    updateSelectedCountries = 'UPDATE_SELECTED_COUNTRIES',
    updateCountryOptions = 'UPDATE_COUNTRY_OPTIONS',
    updateMinDate = 'UPDATE_MIN_DATE',
    updateMaxDate = 'UPDATE_MAX_DATE',
    updateCountryColor = 'UPDATE_COUNTRY_COLOR',
    updateDefaultColors = 'UPDATE_DEFAULT_COLORS',
}

type AppPayload = {
    [Types.updateStartDate]: Date;
    [Types.updateEndDate]: Date;
    [Types.updateAppData]: Country[];
    [Types.updateSelectedCountry]: Country;
    [Types.updateSelectedCountries]: Country[];
    [Types.updateCountryOptions]: CountryOption[];
    [Types.updateMinDate]: Date;
    [Types.updateMaxDate]: Date;
    [Types.updateCountryColor]: Country;
    [Types.updateDefaultColors]: any[];
};

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: any;
          };
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const appReducer = (state: IState, action: AppActions) => {
    const { type, payload } = action;

    switch (type) {
        case Types.updateAppData:
            return Object.assign({}, state, {
                appData: payload,
            });
        case Types.updateSelectedCountry:
            return Object.assign({}, state, {
                selectedCountry: state.appData.find((c: any) => c.name === payload),
            });
        case Types.updateSelectedCountries:
            return Object.assign({}, state, {
                selectedCountries: payload,
            });
        case Types.updateMinDate:
            return Object.assign({}, state, {
                minDate: payload,
            });
        case Types.updateMaxDate:
            return Object.assign({}, state, {
                maxDate: payload,
            });
        case Types.updateStartDate:
            return Object.assign({}, state, {
                startDate: payload,
            });
        case Types.updateEndDate:
            return Object.assign({}, state, {
                endDate: payload,
            });
        case Types.updateCountryOptions:
            return Object.assign({}, state, {
                countryOptions: payload,
            });
        case Types.updateCountryColor:
            const filtered = state.appData.filter((a: any) => a.name !== payload.name);
            return Object.assign({}, state, {
                appData: [payload, ...filtered],
            });
        case Types.updateDefaultColors:
            return Object.assign({}, state, {
                defaultColors: payload,
            });
        default:
            return state;
    }
};
