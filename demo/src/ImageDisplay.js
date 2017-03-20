// A dumb component

const React = require('react');

const GIPHY_LOADING_URL = `/assets/loading.gif`;
const styles = {
  minHeight: '310px',
  marginTop: '1em'
};

class ImageDisplay extends React.Component {
  giphySourceUrl= () => {
    return this.props.sourceUrl || GIPHY_LOADING_URL;
  }

  render () {
    const url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;
    const width = this.props.width || 200;
    return (
      <div style={styles}>
        <a href={this.giphySourceUrl()} title='view this on giphy' target='new'>
          <img id='gif' src={url} style={{width: '100%', maxWidth: '350px'}}/>
        </a>
      </div>
    );
  }
}

export default ImageDisplay;
