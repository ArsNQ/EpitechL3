import React, {useCallback, useState} from 'react';
import { createUseStyles } from 'react-jss';
import style from './drawer_styles';
import {useSelector} from "react-redux";
import CategoryButton from "./category_button/button_category";
import ModalCategory from "./modal_category/modal_category";
import CategoryItem from "./category_item/category_item";

const useStyle = createUseStyles(style);

const Drawer = (props) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const dashboard = useSelector(store => store.dashboard);

    const closeModal = useCallback(() => {
        setOpen(false);
    },[]);

    const openModal = useCallback(() => {
        setOpen(true);
    },[]);

    return(
        <>
            <div className={classes.container}>
                <CategoryButton onClick={openModal} />
                {
                    Object.entries(dashboard).map(([key]) => <CategoryItem name={key} key={key} {...props} />)
                }
            </div>
            <ModalCategory open={open} onCancel={closeModal} />
        </>
    );
};

export default Drawer;
