import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from'../NavigationItem/NavigationItem';

const navigationItems=(props)=>(
    <ul className={classes.NavigationItems}>
 <NavigationItem link='/' exact>Burger Builder</NavigationItem>
 {props.isAuthenticated ? <NavigationItem link='/orders' active>Orders</NavigationItem> : null}
 {!props.isAuthenticated
 ?
 <NavigationItem link='/auth' active>Authenticate</NavigationItem>
 : <NavigationItem link='/logout' active>LOGOUT</NavigationItem>
 }
    </ul>
);

export default navigationItems;