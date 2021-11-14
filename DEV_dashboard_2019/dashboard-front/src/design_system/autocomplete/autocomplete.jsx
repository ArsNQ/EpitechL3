import React, {cloneElement, useCallback, useEffect, useState} from 'react';
import {TextField} from "../text_field/text_field";
import {Dropdown} from "../dropdown/dropdown";
import cn from 'classnames';
import {createUseStyles} from 'react-jss';

import styles from './autocomplete_styles';

const useStyles = createUseStyles(styles);

const Autocomplete = ({position = {top: 100},animations = { y: -20, x: 0}, dropdownClassName, onChange, children, childrenRightInput,  ...props}) => {
    const classes = useStyles();
    const key = children.map((item)=> item.key);
    const [open,setOpen] = useState(false);
    const handleOnChange = useCallback((event) => {
        if (onChange) {
            onChange(event);
        }
    },[key]);


    useEffect(() => {
        if (key.length) return setOpen(true);
        return setOpen(false);
    },[JSON.stringify(key)]);
    return (
        <div className={classes.container}>
            <TextField
                onChange={handleOnChange}
                {...props}
            >
                {childrenRightInput}
            </TextField>
            <Dropdown
                open={open}
                onClose={()=> setOpen(false)}
                {...{position, animations}}
                className={cn(classes.dropdown,dropdownClassName)}
            >
                {React.Children.map(children, child =>
                    cloneElement(child, {
                        onClick: (event) => {
                            if (child.props?.onClick) {
                                child.props.onClick(event)
                            }
                            setOpen(false);
                        },
                    }))}
            </Dropdown>
        </div>
    )
};

export default Autocomplete;
