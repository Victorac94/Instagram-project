import { h } from 'preact';
import { Link } from 'preact-router';

import '../../style/icon-styles.css';
import classes from './Footer.css';

const footer = (props) => (
  <div className={classes.Footer}>
    <div>
      <Link href="/">
        <span className="icon-home"></span>
      </Link>
      <span className="icon-search"></span>
      <span className="icon-plus-square-o"></span>
      <span className="icon-heart-o"></span>
      <span className="icon-user"></span>
    </div>
  </div>
)

export default footer;
