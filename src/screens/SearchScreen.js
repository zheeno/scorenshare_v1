import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  Container,
  StyleProvider,
  Text,
  Content,
  View,
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Footer,
  FooterTab,
  Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import getTheme from "../themes/components";
import scorenshareTheme from "../themes/variables/scorenshareTheme";
import { styles } from "../themes/variables/customStyles";
import {
  SearchBar,
  LoaderOverlay,
  ErrorOverlay
} from "../components/MiscComponents";
import { GetData } from "../services/ApiCaller";
import MusicListItem from "../components/Music/MusicListItem";
import ComposerCard from "../components/Composer/ComposerCard";
import MusicCard from "../components/Music/MusicCard";
import ComposerListItem from "../components/Composer/ComposerListItem";

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: "",
      searchFilter: "",
      filter: "",
      isSearching: false,
      searchResults: [],
      ajaxCallState: null,
      ajaxCallError: null
    };
    this.initSearch = this.initSearch.bind(this);
    this.initializeSearchPage = this.initializeSearchPage.bind(this);
  }

  componentDidMount() {
    this.initializeSearchPage();
  }

  initializeSearchPage() {
    const params = this.props.navigation.getParam("params", {});
    this.setState({ filter: params.filter, searchFilter: params.filter });
  }

  initSearch = (keyword, filter) => {
    this.setState({ keyword: keyword });
    if (filter == undefined || filter.length == 0) {
      filter = this.state.searchFilter;
    }
    if (this.state.keyword.length > 0 || keyword.length > 0) {
      this.setState({ isSearching: true });
      GetData("search/" + filter + "/" + keyword + "?resType=json")
        .then(result => {
          let response = result;
          this.setState({
            isSearching: false,
            ajaxCallState: 200,
            ajaxCallError: null,
            searchResults: response.searchResults,
            searchFilter: response.filter,
            filter: response.filter
          });
        })
        .catch(error => {
          this.setState({
            isSearching: false,
            ajaxCallState: "NET_ERR",
            ajaxCallError: error.message
          });
        });
    }
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Search",
      headerStyle: { backgroundColor: "#101010" }
    };
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyleProvider style={getTheme(scorenshareTheme)}>
        {this.state.isSearching ? (
          <LoaderOverlay text={"Searching... Please wait"} />
        ) : this.state.ajaxCallState == "NET_ERR" ? (
          <ErrorOverlay
            text={this.state.ajaxCallError}
            reloadPage={() => this.initSearch(this.state.keyword)}
          />
        ) : (
          <Container>
            <Grid style={[{ flex: 1, flexDirection: "column" }]}>
              <Row
                style={[
                  styles.bgDark,
                  {
                    flex: 1,
                    flexDirection: "row",
                    padding: 0
                  }
                ]}
              >
                <SearchBar
                  filter={this.state.filter}
                  initSearch={newKeyword => {
                    this.initSearch(newKeyword);
                  }}
                  placeholder={"Search " + this.state.filter}
                  updateKeyword={keyword => {
                    this.setState({ keyword: keyword });
                  }}
                />
              </Row>
              <Row
                style={[
                  styles.bgDark,
                  {
                    paddingBottom: 0,
                    height: 40
                  }
                ]}
              >
                <View transparent style={{ flex: 1, paddingBottom: 0 }}>
                  <Button
                    full
                    transparent
                    light
                    small
                    onPress={() => {
                      this.setState({
                        filter: "music",
                        searchFilter: "music"
                      });
                      this.initSearch(this.state.keyword, "music");
                    }}
                  >
                    <Icon
                      name="ios-musical-note"
                      style={
                        this.state.filter == "music"
                          ? styles.redText
                          : styles.greyText
                      }
                    />
                  </Button>
                </View>
                <View
                  transparent
                  style={{
                    flex: 1,
                    paddingBottom: 0
                  }}
                >
                  <Button
                    full
                    transparent
                    light
                    small
                    onPress={() => {
                      this.setState({
                        filter: "composers",
                        searchFilter: "composers"
                      });
                      this.initSearch(this.state.keyword, "composers");
                    }}
                  >
                    <Icon
                      name="ios-people"
                      style={
                        this.state.filter == "composers"
                          ? styles.redText
                          : styles.greyText
                      }
                    />
                  </Button>
                </View>
              </Row>
              <Row
                style={[
                  styles.bgDark,
                  {
                    flex: 5,
                    flexDirection: "row"
                  }
                ]}
              >
                <ScrollView style={[styles.flexColumn]}>
                  {this.state.searchResults.length > 0 ? (
                    this.renderSearchResults({
                      searchResults: this.state.searchResults,
                      filter: this.state.searchFilter,
                      keyword: this.state.keyword,
                      navigation: navigate
                    })
                  ) : (
                    <Row>
                      <Col
                        style={[
                          {
                            alignItems: "center",
                            justifyContent: "center",
                            height: 200
                          }
                        ]}
                      >
                        <Icon
                          name="md-information-circle"
                          style={[styles.darkText, { fontSize: 50 }]}
                        />
                        <Text style={[styles.darkText]}>
                          Nothing here to see
                        </Text>
                      </Col>
                    </Row>
                  )}
                </ScrollView>
              </Row>
            </Grid>
          </Container>
        )}
      </StyleProvider>
    );
  }

  renderSearchResults(params) {
    switch (params.filter.toLowerCase()) {
      case "composers":
        results = this.renderComposersSearchResults(params);
        break;

      default:
        results = this.renderMusicSearchResults(params);
        break;
    }
    return results;
  }

  renderMusicSearchResults(params) {
    return (
      <React.Fragment>
        <Row style={{ paddingLeft: 10 }}>
          <Text
            style={[styles.darkText, { fontSize: 13, fontStyle: "italic" }]}
          >
            Showing {params.searchResults.length} Result
            {params.searchResults.length > 1 ? "s" : ""} for{" "}
            <Text
              style={[styles.greyText, { fontSize: 13, fontStyle: "italic" }]}
            >
              &quot;{params.keyword}&quot;
            </Text>
          </Text>
        </Row>
        <Row
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            paddingBottom: 30
          }}
        >
          {/* loop through musics */}
          <List
            dataArray={params.searchResults}
            renderRow={musicObj => (
              <MusicListItem musicObj={musicObj} nav={params.navigation} />
            )}
          />
        </Row>
      </React.Fragment>
    );
  }

  renderComposersSearchResults(params) {
    return (
      <React.Fragment>
        <Row style={{ paddingLeft: 10 }}>
          <Text
            style={[styles.darkText, { fontSize: 13, fontStyle: "italic" }]}
          >
            Showing {params.searchResults.length} Result
            {params.searchResults.length > 1 ? "s" : ""} for{" "}
            <Text
              style={[styles.greyText, { fontSize: 13, fontStyle: "italic" }]}
            >
              &quot;{params.keyword}&quot;
            </Text>
          </Text>
        </Row>
        <Row
          style={{
            alignContent: "center",
            justifyContent: "center",
            paddingBottom: 30
          }}
        >
          {/* loop through composers */}
          <List
            dataArray={params.searchResults}
            renderRow={result => (
              <ComposerListItem content={result.composerDetails} nav={params.navigation} />
            )}
          />
          {/* {params.searchResults.map(result => (
            <View
              horizontal
              key={"com_" + result.composerDetails.id}
              style={{ alignSelf: "auto", alignItems: "center", flex: 1 }}
            >
              <ComposerCard
                content={result.composerDetails}
                nav={params.navigation}
              />
            </View>
          ))} */}
        </Row>
      </React.Fragment>
    );
  }
}
export default SearchScreen;
