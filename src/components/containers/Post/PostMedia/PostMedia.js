import { h, render, Component } from 'preact';

import '../../../../style/icon-styles.css';
import * as classes from './PostMedia.css';

class PostMedia extends Component {

  // heartClasses = ["icon-heart", classes.heartNotVisible];

  render(props, state) {

    return (
      <div className={classes.postMedia} >
        <img
          src={props.img}
          onDblClick={props.like}/>
        <span
          className={"icon-heart " + classes.heartNotVisible}>
        </span>
      </div>
    )
  }
}

export default PostMedia;
