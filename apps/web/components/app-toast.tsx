import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Snackbar, Button } from "@mui/material";
import { actionCreators } from "@courselit/state-management";
import { Cross as Close } from "@courselit/icons";
import type { AppDispatch, AppState } from "@courselit/state-management";
import { IconButton } from "@courselit/components-library";

const { clearAppMessage } = actionCreators;

interface Action {
    text: string;
    cb: (...args: any[]) => any;
}

interface Message {
    message: string;
    open: boolean;
    action: Action | null;
}

interface AppToastProps {
    message: Message;
    dispatch: any;
}

const AppToast = (props: AppToastProps) => {
    const { message } = props;
    const action = message && message.action;

    const handleClose: any = (_: Event | SyntheticEvent, reason: string) => {
        if (reason === "clickaway") {
            return;
        }

        props.dispatch(clearAppMessage());
    };

    const getActionButtonsArray = () => {
        const actionButtonsArray = [
            <IconButton key="close" onClick={handleClose}>
                <Close />
            </IconButton>,
        ];
        if (action) {
            actionButtonsArray.unshift(
                <Button
                    key="action"
                    color="secondary"
                    size="small"
                    onClick={message.action!.cb}
                >
                    {message.action!.text}
                </Button>,
            );
        }

        return actionButtonsArray;
    };

    return (
        <>
            {message && (
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={message.open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={<span>{message.message}</span>}
                    action={getActionButtonsArray()}
                />
            )}
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    message: state.message,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    dispatch: dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppToast);
