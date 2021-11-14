import React, {useCallback, useState} from 'react';
import { createUseStyles } from 'react-jss';
import { Modal } from 'antd';
import style from './modal_category_styles';
import {ButtonSystem} from "../../../../design_system/button_system/button_system";
import cn from 'classnames';
import {TextField} from "../../../../design_system/text_field/text_field";
import { Checkbox } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {addCategory} from "../../../../actions/dashboard";

const useStyle = createUseStyles(style);

const ModalCategory = ({open, onCancel}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const service = useSelector(store => store.service);
    const {_id} = useSelector(store => store.user);
    const [category, setCategory] = useState("");
    const [servicesChecked, setServicesChecked] = useState([]);

    const handleChange = useCallback((event) => {
        const {target : {value}} = event;
        setCategory(value);
    },[]);

    const handleChangeServices = useCallback((event) => {
        const {target : {name}} = event;
        const index = servicesChecked.indexOf(name);
        const currentService = [...servicesChecked];
        if (index === -1) {
            setServicesChecked([...currentService,name]);
        } else {
            currentService.splice(index,1);
            setServicesChecked(currentService);
        }
    },[servicesChecked]);

    const handleCancel = useCallback(() => {
        setCategory("");
        setServicesChecked([]);
        if (onCancel) {
            onCancel();
        }
    },[]);


    const validate = useCallback(() => {
        addCategory(category,servicesChecked, _id)(dispatch)
            .then(() => {
                handleCancel()
            })
    },[category,JSON.stringify(servicesChecked), _id, handleCancel]);


    return(
        <Modal
            className={classes.container}
            visible={open}
            onCancel={handleCancel}
            title={"Add a new category"}
            footer={[
                <ButtonSystem
                    key={"cancel"}
                    className={classes.btn}
                    textClassName={cn(classes.btnText, classes.gray)}
                    onClick={handleCancel}
                >
                    Cancel
                </ButtonSystem>,
                <ButtonSystem
                    key={"validate"}
                    className={cn(classes.btn, classes.bgBlue)}
                    textClassName={cn(classes.btnText, classes.white)}
                    onClick={validate}
                >
                   OK
                </ButtonSystem>
            ]}
        >
            <label>
            <span className={classes.label}>Name</span>
            <TextField
                value={category}
                onChange={handleChange}
                variant={'flat'}
                className={classes.input}
                inputClassName={classes.innerInput}
            />
            </label>
            <div style={{marginTop: '20px'}}>
                <span  className={classes.label} >Services</span>
                <div className={classes.containerCheckbox}>
                    {
                        Object.entries(service).map(([key, val])=> {
                            if (!val.enabled) return null;
                            return(
                                <div key={key}>
                                    <Checkbox
                                        className={classes.checkbox}
                                        onChange={handleChangeServices}
                                        name={key}
                                        checked={servicesChecked.indexOf(key) !== -1}
                                    >{key}</Checkbox>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Modal>
    );
};

export default ModalCategory;
