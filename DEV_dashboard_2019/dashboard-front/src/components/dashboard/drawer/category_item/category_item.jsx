import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCategory} from "../../../../actions/dashboard";
import style from './category_item_styles';
import { createUseStyles} from "react-jss";
import RightOutlined from "@ant-design/icons/lib/icons/RightOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import cn from "classnames";
import {Link} from "react-router-dom";

const useStyle = createUseStyles(style);

const CategoryItem = ({name, match}) => {
    const {params: {id}} = match;
    const dispatch = useDispatch();
    const classes = useStyle();
    const {_id} = useSelector(store => store.user);
    const isSelected = id === name;

    const deleteCategoryCallback = useCallback(() => {
        deleteCategory(name,_id)(dispatch)
    },[name, _id]);

  return (
      <Link className={cn(classes.btn, isSelected && classes.btnSelected)} to={`/dashboard/${name}`}  >
          <div className={classes.btnText}>
             <div><RightOutlined className={classes.btnRight}/>{name}</div>
             <div className={classes.btnDelete}><DeleteOutlined onClick={deleteCategoryCallback}/></div>
          </div>
      </Link>
  );
};

export default CategoryItem;
