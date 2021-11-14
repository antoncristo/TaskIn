import { ChangeEvent, CSSProperties, FocusEvent, Ref } from "react";
import { observer } from "mobx-react";
import { memosCrudActions, memoUIActions } from "src/actions";
import { Memo } from "src/client-types";
import editIcon from "src/assets/svg/edit_24dp.svg";
import doneIcon from "src/assets/svg/done_24dp.svg";
import { memoStore } from "src/stores";

import classes from "./edit-memo-content.module.css";
import { Button } from "src/shared";
import React from "react";

type EditMemoContentProps = {
  memo: Memo;
};

const buttonStyleOverride: CSSProperties = {
  minWidth: "20px",
  position: "absolute",
  right: "-40px",
  top: "0px",
  border: "none",
};

export const EditMemoContent = observer((props: EditMemoContentProps) => {
  const { memo } = props;
  const { uiStoreInstance } = memoStore;
  const _memoUrgencyLevelColor = uiStoreInstance.memoUrgencyLevelMap[memo.uuid];
  const textareaRef: Ref<HTMLTextAreaElement> = React.createRef();

  const _isContentInEditMode = uiStoreInstance.editMemoProfile?.content;

  const toggleContentEditModeHandler = () => {
    memoUIActions.editMemoProfile(
      "content",
      !memoStore.uiStoreInstance.editMemoProfile.content
    );
  };

  const onChangeMemoTitleHandler = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
    memosCrudActions.updateSingleMemo(memo.uuid, "content", event.target.value);
  };

  const onFocusHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
    event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
    event.currentTarget.select();
  };

  return (
    <div
      style={{
        borderBottom: `2px solid ${_memoUrgencyLevelColor}`,
        borderTop: `2px solid ${_memoUrgencyLevelColor}`,
      }}
      className={classes.editMemoContentWrapper}
    >
      <div className={classes.editMemoContent}>
        {_isContentInEditMode ? (
          <textarea
            autoFocus
            onFocus={onFocusHandler}
            onChange={onChangeMemoTitleHandler}
            ref={textareaRef}
            value={memo.content}
            placeholder="Type your memo..."
          />
        ) : (
          <div
            className={classes.contentAsLabel}
            onClick={toggleContentEditModeHandler}
          >
            {memo.content}
          </div>
        )}
      </div>
      <Button
        styleOverride={buttonStyleOverride}
        icon={_isContentInEditMode ? doneIcon : editIcon}
        title=""
        onClick={toggleContentEditModeHandler}
      />
    </div>
  );
});
