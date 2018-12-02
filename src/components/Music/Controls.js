import React, { Component } from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon, Button, Spinner } from "native-base";

const Controls = ({
  paused,
  onPressPlay,
  onPressPause,
  playerState,
  toggleModal,
  like,
  onLike
}) => (
  <View style={styles.container}>
    <Button
      small
      transparent
      onPress={onLike}
      style={{ marginTop: 21, marginLeft: -10 }}
    >
      <Icon
        name="ios-heart"
        style={like ? { color: "#d00e26" } : { color: "#eee" }}
      />
    </Button>
    <View style={{ width: 20 }} />
    {/* <TouchableOpacity onPress={onBack}>
      <Image
        source={require("../assets/img/musicControls/ic_skip_previous_white_36pt.png")}
      />
    </TouchableOpacity> */}
    <View style={{ width: 20 }} />
    {playerState == "BUFFERING" ? (
      <View style={styles.playButton}>
        <Spinner color="#eee" />
      </View>
    ) : playerState == "PLAYING" ? (
      <TouchableOpacity onPress={onPressPause}>
        <View style={styles.playButton}>
          <Image
            source={require("../assets/img/musicControls/ic_pause_white_48pt.png")}
          />
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onPressPlay}>
        <View style={styles.playButton}>
          <Image
            source={require("../assets/img/musicControls/ic_play_arrow_white_48pt.png")}
          />
        </View>
      </TouchableOpacity>
    )}
    <View style={{ width: 20 }} />
    {/* <TouchableOpacity onPress={onForward} disabled={forwardDisabled}>
      <Image
        style={[forwardDisabled && { opacity: 0.3 }]}
        source={require("../assets/img/musicControls/ic_skip_next_white_36pt.png")}
      />
    </TouchableOpacity> */}
    <View style={{ width: 40 }} />
    <TouchableOpacity onPress={toggleModal}>
      <Image
        style={[styles.secondaryControl]}
        source={require("../assets/img/musicControls/ic_more_horiz_white.png")}
      />
    </TouchableOpacity>
  </View>
);

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 72 / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryControl: {
    height: 18,
    width: 18
  },
  off: {
    opacity: 0.3
  }
});
