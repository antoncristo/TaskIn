import { CSSProperties, MouseEvent } from "react";
import { Button } from "src/shared";
import { routerLocationSetter } from "src/actions";
import closeIcon from "src/assets/svg/close_black_24dp.svg";

import { GoogleButton } from "./components";

import classes from "./login-card.module.css";

const closeIconButtonStyleOverride: CSSProperties = {
  border: "none",
  padding: "0",
  minWidth: "25px",
  marginRight: "-5px",
};

export const LoginCard = () => {
  const preventParentClickEventHandler = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
  };

  const onCloseIconClickedHandler = () => {
    routerLocationSetter("/");
  };

  const isMobile: boolean = window.innerWidth <= 800;

  return (
    <div onClick={preventParentClickEventHandler} className={classes.loginCard}>
      <div className={classes.loginCardHeader}>
        Log in options
        {isMobile ? null : (
          <Button
            title=""
            icon={closeIcon}
            onClick={onCloseIconClickedHandler}
            styleOverride={closeIconButtonStyleOverride}
          />
        )}
      </div>
      <div className={classes.loginCardContent}>
        <div className={classes.googleButtonIntroText}>
          Log in with your Google account
        </div>
        <GoogleButton />
      </div>
    </div>
  );
};
