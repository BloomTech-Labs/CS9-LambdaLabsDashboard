import React from 'react';
import { Tooltip } from 'mdbreact';


class TooltipsPage extends React.Component {


  render() {
    const style = {display: 'inline-block', maxWidth: '50vh'}
    return (
      <div className="m-5 text-center">
        <Tooltip
          placement="top"
          componentClass="btn btn-primary"
          tag="div"
          component="button"
          tooltipContent="Tooltip on top">
            Tooltip on top
        </Tooltip>
        <div style={style} className="text-right">
        <Tooltip
          placement="left"
          componentClass="btn btn-primary"
          tag="div"
          component="button"
          tooltipContent="Tooltip on left">
            Tooltip on left
        </Tooltip>
        </div>
        <div style={style} className="text-left">
        <Tooltip
          placement="right"
          componentClass="btn btn-primary"
          tag="div"
          component="button"
          tooltipContent="Tooltip on right">
            Tooltip on right
        </Tooltip>
        </div>
        <Tooltip
          placement="bottom"
          componentClass="btn btn-primary"
          tag="div"
          component="button"
          tooltipContent="Tooltip on bottom">
            Tooltip on bottom
        </Tooltip>
      </div>
    );
  }
}
export default TooltipsPage;
