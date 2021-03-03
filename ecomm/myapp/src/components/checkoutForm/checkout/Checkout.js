import React, { useState, useEffect } from "react";
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
    CssBaseline,
} from "@material-ui/core";
import useStyles from "./Styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/Commerce";
import { SkipPreviousSharp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shippping address", "Payment details"];

const Checkout = ({ cart, onCaptureCheckout, order, error, refreshCart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: "cart",
                });
                setCheckoutToken(token);

                console.log(token);
            } catch (error) {
                history.push("/");
            }
        };
        generateToken();
    }, [cart]);
    const timeOut = () => {
        setTimeout(() => {
            setIsFinished(true);
            //for test
            refreshCart();
        }, 4000);
    };
    const nextStep = () => {
        setActiveStep((prevState) => prevState + 1);
    };
    const backStep = () => {
        setActiveStep((prevState) => prevState - 1);
    };

    const next = (data) => {
        setShippingData(data);
        nextStep();
        console.log(data);
    };
    const Form = () => {
        return activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                shippingData={shippingData}
                checkoutToken={checkoutToken}
                backStep={backStep}
                onCaptureCheckout={onCaptureCheckout}
                nextStep={nextStep}
                timeOut={timeOut}
            />
        );
    };
    let Confirmation = () => {
        return order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank You For your purchase,{order.customer.firstName}{" "}
                        {order.customer.LastName}
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order Ref: {order.customer_refrence}{" "}
                    </Typography>
                </div>
                <br />
                <Button
                    variant="outlined"
                    type="button"
                    component={Link}
                    to="/"
                >
                    Back To Home
                </Button>
            </>
        ) : isFinished ? (
            //fake purchase
            <>
                <div>
                    <Typography variant="h5">
                        Thank You For your purchase
                    </Typography>
                    <Divider className={classes.divider} />
                </div>
                <br />
                <Button
                    variant="outlined"
                    type="button"
                    component={Link}
                    to="/"
                >
                    Back To Home
                </Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );
    };
    // if we had real purchase
    /* if (error) {
        return (
            <>
                <Typography variant="h5" style={{ marginTop: "100px" }}>
                    Error: {error}
                </Typography>
                <br />
                <Button
                    variant="outlined"
                    type="button"
                    component={Link}
                    to="/"
                >
                    Back To Home
                </Button>
            </>
        );
    } */
    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper
                            activeStep={activeStep}
                            className={classes.stepper}
                        >
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Confirmation />
                        ) : (
                            checkoutToken && <Form />
                        )}
                    </Paper>
                </main>
            </div>
        </>
    );
};

export default Checkout;
