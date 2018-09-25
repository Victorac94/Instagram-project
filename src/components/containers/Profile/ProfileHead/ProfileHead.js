import { h } from 'preact';

import '../../../../style/icon-styles.css';
import * as classes from './ProfileHead.css';

const profileHead = (props) => (
  <div className={classes.profileHead}>
    <div className={classes.accountImgDiv}>
      <img src={props.parentState.accountImg} alt="ProfileImage" />
    </div>
    <p className={classes.accountName}>{props.parentState.accountName}</p>
    <span className={["icon-dot-3", classes.accountOptions].join(" ")}></span>
    <button className={classes.followButton}>Following</button>
    <div className={classes.bio}>
      <strong>{props.parentState.realName}</strong>
      <p>{props.parentState.bio}</p>
    </div>
  </div>
);

export default profileHead;
