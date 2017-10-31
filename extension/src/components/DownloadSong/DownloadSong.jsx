import React from "react";
import { connect } from "react-redux";
import EditSongForm from "../EditSongForm";
import LoadingSpinner from "../LoadingSpinner";
import { DOWNLOAD, DOWNLOAD_SUCCESS, DOWNLOAD_ERROR } from "../../reducers";
import { startDownloadingSong, ROOT_URL } from "../../api";
import { downloadFile } from "../../util";

const DownloadSong = props => (
  props.loading ? <LoadingSpinner label="Downloading song" /> :
    <div className="form-container">
      <EditSongForm />
      <div className="buttons">
        <button className="action primary" onClick={props.startDownload.bind(null, props.playlistId, props.url, props.title, props.artist)}>Download</button>
      </div>
    </div>
);

const mapStateToProps = ({ url, title, artist, loading }) => ({
  url,
  title,
  artist,
  loading
});

const mapDispatchToProps = dispatch => ({
  startDownload: (playlistId, videoUrl, title, artist) => {
    dispatch({ type: DOWNLOAD });
    startDownloadingSong(videoUrl, title, artist)
      .then(filename => {
        dispatch({ type: DOWNLOAD_SUCCESS });
        console.log(`${ROOT_URL}/${filename}`);
        downloadFile(`${ROOT_URL}/${filename}`);
      })
      .catch(e => dispatch({ type: DOWNLOAD_ERROR, payload: e }))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadSong);