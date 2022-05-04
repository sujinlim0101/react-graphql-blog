import { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./FeedInput.module.css";

const FeedInput = ({ mutate, text = "", id = undefined }) => {
  const [textVal, setTextVal] = useState(text);
  const handleTextChange = (e) => {
    setTextVal(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const text = textVal;
    setTextVal("");
    mutate({ text, id });
  };

  return (
    <div className={styles.formConainer}>
      <form onSubmit={onSubmit}>
        <TextField
          id="outlined-multiline-flexible"
          fullWidth
          multiline
          rows={4}
          value={textVal}
          placeholder="오늘 어떤 생각을 하고 계신가요?"
          onChange={handleTextChange}
        />
        <div className={styles.feedInputBtnWrapper}>
          <button className={styles.feedInputBtn} type="submit" disabled={!textVal}>
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedInput;
