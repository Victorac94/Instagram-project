import { h, render, Component } from 'preact';
import { Link } from 'preact-router';

import '../../../../style/icon-styles.css';
import * as classes from './ProfileBody.css';
import Post from '../../Post/Post';

class ProfileBody extends Component {
  state = {
    gridModeView: true
  };

  showGridModeView = () => {
    this.setState({gridModeView: true});
  };

  showListModeView = () => {
    this.setState({gridModeView: false});
  };

  render(props, state) {
    const invertedPostsArray = [];
    let viewModeClass = classes.gridModeView;
    let posts = [];

    // If we're viewing the posts in a List Mode then add the corresponding class to the div that contains the posts
    if (state.gridModeView == false) {
      viewModeClass = classes.listModeView;
    }

    // If we have the thumbnails from the DB and are in the 'gridModeView' then:
    if (props.parentState.thumbnails && state.gridModeView) {
      const thumbnails = props.parentState.thumbnails;

      for (const elemKey in thumbnails) {
        const url = "/" + props.parentState.accountName + "/" + elemKey;

        let item = (
          <Link href={url}>
            <div key={elemKey.toString()}>
              <img src={thumbnails[elemKey]} />
            </div>
          </Link>
        );
        posts.push(item);
      }
    }
    //Otherwise if we have the posts from the DB and are in the 'listModeView' then:
    else if (props.parentState.posts && !state.gridModeView) {
      const rawPosts = props.parentState.posts;

      for (const elemKey in rawPosts) {
        const myPost = <Post accountName={props.parentState.accountName} postId={elemKey} fromProfile={true}/>;
        posts.push(myPost);
      }
    }

    //Invert the order of the array elements so that the last uploaded posts show first
    for (let i = posts.length - 1; i >= 0; i--) {
      invertedPostsArray.push(posts[i]);
    }
    posts = invertedPostsArray;

    return (
      <div className={classes.profileBody}>
        {/* Here go the account stats */}
        <div className={classes.stats}>
          <div className={classes.stat}>
            <span className={classes.statNumber}>{props.parentState.numberOfPosts}</span>
            <span className={classes.statTitle}>posts</span>
          </div>
          <div className={classes.stat}>
            <span className={classes.statNumber}>{props.parentState.followers}</span>
            <span className={classes.statTitle}>followers</span>
          </div>
          <div className={classes.stat}>
            <span className={classes.statNumber}>{props.parentState.following}</span>
            <span className={classes.statTitle}>following</span>
          </div>
        </div>
        {/* Here go the different view modes */}
        <div className={classes.viewModes}>
          <div className={state.gridModeView ? "icon-grid-active" : "icon-grid"} onClick={this.showGridModeView}></div>
          <div className={!state.gridModeView ? classes.iconViewModeListActive : classes.iconViewModeList} onClick={this.showListModeView}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {/* Here go the posts */}
        <div className={viewModeClass}>
          {posts}
        </div>
      </div>
    );
  }
}

export default ProfileBody;
