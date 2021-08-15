import React from "react";
import "./Footer.css";
// import PropTypes from 'prop-types';

export default function Footer() {
  return (
    <div className="app-footer">
      <div className="footer-content">
        <p>Made with &#x1F49A; in Melbourne.</p>
        <p style={{ fontStyle: "italic" }}>
          &copy; {new Date().getFullYear()} Broccoli & Co. All rights reserved.
        </p>
      </div>
    </div>
  );
}

Footer.propTypes = {};
Footer.defaultProps = {};
