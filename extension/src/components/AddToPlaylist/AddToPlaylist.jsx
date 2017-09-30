import React from "react";
import { connect } from "react-redux";
import { NAVIGATE_TO, ADD_TO_PLAYLIST, ADD_TO_PLAYLIST_SUCCESS, ADD_TO_PLAYLIST_ERROR } from "../../reducers";
import EditSongForm from "../EditSongForm";
import { addToPlaylist } from "../../api";

const AddToPlaylist = props => (
  <div>
    <EditSongForm/>
    <div>
      <button className="action" onClick={props.submit.bind(null, props.playlistId, props.url, props.title, props.artist)}>Add to playlist</button>
      <button className="action" onClick={props.goBackToPlaylists}>Back to playlists</button>
    </div>
  </div>
);

const mapStateToProps = ({ selectedPlaylist, url, title, artist }) => ({
  playlistId: selectedPlaylist.id,
  url,
  title,
  artist
});

const mapDispatchToProps = dispatch => ({
  goBackToPlaylists: () => dispatch({
    type: NAVIGATE_TO,
    payload: "playlists"
  }),
  submit: (playlistId, videoUrl, title, artist) => {
    dispatch({ type: ADD_TO_PLAYLIST });
    addToPlaylist(playlistId, videoUrl, title, artist)
      .then(() => dispatch({ type: ADD_TO_PLAYLIST_SUCCES }))
      .catch(e => dispatch({ type: ADD_TO_PLAYLIST_ERROR, payload: e }))
  }  
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToPlaylist);