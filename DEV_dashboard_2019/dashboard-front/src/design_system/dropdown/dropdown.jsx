import React, { useCallback, useEffect, useRef } from 'react';
import { animated, config, useSpring, interpolate } from 'react-spring';

export const Dropdown = ({
                             open,
                             children,
                             onClose,
                             position = { top: 0, left: 0 },
                             zIndex = null,
                             closeOnClickOutside = true,
                             closeOnMouseLeave = false,
                             className = null,
                             animations = { x: 0, y: 0 }
                         }) => {
    const dropdownRef = useRef();

    const { opacity, pointerEvents, x, y } = useSpring({
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        x: open ? animations.x : 0,
        y: open ? animations.y : 0,
        config: config.default
    });

    const onClickOutside = useCallback(
        event => {
            event.preventDefault();
            const targetElement = event.target;
            if (
                targetElement === dropdownRef.current
                || (dropdownRef.current && dropdownRef.current.contains(targetElement))
            ) {
                return null;
            }
            if (onClose) {
                onClose();
            }
        },
        [dropdownRef]
    );

    const handleMouseLeave = useCallback(() => {
        if (!closeOnMouseLeave) return;
        if (onClose) {
            onClose();
        }
    }, [closeOnMouseLeave]);

    useEffect(() => {
        if (closeOnClickOutside) {
            if (open) {
                document.addEventListener('click', onClickOutside);
            } else {
                document.removeEventListener('click', onClickOutside);
            }
            return () => {
                document.removeEventListener('click', onClickOutside);
            }
        }
    }, [open]);

    return (
        <animated.div
            className={className}
            style={{
                opacity,
                pointerEvents,
                transform: interpolate([x, y], (valueX, valueY) => `translate3d(${valueX}px, ${valueY}px, 0)`),
                ...position,
                zIndex,
                position: 'absolute'
            }}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
        >
            {children}
        </animated.div>
    );
};

