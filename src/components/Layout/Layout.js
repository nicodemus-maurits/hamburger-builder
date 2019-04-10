import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }
    
    sideDrawerToggleHandler = () => {
        /* Don't use it like this since it can lead to unusual behavior */
        /* this.setState({showSideDrawer: !this.state.showSideDrawer}); */
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render () {
        return (
            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    opened={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
} 

export default Layout;
