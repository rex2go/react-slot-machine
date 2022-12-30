import { css } from "@emotion/react"

export const useSlotMachineStyles = () => ({
    root: css({
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }),
    rowsContainer: css({
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        maxHeight: "14rem",
        overflow: "hidden",
        backgroundColor: "yellow",
        fontWeight: "bold",
        fontSize: "2rem",
        position: "relative",

        "&:before": {
            zIndex: 1,
            content: '""',
            position: "absolute",
            width: "100%",
            height: "5rem",
            background: "linear-gradient(0deg, rgba(128,83,255,0) 0%, rgba(36,36,36,1) 66%);"
        },

        "&:after": {
            zIndex: 1,
            bottom: 0,
            content: '""',
            position: "absolute",
            width: "100%",
            height: "5rem",
            background: "linear-gradient(0deg, rgba(36,36,36,1) 34%, rgba(128,83,255,0) 100%);"
        }
    }),
    slotsContainer: css({
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "flex-end"
    }),
    slotContainer: css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "4rem",
        height: "4rem",
        flexShrink: 0,
        transition: "transform, font-size 0.1s",
        transitionTimingFunction: "cubic-bezier(0.1, 0.7, 1.0, 0.1)",
    }),
    settingsContainer: css({
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        border: "1px dashed lightgray",
        padding: "1rem",
        borderRadius: "1rem",
        marginTop: "2rem",
        
        "> label": {
            display: "flex",
            justifyContent: "space-between",
        }
    }),
    subline: css({
        "a": {
            color: "yellow",
            textDecoration: "none",
        }
    }),
})