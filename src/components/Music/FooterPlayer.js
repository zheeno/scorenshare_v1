import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "native-base";
import { styles } from "../../themes/variables/customStyles";
import { Row } from "react-native-easy-grid";
// import SeekBar from "./SeekBar";
import Controls from "./Controls";

const FooterPlayer = ({
  content,
  playerState,
  // currentPosition,
  // totalLength,
  paused,
  trackPaused,
  trackPlayed,
  toggleModal,
  like,
  onLike,
  navigate
  // seek
}) => {
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
      {/* <SeekBar
        onSeek={seek}
        trackLength={totalLength}
        onSlidingStart={trackPaused}
        currentPosition={currentPosition}
      /> */}
      <View
        style={{
          alignItems: "center",
          marginBottom: 15,
          paddingTop: 10
        }}
      >
        <Text numberOfLines={1} style={[styles.greyText, { fontSize: 20 }]}>
          {content.music.title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigate("ComposerContent", {
              id: content.owner.id,
              title: content.owner.name
            })
          }
        >
          <Text numberOfLines={1} style={[styles.darkText, { fontSize: 13 }]}>
            {content.owner.name}
          </Text>
        </TouchableOpacity>
      </View>
      <Controls
        paused={paused}
        onPressPlay={trackPlayed}
        onPressPause={trackPaused}
        playerState={playerState}
        toggleModal={toggleModal}
        like={like}
        onLike={onLike}
      />
    </Row>
  );
};

export default FooterPlayer;
