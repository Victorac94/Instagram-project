import { h, Component } from 'preact';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import ProfileHead from './ProfileHead/ProfileHead';
import ProfileBody from './ProfileBody/ProfileBody';
import axios from '../../../axios-instance';

import * as classes from './Profile.css';

class Profile extends Component {
  state = {
    accountName: this.props.accountName,
    accountImg: null,
    realName: null,
    numberOfPosts: null,
    following: null,
    followers: null,
    bio: null,
    thumbnails: null
  }

  componentDidMount() {
    const url = "/users/" + this.props.accountName + ".json";
    axios.get(url)
      .then(response => {
        this.setState((prevState, props) => {
          return {...response.data};
        });
      })
      .catch(error => console.log(error))
  }

  render(props, state) {
    return (
      <div className={classes.Profile}>
        <Header view="Profile"/>
        <ProfileHead parentState={state}/>
        <ProfileBody parentState={state}/>
        <Footer />
      </div>
    )
  }
}

export default Profile;
