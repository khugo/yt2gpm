import React from "react";
import { connect } from "react-redux";

const AddToPlaylist = props => (
  <div>
    Test
  </div>
);

const mapStateToProps = ({ selectedPlaylist }) => ({
  selectedPlaylist
});

export default connect(mapStateToProps)(AddToPlaylist);