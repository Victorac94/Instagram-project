import { h } from 'preact';
import { Link } from 'preact-router';

import '../../../style/icon-styles.css';
import * as classes from './PostHeader.css';

const postHeader = (props) => (
  <div className={classes.postHeader}>
    <Link href={"/" + props.accountName}>
      <img className={classes.profileThumbnail} src={props.img} />
      <span className={classes.accountName}>{props.accountName}</span>
    </Link>
    <span className="icon-dot-3"></span>
  </div>
)

export default postHeader;
