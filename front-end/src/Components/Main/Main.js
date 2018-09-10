import React, { Component } from "react";
import { CardBody, CardTitle, Button, CardImage, Card } from "mdbreact";

class Main extends Component {
  state = {};
  render() {
    return (
      <div class="main-container">
        <header>
          <nav class="navbar navbar-expand-lg navbar-dark mdb-color darken-4 fixed-top">
            <a class="navbar-brand" href="#">
              <img
                src="./favicon/fav/logo.png"
                width="75px"
                height="75px"
                position="inherit"
                alt=""
              />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#basicExampleNav"
              aria-controls="basicExampleNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="basicExampleNav">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a class="nav-link" href="/billing">
                    Pricing
                  </a>
                </li>
                {/* <li class="nav-item">
                  <a class="nav-link" href="#">
                    Team
                  </a>
                </li> */}
              </ul>
              <form class="form-inline my-1">
                <button
                  href="/Signin"
                  className="btn btn-black"
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
          <Card reverse>
            <CardImage
              cascade
              className="img-fluid"
              src="./favicon/fav/team.jpg"
              height="100vh"
              width="100%"
            />
            <CardBody cascade>
              <CardTitle>
                <div className="card-body text-center">
                  Want an easier way to track your team's contributions on
                  GitHub and Trello all in one place?
                </div>
              </CardTitle>
            </CardBody>
          </Card>
          <div class="card-body text-center dark mdb-color darken-4">
            <h1 class="card-title text-white text-center">
              <strong>Checkout Merge</strong>
            </h1>
          </div>
          <div class="col-lg-12 col-md-6">
            <div className="image-dash">
              <img
                src="./favicon/fav/dashboard.png"
                class="img-fluid"
                dashboard
                alt=""
              />

              {/* <a href="/billing" class=" btn blue btn-rounded">
              Subscription Options
            </a>*/}
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default Main;
