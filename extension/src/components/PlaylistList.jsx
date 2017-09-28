import React from "react";
import { connect } from "react-redux";
import { NAVIGATE_TO } from "../reducers";

const PlaylistList = props => (
  <div>
    {props.playlists.map(p => <h2 className="playlist" key={p.id} onClick={props.selectPlaylist.bind(p)}>{p.name}</h2>)}
  </div>
);

const mapStateToProps = ({ playlists }) => ({
  playlists
});

const mapDispatchToProps = dispatch => ({
  selectPlaylist: playlist => {
    dispatch({
      type: NAVIGATE_TO,
      payload: "add_to_playlist"
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);