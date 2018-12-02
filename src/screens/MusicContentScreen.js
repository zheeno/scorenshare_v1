import React, { Component } from "react";
import {
  ScrollView,
  Dimensions,
  findNodeHandle,
  DeviceEventEmitter
} from "react-native";
import {
  Container,
  StyleProvider,
  Text,
  ActionSheet,
  Tabs,
  ScrollableTab,
  Tab
} from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import getTheme from "../themes/components";
import scorenshareTheme from "../themes/variables/scorenshareTheme";
import { styles } from "../themes/variables/customStyles";
import FooterPlayer from "../components/Music/FooterPlayer";
import { LoaderOverlay, ErrorOverlay } from "../components/MiscComponents";
import { GetData } from "../services/ApiCaller";
import MusicInfoModal from "../components/Music/MusicInfoModal";
import RNAudioStreamer from "react-native-audio-streamer";
import PdfReader from "../components/PdfReader";
var RNTimer = null;
var host = "http://192.168.43.183/";
class MusicContentScreen extends Component {
  componentDidMount() {
    this.initMusicContentPage();
    this.subscription = DeviceEventEmitter.addListener(
      "RNAudioStreamerStatusChanged",
      this._statusChanged.bind(this)
    );
  }

  componentWillUnmount() {
    RNAudioStreamer.pause();
    // clearInterval(RNTimer);
  }
  constructor(props) {
    super(props);
    this.state = {
      viewRef: 0,
      modalVisible: false,
      isLoading: true,
      ajaxCallState: "fetching",
      ajaxCallError: null,
      paused: true,
      totalLength: 0,
      currentPosition: 0,
      playerState: "BUFFERING",
      musicObj: [],
      solfa: null,
      staff: null,
      track: null,
      like: false
    };

    this.BUTTONS = [
      {
        text: "Report",
        icon: "ios-paper-plane",
        iconColor: "#2c8ef4",
        action: "report"
      },
      {
        text: "Edit",
        icon: "ios-doc",
        iconColor: "#f42ced",
        action: "edit"
      },
      {
        text: "Delete",
        icon: "trash",
        iconColor: "#fa213b",
        action: "delete",
        destroy: true
      },
      {
        text: "Minimize",
        icon: "ios-arrow-down",
        iconColor: "#25de5b",
        cancel: true
      }
    ];
    // dynamically find destructive and cancel indexes
    this.index = 0;
    this.DESTRUCTIVE_INDEX = null;
    this.CANCEL_INDEX = null;
    this.buttonIndexes = this.buttonIndexes.bind(this);
    this.musId = this.props.navigation.getParam("id", "NULL");
    this.initMusicContentPage = this.initMusicContentPage.bind(this);
  }

  initMusicContentPage = () => {
    musId = this.musId;
    this.setState({ isLoading: true });
    GetData("music/collection/" + musId + "?resType=json")
      .then(result => {
        let response = result;
        this.setState({
          isLoading: false,
          ajaxCallState: 200,
          ajaxCallError: null,
          catalogue: response.catalogue,
          musicObj: response.musicObj
        });
        this.buttonIndexes();
        // set track
        this.state.musicObj.files.forEach(file => {
          // get files
          switch (file.destination) {
            case "solfa_notes":
              this.setState({
                solfa: host + file.url
              });
              break;
            case "audio_video":
              this.setState({ track: host + file.url });
              RNAudioStreamer.setUrl(this.state.track);
              // RNAudioStreamer.play();
              // this.StartRNTimer(1000);
              break;
            default:
              this.setState({
                staff: host + file.url
              });
              break;
          }
          RNAudioStreamer.duration((err, duration) => {
            if (!err) this.setState({ totalLength: duration }); //seconds
          });
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          ajaxCallState: "NET_ERR",
          ajaxCallError: error.message
        });
      });
  };

  setModalVisible(visible) {
    if (visible == undefined) {
      visible = !this.state.modalVisible;
    }
    this.setState({ modalVisible: visible });
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    alert(findNodeHandle(this.backgroundImage));
  }

  showPrice = price => {
    if (parseInt(price) == 0) {
      return (
        <Text style={[styles.greyText, { fontSize: 20, fontWeight: "400" }]}>
          Free
        </Text>
      );
    } else {
      return (
        <Text style={[styles.greyText, { fontSize: 20, fontWeight: "400" }]}>
          &#8358;{price}
        </Text>
      );
    }
  };

  buttonIndexes = () => {
    this.BUTTONS.forEach(button => {
      if (button.destroy) {
        this.DESTRUCTIVE_INDEX = this.index;
      }
      if (button.cancel) {
        this.CANCEL_INDEX = this.index;
      }
      this.index++;
    });
  };

  _statusChanged(status) {
    this.setState({ playerState: status });
    // reset player if status is FINISHED
    if (status == "FINISHED") {
      clearInterval(RNTimer);
      this.seek(0);
      RNAudioStreamer.pause();
      this.setState({ paused: true });
    }
  }
  _timers() {
    RNAudioStreamer.currentTime((err, currentTime) => {
      if (!err) this.setState({ currentPosition: currentTime }); //seconds
    });
  }
  seek(time) {
    clearInterval(RNTimer);
    time = Math.round(time);
    RNAudioStreamer.seekToTime(time); //seconds
    if (this.state.paused == false) {
      RNAudioStreamer.play();
    }
    this.setState({
      currentPosition: time,
      paused: false
    });
    this.StartRNTimer(1000);
  }

  StartRNTimer(interval) {
    RNTimer = setInterval(() => {
      this._timers();
    }, interval);
  }

  render() {
    const { navigate } = this.props.navigation;
    // Player Status:
    // - PLAYING
    // - PAUSED
    // - STOPPED
    // - FINISHED
    // - BUFFERING
    // - ERROR
    return (
      <StyleProvider style={getTheme(scorenshareTheme)}>
        {this.state.isLoading ? (
          <LoaderOverlay text={"Fetching... Please wait"} />
        ) : this.state.ajaxCallState == "NET_ERR" ? (
          <ErrorOverlay
            text={this.state.ajaxCallError}
            reloadPage={this.initCatalogueContentPage}
          />
        ) : (
          <Container>
            <Grid style={[{ flex: 1, flexDirection: "column" }]}>
              <Row
                style={[
                  styles.bgWhite,
                  {
                    flex: 3,
                    flexDirection: "column-reverse"
                  }
                ]}
              >
                <Tabs
                  renderTabBar={() => (
                    <ScrollableTab backgroundColor="#1d060a" />
                  )}
                >
                  {this.state.staff != null ? (
                    <Tab heading={"Staff Notes"}>
                      <PdfReader file={{ uri: this.state.staff }} />
                    </Tab>
                  ) : null}
                  {this.state.solfa != null ? (
                    <Tab heading="Solfa Notes">
                      <PdfReader file={{ uri: this.state.solfa }} />
                    </Tab>
                  ) : null}
                </Tabs>
              </Row>
              <FooterPlayer
                content={this.state.musicObj}
                playerState={this.state.playerState}
                currentPosition={this.state.currentPosition}
                totalLength={this.state.totalLength}
                paused={this.state.paused}
                trackPaused={() => {
                  RNAudioStreamer.pause();
                  this.setState({ paused: true });
                }}
                trackPlayed={() => {
                  RNAudioStreamer.play();
                  this.setState({ paused: false });
                }}
                toggleModal={() => {
                  this.setModalVisible();
                }}
                like={this.state.like}
                onLike={() => {
                  this.setState({ like: !this.state.like });
                }}
                seek={time => this.seek(time)}
                navigate={navigate}
              />
              {/* modal */}
              <MusicInfoModal
                content={this.state.musicObj}
                showPrice={() => this.showPrice(this.state.musicObj.price)}
                like={this.state.like}
                onLike={() => {
                  this.setState({ like: !this.state.like });
                }}
                modalVisible={this.state.modalVisible}
                transparent={true}
                toggleModal={visible => this.setModalVisible(visible)}
                ActionSheet={() =>
                  ActionSheet.show(
                    {
                      options: this.BUTTONS,
                      cancelButtonIndex: this.CANCEL_INDEX,
                      destructiveButtonIndex: this.DESTRUCTIVE_INDEX,
                      title: "Options"
                    },
                    buttonIndex => {
                      this.setState({ clicked: this.BUTTONS[buttonIndex] });
                      this.setModalVisible(false);
                      let action = this.BUTTONS[buttonIndex].action;
                      if (action != undefined) {
                        switch (action.toLowerCase()) {
                          case "report":
                            // alert(buttonIndex);
                            break;
                          case "edit":
                            // edit music piece
                            break;
                          case "delete":
                            // delete music piece
                            break;
                          case "related":
                            navigate("CatalogueContent", {
                              id: this.state.musicObj.music.category_id,
                              title: this.state.musicObj.music.category
                            });
                            break;
                          default:
                            // do nothing
                            break;
                        }
                      }
                    }
                  )
                }
              />
            </Grid>
          </Container>
        )}
      </StyleProvider>
    );
  }
}
export default MusicContentScreen;
