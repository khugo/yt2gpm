import React from "react";
import { connect } from "react-redux";
import { NAVIGATE_TO, SELECT_PLAYLIST, FETCH_PLAYLISTS, FETCH_PLAYLISTS_SUCCESS, FETCH_PLAYLISTS_ERROR } from "../../reducers";
import * as api from "../../api";
import LoadingSpinner from "../LoadingSpinner";

class PlaylistList extends React.Component {
  componentDidMount() {
    this.props.fetchPlaylists();
  }

  render() {
    const content = this.props.playlists.map(p => <h2 className="playlist" key={p.id} onClick={this.props.selectPlaylist.bind(null, p)}>{p.name}</h2>)
    return (
      <div>
        {this.props.loading ? <LoadingSpinner/> : content}
      </div>
    );
  }
}

const mapStateToProps = ({ playlists, loading }) => ({
  playlists,
  loading
});

const mapDispatchToProps = dispatch => ({
  fetchPlaylists: () => {
    dispatch({ type: FETCH_PLAYLISTS });
    api.fetchPlaylists()
      .then(playlists => dispatch({ type: FETCH_PLAYLISTS_SUCCESS, payload: playlists }))
      .catch(e => dispatch({ type: FETCH_PLAYLISTS_ERROR, payload: e }));
  },
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