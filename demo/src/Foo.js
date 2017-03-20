// A Full fledged react container

import React, { PropTypes , Component} from 'react';
import styles from './styles.scss';
import { getGif } from './getGif';
import SearchBar from './SearchBar';
import ImageDisplay from './ImageDisplay';

const propTypes = {};

const defaultProps = {};

class Foo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "The den is dark",
      loading: true,
      term: '',
      gif: {}
    }
  }

  _handleSearch(term){
    this.setState({loading: true});
    getGif(term).then((gif) => {
      this.setState({loading: false, gif, term});
    });
  }

  enterTheDragon(){
    this.setState({
      title: "DRAGON HAS ENTERED"
    })
  }

  render() {
    return (
      <div className={styles.foo}>
        <h1>Example app using mocha-factory</h1>
        <h2 className={styles.dentext}>{this.state.title}</h2>
        <button className={styles.myButton} onClick={this.enterTheDragon.bind(this)}>Enter the Dragon</button>
        <hr/>
        <h1>gif grabbr!</h1>
        <p>Find a GIF on <a href='http://giphy.com'>giphy</a>. Keep pressing enter for more results.</p>
        <div>
          <SearchBar onSearch={this._handleSearch.bind(this)}/>
        </div>
        <ImageDisplay
          loading={this.state.loading}
          url={this.state.gif.url}
          width={this.state.gif.width}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
}

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;
