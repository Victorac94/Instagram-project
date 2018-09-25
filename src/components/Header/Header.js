import { h } from 'preact';

import '../../style/icon-styles.css';
import * as classes from './Header.css'

const header = (props) => {
  let renderDiv = (
    <div>
      <span className="icon-camera"></span>
      <span className={classes.instagramTitle}>Instagram</span>
      <span className="icon-user-add"></span>
    </div>
  );

  switch (props.view) {
    case "Profile":
      renderDiv = (
        <div>
          <span className={classes.viewTitle}>Profile</span>
        </div>
      );
      break;
    case "Post":
    renderDiv = (
      <div>
        <span className={classes.viewTitle}>Post</span>
      </div>
    )
      break;
  }

  return (
    <div className={classes.Header}>
      {renderDiv}
    </div>
  );
}

export default header;
