import { h, render, Component } from 'preact';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Post from '../../components/containers/Post/Post';
import axios from '../../axios-instance';

class Home extends Component {
  state = {
    latestPostsId: null
  }

  componentDidMount() {
    axios.get("/latestPosts.json")
      .then(response => {
        const latestPostsId = Object.keys(response.data);
        this.setState({latestPostsId: latestPostsId});
      })
      .catch(error => console.log(error));
  }

  render(props, state) {
    let posts = [];

    //Create the list of Posts that appear in the Home view
    if (state.latestPostsId) {
      for (let i = 0; i < state.latestPostsId.length; i++) {
        const post = <Post fromHome={true} postId={state.latestPostsId[i]}/>;
        posts.push(post);
      }
      //Invert the order of the array elements so that the last uploaded posts show first
      const invertedPostsArray = [];

      for (let i = posts.length - 1; i >= 0; i--) {
        invertedPostsArray.push(posts[i]);
      }
      posts = invertedPostsArray;
    }

    return (
      <div>
        <Header view="Home"/>
        {posts}
        <Footer />
      </div>
    )
  }
}

export default Home;
