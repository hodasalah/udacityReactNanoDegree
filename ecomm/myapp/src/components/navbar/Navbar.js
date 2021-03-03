import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/commerce.png";
import useStyles from "./Styles";
const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();
    return (
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
            <Toolbar>
                <Typography
                    component={Link}
                    to="/"
                    variant="h6"
                    className={classes.title}
                    color="inherit"
                >
                    <img
                        src={logo}
                        alt="commerce"
                        height="25px"
                        className={classes.image}
                    />
                    commerce
                </Typography>
                <div className={classes.grow} />
                {location.pathname === "/" && (
                    <div className={classes.button}>
                        <IconButton
                            component={Link}
                            to="/cart"
                            aria-label="show cart items"
                            color="inherit"
                        >
                            <ShoppingCart />
                            <Badge
                                badgeContent={totalItems}
                                color="secondary"
                            ></Badge>
                        </IconButton>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
