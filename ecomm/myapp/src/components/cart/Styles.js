import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
        marginTop: "5%",
        marginBottom: "8%",
    },
    emptyButton: {
        minWidth: "150px",
        [theme.breakpoints.down("xs")]: {
            marginBottom: "5px",
        },
        [theme.breakpoints.up("xs")]: {
            marginRight: "20px",
        },
    },
    checkoutButton: {
        minWidth: "150px",
    },
    link: {
        textDecoration: "none",
    },
    cardDetails: {
        display: "flex",
        marginTop: "10%",
        width: "100%",
        justifyContent: "space-between",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            alignItems: "center",
            flex: "1",
        },
    },
    btns: {
        [theme.breakpoints.down("xs")]: {
            width: "100%",

            "&>*": {
                marginRight: 0,
                width: "100%",
            },
        },
    },
}));
