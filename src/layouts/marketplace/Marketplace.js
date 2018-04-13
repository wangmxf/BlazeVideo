import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { asyncLoadVideoList, asyncAddNewVideoTrusted } from './MarketplaceActions';

// CSS
import './Marketplace.css';
// UI component
import VideoComponent from '../ui/videocomp/VideoComponent';
import BuyVideoDialog from '../ui/buyvideodialog/BuyVideoDialog';

@connect(
    state => ({
      videos: state.videos.data,
      web3: state.web3.web3Instance
    }),
    {
        asyncLoadVideoList,
        asyncAddNewVideoTrusted
    })
export default class Marketplace extends Component {
  constructor(props, { authData }) {
    super(props);
    authData = this.props;
    this.state = {
      videoId: '',
      videoCount: 0
    }
  }
  componentWillMount() {
    this.props.asyncLoadVideoList();
  }
  onIdChange: Function = (event) => {
    this.setState({ videoId: event.target.value });
  }
  onCountChange: Function = (event) => {
    this.setState({ videoCount: event.target.value });
  }
  submitNewVideo: Function = (event) => {
    event.preventDefault();
    const YOUTUBE_PREFIX = "YUTB_";
    const { videoId, videoCount } = this.state;
    const YOUTUBE_VIDEO_ID = this.props.web3.fromAscii(YOUTUBE_PREFIX + videoId);
    this.props.asyncAddNewVideoTrusted(YOUTUBE_VIDEO_ID, videoCount);
  }
  render() {
    const testVideos = [
      {
        youtubeId: 'HPPj6viIBmU',
        videoCount: 2234,
        price: 0.02
      },
      {
        youtubeId: 'J-dv_DcDD_A',
        videoCount: 2323,
        price: 0.07
      },
      {
        youtubeId: 'EzuIduviKz8',
        videoCount: 12345122,
        price: 0.01
      }
    ]
    return(
      <Container>
        <Row>
          <Col>
            <h2>Marketplace</h2>
          </Col>
        </Row>
        <Row>
          { testVideos.map((video, index) => {
            return (
              <Col xs="12" md="6" lg="4" key={video.youtubeId + index }>
                <VideoComponent videoData={video} />
              </Col>
            )
          })}
        </Row>
        {/* <Row>
          <div className="pure-u-1-1">
            <form className="pure-form pure-form-stacked" onSubmit={this.submitNewVideo}>
              <fieldset>
                <label htmlFor="name">Youtube ID</label>
                <input id="name" type="text" value={this.state.videoId} onChange={this.onIdChange} placeholder="Id" />
                <span className="pure-form-message">This is a required field.</span>

                <br />
                <label htmlFor="name">View Counts</label>
                <input id="name" type="number" value={this.state.videoCount} onChange={this.onCountChange} placeholder="Count" />
                <span className="pure-form-message">This is a required field.</span>

                <br />
                <button type="submit" className="pure-button pure-button-primary">Add Video</button>
              </fieldset>
            </form>
          </div>
        </Row> */}
        <BuyVideoDialog className="buy-dialog" />
      </Container>
    )
  }
}
