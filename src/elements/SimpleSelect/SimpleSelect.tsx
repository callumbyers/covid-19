import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        customSelect: {
            color: 'white',
            width: '100%',
            borderBottom: '1px #AD8175 solid',
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
            whiteSpace: 'unset',
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

export const SimpleSelect = (props: any) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);

        if (props.onChange) {
            props.onChange(event.target.value);
        }
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select
                    labelId="SingleSelectLabel"
                    id="SingleSelectInput"
                    value={value}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                    className={classes.customSelect}
                >
                    {props.options.map((option: string, i: number) => (
                        <MenuItem style={{ color: option }} key={`country-option-${i}`} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};
