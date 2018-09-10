import React from 'react';
import {BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

// FREE
import AnimationPage from './pages/AnimationPage';
import HomePage from './pages/HomePage';
import ButtonPage from './pages/ButtonPage';
import CSSPage from './pages/CSSPage';
import TablePage from './pages/TablePage';
import TableResponsivePage from './pages/TableResponsivePage';
import TableScrollPage from './pages/TableScrollPage';
import TableStylesPage from './pages/TableStylesPage';
import BadgePage from './pages/BadgePage';
import BreadcrumbPage from './pages/BreadcrumbPage';
import FaPage from './pages/FaPage';
import ComponentsPage from './pages/ComponentsPage';
import DatatablePage from './pages/DatatablePage';
import DatatableApiPage from './pages/DatatableApiPage';
import ModalPage from './pages/ModalPage';
import AdvancedPage from './pages/AdvancedPage';
import ProgressPage from './pages/ProgressPage';
import InputPage from './pages/InputPage';
import MediaPage from './pages/MediaPage';
import JumbotronPage from './pages/JumbotronPage';
import AlertPage from './pages/AlertPage';
import CardsPage from './pages/CardsPage';
import PaginationPage from './pages/PaginationPage';
import PopoverPage from './pages/PopoverPage';
import ListGroupPage from './pages/ListGroupPage';
import CarouselPage from './pages/CarouselPage';
import PanelPage from'./pages/PanelPage';
import CollapsePage from './pages/CollapsePage';
import TooltipsPage from './pages/TooltipsPage';
import FooterPage from './pages/FooterPage';
import MasksPage from './pages/MasksPage';
import DropdownPage from './pages/DropdownPage';
import VideoCarouselPage from './pages/VideoCarouselPage';
import HoverPage from './pages/HoverPage';
import FormsPage from './pages/FormsPage';
import ChartsPage from './pages/ChartsPage';
import SearchPage from './pages/SearchPage';
import ValidationPage from './pages/ValidationPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {/* FREE */}
        <Route path='/css/animations' component={AnimationPage} />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/css' component={CSSPage} />
        <Route exact path='/css/table' component={TablePage} />
        <Route exact path='/components' component={ComponentsPage} />
        <Route path='/css/table-responsive' component={TableResponsivePage} />
        <Route path='/css/table-scroll' component={TableScrollPage} />
        <Route path='/css/table-styles' component={TableStylesPage} />
        <Route path='/components/badge' component={BadgePage} />
        <Route path='/components/breadcrumb' component={BreadcrumbPage} />
        <Route path='/components/media' component={MediaPage} />
        <Route path='/components/input' component={InputPage} />
        <Route path='/components/alert' component={AlertPage} />
        <Route path='/components/dropdown' component={DropdownPage} />
        <Route path='/css/icons' component={FaPage} />
        <Route path='/css/jumbotron' component={JumbotronPage} />
        <Route path='/components/cards' component={CardsPage} />
        <Route path='/components/buttons' component={ButtonPage} />
        <Route path='/components/forms' component={FormsPage} />
        <Route path='/components/progress' component={ProgressPage} />
        <Route path='/components/popover' component={PopoverPage} />
        <Route path='/components/pagination' component={PaginationPage} />
        <Route path='/components/list-group' component={ListGroupPage} />
        <Route path='/components/tooltips' component={TooltipsPage} />
        <Route path='/components/footer' component={FooterPage} />
        <Route exact path='/advanced' component={AdvancedPage} />
        <Route path='/advanced/modal' component={ModalPage} />
        <Route path='/advanced/carousel' component={CarouselPage} />
        <Route path='/advanced/collapse' component={CollapsePage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/css/masks' component={MasksPage} />
        <Route path='/css/hover' component={HoverPage} />
        <Route path='/advanced/videocarousel' component={VideoCarouselPage} />
        <Route path='/advanced/charts' component={ChartsPage} />
        <Route path='/components/panels' component={PanelPage} />
        <Route path='/components/search' component={SearchPage} />
        <Route path='/components/validation' component={ValidationPage} />
        <Route path='/advanced/datatable' component={DatatablePage} />
        <Route path='/advanced/datatable-api' component={DatatableApiPage} />
        <Route render = { function() {
          return <h1>Not Found</h1>;
        }} />
      </Switch>
    );
  }
}

export default Routes;
