import { CSSProperties, MouseEvent } from "react";
import dayjs from "dayjs";
import { Memo } from "src/client-types";
import rightArrowIcon from "src/assets/svg/east_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import removeDoneIcon from "src/assets/svg/remove_done_24dp.svg";
import deleteIcon from "src/assets/svg/delete_24dp.svg";
import expandLessIcon from "src/assets/svg/expand_less_24dp.svg";
import expandMoreIcon from "src/assets/svg/expand_more_24dp.svg";
import { Button } from "src/shared";
import { memosCrudActions, memoUIActions } from "src/actions";

import classes from "./control-panel.module.css";

type ControlPanelProps = {
  memo: Memo;
  isCollapsed: boolean;
};

const controlPanelButtonsStyleOverride: CSSProperties = {
  minWidth: "40px",
};

const controlPanelToggleCollapseButtonStyleOverride: CSSProperties = {
  border: "none",
  backgroundColor: "transparent",
};

export const ControlPanel = (props: ControlPanelProps) => {
  const { memo, isCollapsed } = props;

  const isMemoDoneToggler = () => {
    memosCrudActions.updateSingleMemo(memo.uuid, "isDone", !memo.isDone);
  };

  const deleteMemoFromMapHandler = () => {
    memosCrudActions.deleteSingleMemoFromMap(memo.uuid);
    memoUIActions.deleteSingleMemoCollapseState(memo.uuid);
  };

  const toggleMemoCollapsedState = () => {
    memoUIActions.toggleSingleMemoCollapseState(memo.uuid);
  };

  const preventClickPropogation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={[
        classes.controlPanel,
        isCollapsed && classes.minimizedControlPanel,
      ].join(" ")}
    >
      {isCollapsed ? null : (
        <div className={classes.memoDates}>
          <span
            className={[
              classes.startDate,
              memo.isDone && classes.finishedDate,
            ].join(" ")}
          >
            {dayjs(memo.creationDate).format("DD/MM/YYYY")}{" "}
          </span>
          <img src={rightArrowIcon} alt="direction" />
          <span
            className={[
              classes.endDate,
              memo.isDone && classes.finishedDate,
            ].join(" ")}
          >
            {dayjs(memo.dueDate).format("DD/MM/YYYY")}
          </span>
        </div>
      )}
      <div onClick={preventClickPropogation} className={classes.memoButtons}>
        <Button
          styleOverride={controlPanelButtonsStyleOverride}
          title=""
          icon={memo.isDone ? removeDoneIcon : doneIcon}
          onClick={isMemoDoneToggler}
        />
        <Button
          styleOverride={controlPanelToggleCollapseButtonStyleOverride}
          title=""
          icon={isCollapsed ? expandMoreIcon : expandLessIcon}
          onClick={toggleMemoCollapsedState}
        />
        <Button
          styleOverride={controlPanelButtonsStyleOverride}
          title=""
          icon={deleteIcon}
          onClick={deleteMemoFromMapHandler}
        />
      </div>
    </div>
  );
};
