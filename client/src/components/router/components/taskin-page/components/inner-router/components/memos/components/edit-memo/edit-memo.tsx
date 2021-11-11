import { CSSProperties } from "react";
import { observer } from "mobx-react";
import { Uuid } from "src/client-types";
import { Button, Spinner } from "src/shared";
import { memoStore } from "src/stores";

import { EditMemoTitle, EditMemoContent, EditMemoDate } from "./components";

import classes from "./edit-memo.module.css";
import { memoUIActions } from "src/actions";

type EditMemoProps = {
  memoUUID: Uuid;
  returnFromEditPage: () => void;
};

const buttonStyleOverride: CSSProperties = {
  height: "35px",
  width: "100px",
  marginTop: "40px",
  fontWeight: 600,
};

export const EditMemo = observer((props: EditMemoProps) => {
  const { memoUUID, returnFromEditPage } = props;
  const { dataStoreInstance } = memoStore;

  const _memoFromMap = dataStoreInstance.memosMap[memoUUID];
  if (!_memoFromMap) {
    return (
      <div className={classes.editMemoLoading}>
        <Spinner />
      </div>
    );
  } else {
    setTimeout(() => {
      memoUIActions.calculateSingleMemoUrgencyLevelState(memoUUID);
    }, 0);
  }

  return (
    <div className={classes.editMemo}>
      <EditMemoTitle memo={_memoFromMap} />
      <EditMemoContent memo={_memoFromMap} />
      <EditMemoDate dateTitle="creationDate" memo={_memoFromMap} />
      <EditMemoDate dateTitle="dueDate" memo={_memoFromMap} />
      <Button
        styleOverride={buttonStyleOverride}
        title="Return"
        onClick={returnFromEditPage}
      />
    </div>
  );
});
