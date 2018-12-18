import React from 'react';
import classes from './Button.module.css';

const button =(props)=>(
    <button
    // className={classes.Button}// we added join at end becoz we have to pass string to classname anh here we apass array i.e
    className={[classes.Button,classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}>
    {props.children}
    </button>
);
export default button;