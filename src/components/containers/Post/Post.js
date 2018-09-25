import { h, render, Component } from 'preact';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import PostHeader from '../../Post/PostHeader/PostHeader';
import PostFooter from '../../Post/PostFooter/PostFooter';
import PostMedia from './PostMedia/PostMedia';
import axios from '../../../axios-instance';

class Post extends Component {
  state = null;

  formatLikes = () => {
    let likesCopy = this.state.likes;
    let numb = likesCopy.toString().split("");
    for (let i = numb.length - 3; i > 0; i = i - 3) {
      numb.splice(i, 0, ",");
    }
    const finalNumb = numb.join("");
    return this.setState({likes: this.state.likes, formattedLikes: finalNumb});
  }

  addLike = () => {
    if (this.state.liked == false) {
      const stateCopy = {...this.state};
      stateCopy.likes = stateCopy.likes + 1;

      this.setState({...stateCopy, liked: true});
      this.formatLikes();
    }
  }

  removeLike = () => {
    const stateCopy = {...this.state};
    stateCopy.likes = stateCopy.likes - 1;

    this.setState({...stateCopy, liked: false});
    this.formatLikes();
  }

  toggleLike = () => {
    if(this.state.liked) {
      this.removeLike();
    } else {
      this.addLike();
    }
  }

  toggleBookmark = () => {
    this.setState((prevState, props) => {
      return {...prevState, bookmarked: !prevState.bookmarked}
    });
  }

  componentDidMount() {
    //Check if we have the Post info cached, if we do, get it and put it in the state
    if (sessionStorage.hasOwnProperty(this.props.postId)) {
      let postData = sessionStorage.getItem(this.props.postId);
      postData = JSON.parse(postData);
      this.setState({...postData});
    }
    //In case we don't have it, make a request to the server to get it and then cache it
    else {
      let url = null;

      if (this.props.fromHome) {
        //If the Post renders from the Home view
        url = "/latestPosts/" + this.props.postId + ".json";
      } else {
        //If the Post renders from anywhere else
        url = "/users/" + this.props.accountName + "/posts/" + this.props.postId + ".json";
      }
      //Get the corresponding Post
      axios.get(url)
        .then(response => {
          //Save the Post data on the state
          this.setState((prevState, props) => {
            return {...response.data}
          });
          this.formatLikes();
          //Save the Post data on localStorage
          sessionStorage.setItem(this.props.postId, JSON.stringify(this.state));
        })
        .catch(error => console.log(error));
    }
  };

  render(props, state) {
    let post = null;
    let ifHeader = null;
    let ifFooter = null;

    //If we have the Post data then create the Post, if not, render null
    if (state) {
      post = (
        <div>
          <PostHeader
            accountName={state.accountName}
            img={state.accountImg}/>
          <PostMedia
            img={state.picURL}
            like={this.addLike}
            liked={state.liked}/>
          <PostFooter
            likes={state.formattedLikes}
            accountName={state.accountName}
            liked={state.liked}
            description={state.description}
            clickedLike={this.toggleLike}
            bookmarked={state.bookmarked}
            uploaded={state.uploadDate}
            clickedBookmark={this.toggleBookmark}/>
        </div>
      );
      // This sets the title of <Header /> to 'Post' if we're not in Home nor Profile
      if (!props.fromHome && !props.fromProfile) {
        ifHeader = <Header view="Post"/>;
        ifFooter = <Footer />;
      }
    }
    return (
      <div>
        {ifHeader}
        {post}
        {ifFooter}
      </div>
    );
  }
};

export default Post;
