import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  StyleProvider,
  Text,
  View,
  Icon,
  Button,
  H1,
  Item,
  Label,
  Input,
  Form,
  Container,
  H2,
  Tabs,
  ScrollableTab,
  Tab,
  List
} from "native-base";
import getTheme from "../themes/components";
import scorenshareTheme from "../themes/variables/scorenshareTheme";
import { styles } from "../themes/variables/customStyles";
import {
  SearchBar,
  LoaderOverlay,
  ErrorOverlay,
  MusicArrayToList
} from "../components/MiscComponents";
import { Col } from "react-native-easy-grid";
import MusicListItem from "../components/Music/MusicListItem";
import { GetData } from "../services/ApiCaller";

class ComposerScreen extends Component {
  componentDidMount() {
    this.initComposerContentPage();
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ajaxCallState: null,
      ajaxCallError: null,
      composer: [],
      collection: [],
      favorites: [],
      followers: 0,
      following: 0
    };
    this.initComposerContentPage = this.initComposerContentPage.bind(this);
  }

  initComposerContentPage() {
    compId = this.props.navigation.getParam("id", "NULL");
    this.setState({ isLoading: true });
    GetData("composers/" + compId + "?resType=json")
      .then(result => {
        let response = result;
        this.setState({
          isLoading: false,
          ajaxCallState: 200,
          ajaxCallError: null,
          composer: response.composer,
          collection: response.collection,
          favorites: response.favorites,
          followers: response.followers,
          following: response.following
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          ajaxCallState: "NET_ERR",
          ajaxCallError: error.message
        });
      });
  }

  render() {
    const { navigate } = this.props.navigation;

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
          <Container style={[{ flex: 1 }, styles.darkBg]}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  paddingTop: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }
              ]}
            >
              <View
                style={{
                  flex: 2,
                  alignItems: "center"
                }}
              >
                <H2 style={styles.greyText}>{this.state.followers}</H2>
                <Text style={[styles.greyText, { fontSize: 10 }]}>
                  Followers
                </Text>
              </View>
              <View style={[{ flex: 3 }]}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    name="md-contact"
                    style={{
                      fontSize: 80,
                      color: "#FFF"
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: "center"
                }}
              >
                <H2 style={styles.greyText}>{this.state.following}</H2>
                <Text style={[styles.greyText, { fontSize: 10 }]}>
                  Following
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 30
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.redText, { fontSize: 16 }]}
                >
                  {this.props.navigation.getParam("title", "Composer")}
                </Text>
                <Button rounded iconLeft small style={{ alignSelf: "center" }}>
                  <Icon name="md-add-circle" />
                  <Text>Follow</Text>
                </Button>
              </View>
            </View>
            <View style={[styles.bgDark, { flex: 5, paddingBottom: 10 }]}>
              <Tabs
                renderTabBar={() => <ScrollableTab backgroundColor="#0e0e0e" />}
              >
                <Tab
                  heading={"Collection"}
                  tabStyle={[styles.darkBg, { borderWidth: 0 }]}
                  activeTabStyle={[styles.bgDark, { borderWidth: 0 }]}
                >
                  <MusicArrayToList
                    musicArray={this.state.collection}
                    nav={navigate}
                  />
                </Tab>
                <Tab
                  heading="Favorites"
                  tabStyle={[styles.darkBg, { borderWidth: 0 }]}
                  activeTabStyle={[styles.bgDark, { borderWidth: 0 }]}
                >
                  {/* favorite music collection of the selected composer */}
                  <MusicArrayToList
                    musicArray={this.state.favorites}
                    nav={navigate}
                  />
                </Tab>
              </Tabs>
            </View>
          </Container>
        )}
      </StyleProvider>
    );
  }
}
export default ComposerScreen;
