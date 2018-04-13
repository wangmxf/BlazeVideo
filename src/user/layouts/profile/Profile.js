import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Button, Collapse, Alert } from 'reactstrap';
import { MyVideoComponent } from '../../../layouts/ui/videocomp/MyVideoComponent';
import ProfileForm from '../../ui/profileform/ProfileForm';

@connect(
    state => ({
      videos: state.videos.data,
      web3: state.web3.web3Instance,
      name: state.user.data.name
    }))
export default class Profile extends Component {
  state: Object = {
    showEdit: false
  }
  toggleEdit: Function = () => {
    this.setState({
      showEdit: !this.state.showEdit
    })
  }
  render() {
    return(
      <Container>
        <Row>
          <Col xs="12" md="10" lg="10">
            <Row>
              <Col>
                <h2>My Videos</h2>
              </Col>
            </Row>
            { this.props.videos.myList.length === 0
              ? <Alert color="primary">
                You don't have any video yet ---- Buy one in the marketplace!
              </Alert> : null
            }
            <Row>
              { this.props.videos.myList.map((video, index) => {
                return (
                  <Col xs="12" md="6" lg="4" key={video.youtubeId + index }>
                    <MyVideoComponent videoData={video} />
                  </Col>
                )
              })}
            </Row>
          </Col>
          <Col xs="12" md="2" lg="2">
            <Row>
              <Col xs="12" md="12">
                <h4>Hello, {this.props.name}</h4>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="12">
                <Button color="primary" size="sm" outline onClick={this.toggleEdit}>{ this.state.showEdit ? 'Hide' : 'Edit' }</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.showEdit}>
                  <p>Edit your account details here.</p>
                  <ProfileForm />
                </Collapse>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}
