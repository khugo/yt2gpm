import React from "react";
import { connect } from "react-redux";
import { DISMISS_ERROR } from "../../reducers";

const ErrorView = props => (
  <div className="error">
    <p>{props.error}</p>
    <button onClick={props.dismiss}>Dismiss</button>
  </div>
);

const mapStateToProps = ({ error }) => ({ error });

const mapDispatchToProps = dispatch => ({
  dismiss: () => dispatch({ type: DISMISS_ERROR })
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorView);