import React from 'react';
import { Mask, View, Container, Row, Col } from 'mdbreact';


class HoverPage extends React.Component {

  render () {
    return (
      <Container>
        <h2 className="py-4">Basic expamples</h2>
        <Row>
          <Col md="4">
            <View hover>
              <img src="https://mdbootstrap.com/img/Photos/Others/nature-sm.jpg" className="img-fluid" alt="" />
              <Mask className="flex-center" overlay="red-strong">
                <p className="white-text">Strong overlay</p>
              </Mask>
            </View>
          </Col>
          <Col md="4">
            <View hover>
              <img src="https://mdbootstrap.com/img/Photos/Others/nature-sm.jpg" className="img-fluid" alt="" />
              <Mask className="flex-center" overlay="red-light">
                <p className="white-text">Light overlay</p>
              </Mask>
            </View>
          </Col>
          <Col md="4">
            <View hover>
              <img src="https://mdbootstrap.com/img/Photos/Others/nature-sm.jpg" className="img-fluid" alt="" />
              <Mask className="flex-center" overlay="red-slight">
                <p className="white-text">Super light overlay</p>
              </Mask>
            </View>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md="6">
            <View hover zoom>
              <img src="https://mdbootstrap.com/img/Photos/Others/nature-sm.jpg" className="img-fluid" alt="" />
              <Mask className="flex-center">
                <p className="white-text">Zoom effect</p>
              </Mask>
            </View>
          </Col>
          <Col md="6">
            <h5 className="text-center">Shadow effect</h5>
            <img src="https://mdbootstrap.com/img/Photos/Others/nature-sm.jpg" className="img-fluid rounded-circle hoverable" alt="" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HoverPage;
