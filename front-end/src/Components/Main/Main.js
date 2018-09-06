import React, { Component } from 'react';


class Main extends Component {
    state = {}
    render() {
        return (
            <div className="main-container">
                <header>
                    <nav class="navbar navbar-expand-lg navbar-dark mdb-color darken-3 fixed-top">
                        <a class="navbar-brand" href="#"><img src="../src/pictures/logo.png" height="30" alt=""></img></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="basicExampleNav">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#">Home
                                        <span class="sr-only">(current)</span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Features</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Pricing</a>
                                </li>
                            </ul>
                            {/* <form class="form-inline">
                                <div class="md-form mt-0">
                                    <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"></input>
                                </div>
                            </form> */}
                        </div>
                    </nav>
                    <div id="intro" class="view">
                        <div class="mask">
                        </div>
                    </div>
                </header>
                <div class="container">
                    <div class="row">
                        <div class="col-md-7">
                        </div>
                        <div class="col-md-5">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-12">
                        </div>
                        <div class="col-lg-4 col-md-6">
                        </div>
                        <div class="col-lg-4 col-md-6">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Main;