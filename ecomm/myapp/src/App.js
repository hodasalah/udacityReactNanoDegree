import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { commerce } from "./lib/Commerce";
import { Products, Navbar, Cart, Checkout } from "./components";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    //fetch data from database
    const fetchProducts = async () => {
        //{data}=== response
        const { data } = await commerce.products.list();
        setProducts(data);
    };
    // fetch cart
    const fetchCart = async () => {
        // retrieve cart items
        const cartContent = await commerce.cart.retrieve();
        setCart(cartContent);
    };
    const handleAddToCart = async (productID, Amount) => {
        const item = await commerce.cart.add(productID, Amount);
        setCart(item.cart);
    };
    const handleUpdateCardAmount = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, { quantity });
        setCart(response.cart);
    };
    const handleRemoveFromCard = async (productId) => {
        const response = await commerce.cart.remove(productId);
        setCart(response.cart);
    };
    const handleEmptyCard = async () => {
        const response = await commerce.cart.empty();
        setCart(response.cart);
    };
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        console.log(newCart);
        setCart(newCart);
    };
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(
                checkoutTokenId,
                newOrder
            );
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
            console.log(errorMessage);
        }
    };
    console.log(errorMessage);
    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);
    console.log(products);
    console.log(cart);

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            <Switch>
                <Route exact path="/">
                    <Products
                        products={products}
                        onAddToCart={handleAddToCart}
                    />
                </Route>
                <Route exact path="/cart">
                    <Cart
                        cart={cart}
                        onUpdateItems={handleUpdateCardAmount}
                        onRemoveItems={handleRemoveFromCard}
                        onEmptyCard={handleEmptyCard}
                    />
                </Route>
                <Route exact path="/checkout">
                    <Checkout
                        cart={cart}
                        order={order}
                        onCaptureCheckout={handleCaptureCheckout}
                        error={errorMessage}
                        refreshCart={refreshCart}
                    />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
