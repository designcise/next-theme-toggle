import React from 'react';

export default function Html({ className, theme, style, children, ...rest }) {
    const classes = className ? `${className} ` : '';
    return (
        <html { ...rest } className={`${classes}${theme}`} style={{ ...style, colorScheme: theme }}>{children}</html>
    );
}
