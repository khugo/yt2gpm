import React from "react";
import { connect } from "react-redux";
import PlaylistList from "../PlaylistList";
import AddToPlaylist from "../AddToPlaylist";
import LoadingSpinner from "../LoadingSpinner";
import ErrorView from "../ErrorView";
import SuccessView from "../SuccessView";

const App = props => {
  const views = {
    "playlists": <PlaylistList/>,
    "add_to_playlist": <AddToPlaylist/>,
    "success": <SuccessView/>
  };
  const view = props.error ? <ErrorView/> : props.loading ? <LoadingSpinner/> : views[props.navigation];

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Add to playlist</h1>
      </div>
      <div className="content">
        {view}
      </div>
    </div>
  );
};

const mapStateToProps = ({ navigation, loading, error }) => ({
  navigation,
  loading,
  error
});

export default connect(mapStateToProps)(App);