import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import CartItem from "./cartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({ cart, onUpdateItems, onRemoveItems, onEmptyCard }) => {
    const classes = useStyles();
    //EmptyCart
    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                You Have No Items In Your Shopping Cart,{" "}
                <Link to="/" className={classes.link}>
                    start adding Some
                </Link>
                !
            </Typography>
        );
    };
    //FilledCart
    const FilledCart = () => {
        console.log(cart);
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <CartItem
                                item={item}
                                updateItems={onUpdateItems}
                                removeItems={onRemoveItems}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h6">
                        Subtotal:{cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div className={classes.btns}>
                        <Button
                            className={classes.emptyButton}
                            size="large"
                            variant="contained"
                            color="secondary"
                            type="button"
                            onClick={onEmptyCard}
                        >
                            Empty Cart
                        </Button>
                        <Button
                            className={classes.checkoutButton}
                            size="large"
                            variant="contained"
                            color="primary"
                            type="button"
                            component={Link}
                            to="/checkout"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </>
        );
    };
    if (!cart.line_items) return "Loading ...";
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h4">
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;
