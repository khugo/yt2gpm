import React from "react";
import { connect } from "react-redux";
import { NAVIGATE_TO, SELECT_PLAYLIST } from "../../reducers";

const PlaylistList = props => (
  <div>
    {props.playlists.map(p => <h2 className="playlist" key={p.id} onClick={props.selectPlaylist.bind(null, p)}>{p.name}</h2>)}
  </div>
);

const mapStateToProps = ({ playlists }) => ({
  playlists
});

const mapDispatchToProps = dispatch => ({
  selectPlaylist: playlist => {
    dispatch({
      type: SELECT_PLAYLIST,
      payload: playlist
    });
    dispatch({
      type: NAVIGATE_TO,
      payload: "add_to_playlist"
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistList);