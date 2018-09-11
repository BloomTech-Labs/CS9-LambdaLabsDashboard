import React, { PureComponent } from "react";
import { Container, Row, Col, Fa, Card, CardUp, CardBody } from "mdbreact";

class Main extends PureComponent {
  state = {};
  render() {
    return (
      <div className="main-container">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark mdb-color darken-4 fixed-top">
            <a className="navbar-brand" href="#">
              <img
                src="./favicon/fav/logo.png"
                width="75px"
                height="75px"
                position="inherit"
                alt=""
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#basicExampleNav"
              aria-controls="basicExampleNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="basicExampleNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <h5 className="h1-responsive  text-white text-center ">
                    Merge
                  </h5>
                </li>
              </ul>
              <form className="form-inline my-1">
                <button
                  href="/Signin"
                  className="btn btn-blue"
                  type="submit"
                  onClick={() => {
                    this.props.history.push("/signin");
                  }}
                >
                  Sign In
                </button>
              </form>
            </div>
          </nav>
          <div className="hero-image">
            <div className="hero-text">
              <h1>Welcome to Merge</h1>
              <h2>
                Trying to track your Team's individual contributions <br />
                but too many to track?
              </h2>
              <button
                href="/billing"
                className="btn btn-blue center"
                type="submit"
                onClick={() => {
                  this.props.history.push("/billing");
                }}
              >
                Try a free trial
              </button>
            </div>
          </div>
          <Container>
            <section className="my-5 p-5 text-white">
              <h2 className="h1-responsive font-weight-bold text-center my-5">
                Why is it so great?
              </h2>
              <p className="white-text w-responsive text-center mx-auto mb-5">
                Because we Merge your teams GitHub and Trello information and
                display it on a stylish Dashboard.
              </p>
              <Row>
                <Col lg="5" className="text-center text-lg-left">
                  <img
                    className="img-fluid"
                    src="./favicon/fav/dashboard.png"
                    alt="Sample"
                  />
                </Col>
                <Col lg="5">
                  <Row className="mb-3">
                    <Col size="1">
                      <Fa
                        icon="mail-forward"
                        size="lg"
                        className="indigo-text"
                      />
                    </Col>
                    <Col xl="10" md="11" size="10">
                      <h5 className="font-weight-bold mb-3">Convience</h5>
                      <p className="grey-text">
                        No need for multiple tabs open on your browser.
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col size="1">
                      <Fa
                        icon="mail-forward"
                        size="lg"
                        className="indigo-text"
                      />
                    </Col>
                    <Col xl="10" md="11" size="10">
                      <h5 className="font-weight-bold mb-3">Easy to Use</h5>
                      <p className="grey-text">
                        All you need is to link your Team's Trello Board URL and
                        your Repository name from GitHub.
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col size="1">
                      <Fa
                        icon="mail-forward"
                        size="lg"
                        className="indigo-text"
                      />
                    </Col>
                    <Col xl="10" md="11" size="10">
                      <h5 className="font-weight-bold mb-3">
                        Friendly Competition
                      </h5>
                      <p className="grey-text">
                        Create a fun competition to keep your team moral high by
                        being able to see the top contributors.
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </section>
          </Container>
          <Container>
            <section id="team">
              <h2 className="h1-responsive blue-text font-weight-bold text-center my-5 text-uppercase">
                Our Team
              </h2>
              <Row>
                <Col lg="3" md="6" className="mb-lg-0 mb-4">
                  <img
                    src="./favicon/fav/jaxpic.jpg"
                    className="rounded-circle z-depth-1 img-fluid m-.5"
                    alt="Jackee"
                  />
                  <h5 className="font-weight-bold text-center blue-text mt-4 mb-3">
                    Jackee Rohrich
                  </h5>
                  <p className="text-uppercase text-center blue-text">
                    Web Developer
                  </p>
                </Col>
                <Col lg="3" md="6" className="mb-lg-0 mb-5">
                  <img
                    src="./favicon/fav/Yasin.jpg"
                    className="rounded-circle z-depth-2 img-fluid cover"
                    alt="Sample avatar"
                  />
                  <h5 className="font-weight-bold text-center blue-text mt-4 mb-3">
                    Yasin Shuman
                  </h5>
                  <p className="text-uppercase text-center blue-text">
                    Web Developer
                  </p>
                </Col>
                <Col lg="3" md="6" className="mb-lg-0 mb-5">
                  <img
                    src="./favicon/fav/logo.png"
                    className="rounded-circle z-depth-1 img-fluid"
                    alt="Sample avatar"
                  />
                  <h5 className="font-weight-bold text-center blue-text mt-4 mb-3">
                    Alex Figliolia
                  </h5>
                  <p className="text-uppercase text-center blue-text">
                    Web Developer
                  </p>
                </Col>
                <Col lg="3" md="6" className="mb-lg-0 mb-5">
                  <img
                    src="./favicon/fav/hilal.jpg"
                    className="rounded-circle z-depth-1 img-fluid"
                    alt="Sample avatar"
                  />
                  <h5 className="font-weight-bold blue-text text-center mt-4 mb-3 center">
                    Hilal Assani
                  </h5>
                  <p className="text-uppercase text-center blue-text">
                    Web Developer
                  </p>
                </Col>
                <Col lg="3" md="6" className="mb-lg-0 mb-5">
                  <img
                    src="./favicon/fav/untitled1.png"
                    className="rounded-circle z-depth-1 img-fluid mt-5 large"
                    alt="amanda"
                  />
                  <h5 className="font-weight-bold blue-text text-center mt-4 mb-3">
                    Amanda Moc
                  </h5>
                  <p className="text-uppercase blue-text text-center pb-5">
                    Web Developer
                  </p>
                </Col>
              </Row>
            </section>
          </Container>
          {/* </div> */}
          {/* </div> */}
        </header>
        <footer className="page-footer font-small blue bottom px-25">
          <div className="footer-copyright text-center py-3 mdb-color darken-4">
            © 2018 Copyright:
            <a href="https://mdbootstrap.com/bootstrap-tutorial/">
              {" "}
              MergeApp.app
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Main;
