import React, { useEffect, useState } from 'react';
import ReactDataGrid from 'react-data-grid';
import { GridProps, DataGridColumn, CountryDataPoint, Country } from '../../interfaces';
import moment from 'moment';
import './DataGrid.css';

const DataGrid = ({ selectedCountries = [], startIndex, endIndex, startDate, endDate, defaultColors }: GridProps) => {
    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<any[]>([]);

    const CustomDataColumnRenderer = (color: any, value: any, i: number) => {
        let colorToDisplay = color || '#000000';

        if (!color) {
            const defaultColorIndex = i % selectedCountries.length;
            colorToDisplay = defaultColors[defaultColorIndex];
        }

        const customStyle = {
            color: colorToDisplay || 'black',
            fontFamily: 'Unica One, sans-serif',
        };

        return <div style={customStyle}>{value}</div>;
    };

    const CustomDateColumnRenderer = (value: any) => {
        const customStyle = {
            fontFamily: 'Unica One, sans-serif',
        };

        return <div style={customStyle}>{value}</div>;
    };

    const setGridColumns = () => {
        let columns: DataGridColumn[] = [];

        if (selectedCountries.length > 0) {
            columns = [
                {
                    key: 'date',
                    name: 'Date',
                    formatter: (e: any) => CustomDateColumnRenderer(e.value),
                },
                ...selectedCountries.map((c: Country, i: number) => ({
                    key: `${c.name}`,
                    name: `${c.name}`,
                    formatter: (e: any) => CustomDataColumnRenderer(c.color, e.value, i),
                })),
            ];
        }
        setColumns(columns);
    };

    const setGridRows = async () => {
        const newRows: any[] = [];
        let start = moment(startDate);
        const end = moment(endDate);

        while (start.isSameOrBefore(end)) {
            const dateObj: any = {
                date: start.format('MM/DD/YYYY'),
                isEditorEnabled: false,
            };

            selectedCountries.forEach((country: Country) => {
                const dataPoint = country.data.find((d: CountryDataPoint) =>
                    moment(d.date).startOf('day').isSame(start.startOf('day')),
                );
                if (dataPoint) {
                    dateObj[country.name] = dataPoint.confirmed;
                }
            });

            newRows.push(dateObj);

            start = start.add('1', 'day');
        }

        setRows(newRows.sort((a, b) => (a.date < b.date ? 1 : -1)));
        
    };

    useEffect(() => {
        setGridColumns();
        setGridRows();
    }, [selectedCountries, startIndex, endIndex]);

    const CustomRowRenderer = ({ renderBaseRow, ...props }: any) => {
        return renderBaseRow({ ...props, height: 40 });
    };

    return (
        <div id="ReactDataGridContainer">
            <ReactDataGrid
                columns={columns}
                rowGetter={(i) => rows[i]}
                rowsCount={rows.length}
                minHeight={500}
                rowRenderer={CustomRowRenderer}
            />
        </div>
    );
};

export default DataGrid;
