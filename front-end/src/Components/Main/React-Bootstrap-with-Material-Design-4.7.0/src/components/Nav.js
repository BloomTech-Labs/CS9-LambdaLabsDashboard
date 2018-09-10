import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Nav extends Component {

  render() {

    const {
      children,
      className,
      tag: Tag,
      tabs,
      color,
      classicTabs,
      pills,
      header,
      ...attributes
    } = this.props;

    const classes = classNames(
      'nav',
      tabs && 'nav-tabs',
      pills && 'md-pills',
      header && 'nav-pills card-header-pills',
      pills && color ? 'pills-'+color : false,
      (tabs || classicTabs) && color ? 'tabs-'+this.props.color : false,
      className,
    );

    return (
      <Tag {...attributes} className={classes}>
        {children}
      </Tag>
    );
  }
}

Nav.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  classicTabs: PropTypes.bool,
  pills: PropTypes.bool,
  tabs: PropTypes.bool,
  header: PropTypes.bool
};

Nav.defaultProps = {
  tag: 'ul',
  classicTabs: false,
  pills: false,
  tabs: false,
  header: false
};

export default Nav;
export { Nav as MDBNav };
