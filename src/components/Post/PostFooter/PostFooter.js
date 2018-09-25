import { h } from 'preact';
import { Link } from 'preact-router';

import '../../../style/icon-styles.css';
import * as classes from './PostFooter.css';

const postFooter = (props) => (
  <div className={classes.postFooter}>
    <div className={classes.postFooter__Header}>
      <span className={props.liked ? "icon-heart" : "icon-heart-o"} onClick={props.clickedLike}></span>
      <span className="icon-comment-o"></span>
      <span className="icon-paper-plane-o"></span>
      <span className={props.bookmarked ? "icon-bookmark" : "icon-bookmark-o"} onClick={props.clickedBookmark}></span>
    </div>
    <p className={classes.likes}>{props.likes} Me gusta</p>
    <p className={classes.accountComment}>
      <Link href={"/" + props.accountName}>
        <span className={classes.accountName}>{props.accountName}</span>
      </Link>
       {" " + props.description}
    </p>
    <p className={classes.uploaded}>{props.uploaded}</p>
  </div>
)

export default postFooter;
