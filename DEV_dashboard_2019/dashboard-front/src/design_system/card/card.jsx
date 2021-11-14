import React from 'react';

import cn from 'classnames';
import injectSheet from 'react-jss';

import styles from './card_styles';

const CardComponent = ({ className, classes, ...other }) => (
    <div className={cn(className, classes.container)} {...other} />
);

export const Card = injectSheet(styles)(CardComponent);
