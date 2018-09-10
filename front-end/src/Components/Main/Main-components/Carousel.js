import React, { Component } from "react";
import { Carousel, CarouselInner, CarouselItem, Container } from "mdbreact";

class CarouselPage extends Component {
  render() {
    return (
      <Container>
        <h4 className="mt-5 mb-2">Thumbnails Carousel</h4>
        <Carousel
          activeItem={1}
          length={3}
          showControls={true}
          showIndicators={true}
          thumbnails
          className="z-depth-1"
        >
          <CarouselInner>
            <CarouselItem itemId="1">
              <img
                className="d-block w-60"
                src="./favicon/fav/contribution.png"
                alt="Contributions"
              />
            </CarouselItem>
            <CarouselItem itemId="2">
              <img
                className="d-block w-60"
                src="./favicon/fav/complete.png"
                alt="complete"
              />
            </CarouselItem>
            <CarouselItem itemId="3">
              <img
                className="d-block w-60"
                src="./favicon/fav/teamdash.png"
                alt="TeamDash"
              />
            </CarouselItem>
          </CarouselInner>
        </Carousel>
      </Container>
    );
  }
}

export default CarouselPage;
