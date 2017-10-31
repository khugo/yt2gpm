import React from "react";
import { connect } from "react-redux";
import { SET_VIDEO_TITLE, SET_VIDEO_ARTIST } from "../../reducers";

const EditSongForm = props => {
  return (
    <form>
      <label>
        Title
        <input type="text" placeholder="Title" value={props.title} onChange={props.setTitle} autoFocus/>
      </label>
      <label>
        Artist
        <input type="text" placeholder="Artist" value={props.artist} onChange={props.setArtist}/>
      </label>
    </form>
  );
};

const mapStateToProps = ({ title, artist }) => ({ title, artist });

const mapDispatchToProps = dispatch => ({
  setTitle: event => dispatch({ type: SET_VIDEO_TITLE, payload: event.target.value }),
  setArtist: event => dispatch({ type: SET_VIDEO_ARTIST, payload: event.target.value })
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSongForm);