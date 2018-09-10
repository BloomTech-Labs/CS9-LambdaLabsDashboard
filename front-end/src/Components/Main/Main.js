import React, { Component } from "react";
import { CardBody, CardTitle, CardText, Button, CardImage, Card, Fa } from "mdbreact";

class Main extends Component {
  state = {};
  render() {
    return <div class="main-container">
        <header>
          {/* <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
            <div class="container">
              <a class="navbar-brand" href="#">
                Navbar
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon" />
              </button>
              <div class="collapse navbar-collapse" id="basicExampleNav">
                <ul class="navbar-nav mr-auto smooth-scroll">
                  <li class="nav-item">
                    <a class="nav-link" href="#intro">
                      Home
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#best-features">
                      Features
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#examples">
                      Examples
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#gallery">
                      Gallery
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact">
                      Contact
                    </a>
                  </li>
                </ul>

                <ul class="navbar-nav nav-flex-icons">
                  <li class="nav-item">
                    <a class="nav-link">
                      <i class="fa fa-facebook" />
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <i class="fa fa-twitter" />
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link">
                      <i class="fa fa-instagram" />
                    </a>
                  </li>
                </ul>
                <form class="form-inline my-1">
                  <a href="/Signin" class="btn btn-blue" type="submit">
                    Sign In
                  </a>
                </form>
              </div>
            </div>
          </nav> */}
          <nav class="navbar navbar-expand-lg navbar-dark mdb-color darken-4 fixed-top">
            <a class="navbar-brand" href="#">
              <img src="./favicon/fav/logo.png" width="75px" height="75px" position="inherit" alt="" />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="basicExampleNav">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Home
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Features
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Pricing
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Team
                  </a>
                </li>
              </ul>
              <form class="form-inline my-1">
                <a href="/Signin" class="btn btn-blue" type="submit">
                  Sign In
                </a>
              </form>
            </div>
          </nav>
          <Card reverse>
            <CardImage cascade className="img-fluid" src="./favicon/fav/team.jpg" height="100vh" width="100%" />
            <CardBody cascade>
              <CardTitle><div className="view overlay postion-inherit card-body text-center">
                  Want an easier way to track your team's contributions on
          GitHub and Trello all in one place?
        </div>
                </CardTitle>

              <Button className="text-center inline" href="/billing">Subscription Options</Button>
            </CardBody>
          </Card>
          {/* <div class="card-body text-center dark mdb-color darken-4">
            <h1 class="card-title text-white text-center">
              <strong>
                Want an easier way to track your team's contributions on
                GitHub and Trello all in one place?
              </strong>
              <h2>Checkout Merge</h2>
            </h1>
          </div> */}
          {/* <div class="col-lg-12 col-md-6"> */}
            <div className="image-dash">
              <img src="./favicon/fav/dashboard.png" class="img-fluid" dashboard alt="" />
            </div>
            <a href="/billing" class=" btn blue btn-rounded">
              Subscription Options
            </a>
          {/* </div> */}
        </header>
      </div>;
  }
}
export default Main;
