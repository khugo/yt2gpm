import React from "react";
import { connect } from "react-redux";
import PlaylistList from "./PlaylistList.jsx";
import AddToPlaylist from "./AddToPlaylist.jsx";

const App = props => {
  let view;
  switch (props.navigation) {
    case "playlists":
      view = <PlaylistList/>;
      break;
    case "add_to_playlist":
      view = <AddToPlaylist/>;
      break;
  }

  return <div>
    <div className="header">
      <h1 className="title">Add to playlist</h1>
    </div>  
    {view}
  </div>;
};

const mapStateToProps = ({ navigation }) => ({
  navigation
});

export default connect(mapStateToProps)(App);