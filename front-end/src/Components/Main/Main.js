import React, { Component } from 'react';
import {Button, Jumbotron} from 'react-bootstrap';

class Main extends Component {
    state = {}
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="title">Lambda Labs Dashboard</h1></Jumbotron>
                <h1 className="container">
                    Too many sites to track your team's contributions?
                </h1>
                <p className="container">
                    {" "}
                    Our Dashboard can help you out!
                    <p>Track your teams contributions using Trello Board and GitHub to see activity on one page</p>
                </p>
                <p className="container">
                    <Button>Check out our pricing options</Button>
                </p>
                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="./pictures/dashboardcontributions.png">
                            <img src="./pictures/dashboardcontributions.png" alt="Cinque Terre" width="600" height="400" />
                        </a>
                        <div class="desc">Add a description of the image here</div>
                    </div>
                </div>


                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="./pictures/dashboardcontributions.png" >
                            <img src="./pictures/dashboardcontributions.png" alt="Cinque Terre" width="600" height="400" />
                        </a>
                        <div class="desc">Add a description of the image here</div>
                    </div>
                </div>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="./pictures/dashboardcontributions.png" >
                            <img src="C:/dev/CS9-LambdaLabsDashboard/front-end/src/pictures/dashboardcontributions.png" alt="Cinque Terre" width="600" height="400" />
                        </a>
                        <div class="desc">Add a description of the image here</div>
                    </div>
                </div>

                <div class="responsive">
                    <div class="gallery">
                        <a target="_blank" href="./pictures/dashboardcontributions.png" >
                            <img src="C:/dev/CS9-LambdaLabsDashboard/front-end/src/pictures/dashboardcontributions.png" alt="Cinque Terre" width="600" height="400" />
                        </a>
                        <div class="desc">Add a description of the image here</div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Main;