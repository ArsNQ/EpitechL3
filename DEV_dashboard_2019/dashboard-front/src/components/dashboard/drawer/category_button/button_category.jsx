import React from 'react';
import style from './button_category_styles';
import {createUseStyles} from "react-jss";
import {ButtonSystem} from "../../../../design_system/button_system/button_system";
import {PlusCircleOutlined } from '@ant-design/icons';

const useStyle = createUseStyles(style);

const CategoryButton = ({onClick}) => {
    const classes = useStyle();
    return(
        <ButtonSystem className={classes.btn} onClick={onClick} textClassName={classes.btnText}>
            Add new category
        </ButtonSystem>
    )
};

export default CategoryButton;
