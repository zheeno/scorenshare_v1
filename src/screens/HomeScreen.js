import React, { Component } from "react";
import getTheme from "../themes/components";
import scorenshareTheme from "../themes/variables/scorenshareTheme";
import AppNavFooter from "../components/AppNavFooter";
import { Image, ScrollView } from "react-native";
import { styles } from "../themes/variables/customStyles";
import { Col, Row, Grid } from "react-native-easy-grid";
import { renderFeed } from "../services/HomeScreenMethods";
import {
  Container,
  StyleProvider,
  Content,
  Text,
  DeckSwiper,
  Drawer,
  Thumbnail,
  Card,
  CardItem,
  Left,
  Body,
  Button,
  View,
  Toast
} from "native-base";
import {
  SearchBarLink,
  LoaderOverlay,
  ErrorOverlay
} from "../components/MiscComponents";
import { GetData } from "../services/ApiCaller";
import SidePanel from "../components/SidePanel";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ajaxCallState: "fetching",
      ajaxCallError: null,
      carousel: [],
      feeds: []
    };
  }

  // state = {
  //   showToast: false,
  //   carousel: [
  //     {
  //       image:
  //         "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
  //       text: "100"
  //     },
  //     {
  //       image:
  //         "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
  //       text: "200"
  //     },
  //     {
  //       image: null,
  //       text: "300"
  //     }
  //   ],

  // feeds: [
  //   {
  //     id: 3,
  //     title: "Sponsored Composers",
  //     category: "Hey",
  //     contentType: "user-list",
  //     content: [
  //       {
  //         id: 1,
  //         title: "Victor"
  //       },
  //       {
  //         id: 2,
  //         title: "Take it back - Tu Face"
  //       },
  //       {
  //         id: 3,
  //         title: "Take it back - Tu Face"
  //       }
  //     ]
  //   }
  // ]
  // };

  initLandingPage = () => {
    this.setState({ isLoading: true });
    GetData("initLandingPage?resType=json")
      .then(result => {
        let response = result;
        this.setState({
          isLoading: false,
          ajaxCallState: 200,
          ajaxCallError: null,
          feeds: response.feeds
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

  componentDidMount() {
    // const { id } = this.props.match.params;
    this.initLandingPage();
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(scorenshareTheme)}>
        <Container>
          <Content style={styles.bgDark}>
            {this.state.isLoading ? (
              <LoaderOverlay text={"Fetching... Please wait"} />
            ) : this.state.ajaxCallState == "NET_ERR" ? (
              <ErrorOverlay
                text={this.state.ajaxCallError}
                reloadPage={this.initLandingPage}
              />
            ) : (
              <Grid>
                <Row style={styles.carouselContainer}>
                  <Col style={styles.carouselBody}>
                    <DeckSwiper
                      looping
                      dataSource={this.state.carousel}
                      renderItem={item => (
                        <React.Fragment>
                          <Card style={[styles.carouselItem, styles.bgDark]}>
                            <CardItem
                              button
                              onPress={() => navigate("Catalogue")}
                              cardBody
                              style={[styles.bgDark]}
                            >
                              {item.image ? (
                                <Image
                                  source={require("../components/assets/img/1167987-rock-concert-wallpaper-1920x1080-full-hd.jpg")}
                                  style={styles.carouselItemImage}
                                />
                              ) : (
                                <Text>No image</Text>
                              )}
                            </CardItem>
                            <CardItem cardBody style={styles.carouselItemMask}>
                              {/* <Text style={styles.redText}>{item.image}</Text> */}
                            </CardItem>
                          </Card>
                        </React.Fragment>
                      )}
                    />
                  </Col>
                </Row>
                <Row>
                  <SearchBarLink
                    openSearchScreen={options =>
                      navigate("SearchScreenContent", { params: options })
                    }
                  />
                </Row>
                {/* loop through feeds */}
                {this.state.feeds.length > 0 ? (
                  this.state.feeds.map(feed => renderFeed(feed, navigate))
                ) : (
                  <View>
                    <Text style={[styles.greyText]}>
                      Nothing here to see {this.state.ajaxCallState}
                    </Text>
                  </View>
                )}
              </Grid>
            )}
          </Content>
          <AppNavFooter
            activeTab={"Home"}
            nav={navigate}
            reloadLanding={this.initLandingPage}
          />
        </Container>
      </StyleProvider>
    );
  }
}
