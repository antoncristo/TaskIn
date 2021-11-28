import { observer } from "mobx-react";
import { Memo } from "src/client-types";
import { Spinner } from "src/shared";
import { memoStore } from "src/stores";

import { MemoCard, AddMemoCard } from "./components";

import classes from "./memos-items.module.css";

export const MemosItems = observer(() => {
  const { uiStoreInstance, dataStoreInstance } = memoStore;

  const memosFromDataStore =
    dataStoreInstance.getMemosMapAsArrayByDisplayClass();
  if (!memosFromDataStore) {
    return (
      <div className={classes.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  const memosRenderPipeline = () => {
    const filteredMemos = uiStoreInstance.getFilteredMemos(memosFromDataStore);

    const sortedMemos = uiStoreInstance.getSortedMemos(filteredMemos);

    return Array.from(new Set<Memo>([...sortedMemos]));
  };

  const renderPipelineResults = memosRenderPipeline();

  return (
    <div className={classes.memosItems}>
      <AddMemoCard />
      {renderPipelineResults.length
        ? renderPipelineResults.map((memo, index) => (
            <MemoCard key={memo.uuid} memo={memo} />
          ))
        : null}
    </div>
  );
});
