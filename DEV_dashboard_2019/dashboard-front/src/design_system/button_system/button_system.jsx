import React, {useCallback} from 'react';

import cn from 'classnames';
import {createUseStyles} from 'react-jss';
import styles from './button_system_style';
import {useSpring, animated} from "react-spring";

const useStyles = createUseStyles(styles);

const DEFAULT_SPRING_PROPS = {
    boxShadow: '0 7.5px 15px 0 #eee'
};

const DEFAULT_SPRING_HOVER_PROPS = {
    boxShadow: '0 7.5px 15px 0 #dadada'
};

export const ButtonSystem = ({
                                 className,
                                 textClassName,
                                 buttonRef,
                                 children,
                                 onMouseEnter,
                                 onMouseLeave,
                                 DefaultSpringProps = DEFAULT_SPRING_PROPS,
                                 HoverSpringProps = DEFAULT_SPRING_HOVER_PROPS ,
                                 ...other
                             }) => {
    const classes = useStyles();

    const [springProps, setSpringProps] = useSpring(() => DefaultSpringProps);

    const handleMouseEnter = useCallback(
        (...parameters) => {
            if (typeof onMouseEnter === 'function') {
                onMouseEnter(...parameters);
            }
            setSpringProps(() => (HoverSpringProps));
        },
        [onMouseEnter]
    );
    const handleMouseLeave = useCallback(
        (...parameters) => {
            if (typeof onMouseLeave === 'function') {
                onMouseLeave(...parameters);
            }
            setSpringProps(() => (DefaultSpringProps));
        },
        [onMouseLeave]
    );
    return (

        <animated.button
            ref={buttonRef}
            className={cn(className, classes.button)}
            style={springProps}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...other}

        >
            <span className={cn(classes.text, textClassName)}>{children}</span>
        </animated.button>
    );
};



