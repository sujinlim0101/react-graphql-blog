import FeedInput from "../FeedInput/FeedInput";
import timeByUnit from "../../utils/timeByUnit";
import styles from "./FeedItem.module.css";

const FeedItem = ({ user, timestamp, id, text, onUpdate, isEditing, startEdit, onDelete, myId }) => (
  <li className={styles.feed}>
    <div className={styles.item}>
      <h3>{user.nickname}</h3>
      <time className={styles.time}>{timeByUnit(timestamp)}</time>
    </div>
    <div className={styles.hr} />
    <div className={styles.itemText}>
      {isEditing ? (
        <>
          <FeedInput mutate={onUpdate} text={text} id={id} />
        </>
      ) : (
        text
      )}
    </div>
    {myId === user.id && (
      <div className={`${styles.btnWrapper} ${styles.item}`}>
        <button className={styles.editBtn} onClick={startEdit}>
          수정
        </button>
        <button className={styles.deleteBtn} onClick={onDelete}>
          삭제
        </button>
      </div>
    )}
  </li>
);

export default FeedItem;
