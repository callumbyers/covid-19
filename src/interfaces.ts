export interface CountryDataPoint {
    date: Date;
    confirmed: number;
}

export interface Country {
    name: string;
    data: CountryDataPoint[];
    total: number;
    color: any;
}

export interface CountryOption {
    name: string;
}

export interface IState {
    appData: Country[];
    selectedCountry: Country | null;
    selectedCountries: Country[];
    minDate: Date;
    maxDate: Date;
    startDate: Date;
    endDate: Date;
    countryOptions: CountryOption | null;
    defaultColors: any[];
}

export interface ChartProps {
    appData: Country[];
    startDate: Date;
    endDate: Date;
    selected?: Country | null;
    selectedCountries: Country[];
    startIndex: number;
    endIndex: number;
}

export interface GridProps {
    selectedCountries: Country[];
    startIndex: number;
    endIndex: number;
    startDate: Date;
    endDate: Date;
    defaultColors: any[];
}

export interface DataGridColumn {
    key: string;
    name: string;
    formatter: any;
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
