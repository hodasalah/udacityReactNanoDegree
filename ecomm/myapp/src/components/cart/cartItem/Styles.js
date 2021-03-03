import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
    media: {
        height: 240,
        backgroundSize: "contain",
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
    },
    cardActions: {
        display: "flex",
        justifyContent: "space-between",
    },
    buttons: {
        display: "flex",
        alignItems: "center",
    },
}));
