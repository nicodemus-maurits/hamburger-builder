import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            /* Add our active class name manually since React add some hash value on element */
            activeClassName={classes.active}
            /* Add exact to distinguish between currenty active link */
            exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;
