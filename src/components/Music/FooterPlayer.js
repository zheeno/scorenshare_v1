import React from "react";
import { View, Button, Icon, Left, Body, Text } from "native-base";
import { styles } from "../../themes/variables/customStyles";
import { Grid, Row, Col } from "react-native-easy-grid";
import SeekBar from "./SeekBar";
import {
  onBack,
  onForward,
  seek,
  setTime,
  setDuration
} from "../../services/PlayerMethods";
// import Video from "react-native-video";

import Controls from "./Controls";

const FooterPlayer = ({
  content,
  currentPosition,
  totalLength,
  Repeat,
  repeatState,
  shuffleState,
  forwardDisabled,
  shuffle,
  trackPlayed,
  trackPaused,
  paused,
  isChanging,
  tracks,
  selectedTrack,
  toggleModal,
  like,
  onLike
}) => {
  const track = tracks[selectedTrack];
  // const video = isChanging ? null : (
  //   <Video
  //     source={{ uri: track.audioUrl }} // Can be a URL or a local file.
  //     ref={ref => {
  //       this.player = ref;
  //     }}
  //     paused={paused} // Pauses playback entirely.
  //     resizeMode="cover" // Fill the whole screen at aspect ratio.
  //     repeat={true} // Repeat forever.
  //     onLoadStart={this.loadStart} // Callback when video starts to load
  //     onLoad={setDuration.bind(this)} // Callback when video loads
  //     onProgress={setTime.bind(this)} // Callback every ~250ms with currentTime
  //     // onEnd={this.onEnd} // Callback when playback finishes
  //     // onError={this.videoError} // Callback when video cannot be loaded
  //     style={styles.audioElement}
  //   />
  // );

  return (
    <Row
      style={[
        styles.darkBg,
        {
          flex: 1,
          flexDirection: "column"
        }
      ]}
    >
      <SeekBar
        onSeek={seek.bind(this)}
        trackLength={totalLength}
        onSlidingStart={trackPaused}
        currentPosition={currentPosition}
      />
      <View
        style={{
          alignItems: "center",
          marginBottom: 15
        }}
      >
        <Text numberOfLines={1} style={[styles.greyText, { fontSize: 20 }]}>
          {content.music.title}
        </Text>
        <Text numberOfLines={1} style={[styles.darkText, { fontSize: 13 }]}>
          {content.owner.name}
        </Text>
      </View>
      <Controls
        onPressRepeat={Repeat}
        repeatOn={repeatState}
        shuffleOn={shuffleState}
        forwardDisabled={forwardDisabled}
        onPressShuffle={shuffle}
        onPressPlay={trackPlayed}
        onPressPause={trackPaused}
        onBack={onBack.bind(this)}
        onForward={onForward.bind(this)}
        paused={paused}
        toggleModal={toggleModal}
        like={like}
        onLike={onLike}
      />
      {/* {video} */}
    </Row>
  );
};

export default FooterPlayer;
