import React, {cloneElement, useCallback, useEffect, useState} from 'react';
import {TextField} from "../text_field/text_field";
import {Dropdown} from "../dropdown/dropdown";
import cn from 'classnames';
import {createUseStyles} from 'react-jss';

import styles from './select_styles';
import {CaretDownOutlined } from "@ant-design/icons";

const useStyles = createUseStyles(styles);

const Select = ({position = {top: 100},animations = { y: -20, x: 0}, dropdownClassName,className, inputClassName, onChange, children, childrenRightInput,  ...props}) => {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const handleOnChange = useCallback((event) => {
        if (onChange) {
            onChange(event);
        }
    },[]);



    return (
        <div className={classes.container}>
            <TextField
                onChange={handleOnChange}
                onClick={()=> setOpen(true)}
                className={cn(className, classes.cursor)}
                inputClassName={cn(inputClassName, classes.cursor)}
                readOnly
                {...props}
            >
                    <CaretDownOutlined  onClick={()=> setOpen(true)} style={{fontSize: 18, color: '#bbb', marginRight: 10}}/>
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

export default Select;
