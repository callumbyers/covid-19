import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './MultiSelect.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        customSelect: {
            color: 'white',
            width: '100%',
            borderBottom: '1px #AD8175 solid',
            whiteSpace: 'unset',
            fontSize: '14pt',
        },
        multiNameLabel: {
            color: '#757575',
            fontSize: '14pt',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
            maxWidth: 500,
            color: 'white',
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

export const MultiSelect = (props: any) => {
    const classes = useStyles();
    const theme = useTheme();
    const [name, setName] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        event.preventDefault();
        setName(event.target.value as string[]);

        if (props.onChange) {
            props.onChange(event.target.value as string[]);
        }
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="MultiNameLabel"
                    id="MultiSelectInput"
                    multiple
                    value={name}
                    onChange={handleChange}
                    input={<Input />}
                    placeholder={props.placeholder}
                    className={classes.customSelect}
                >
                    {props.options.map((option: any, i: number) => (
                        <MenuItem key={`country-option-${i}`} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
