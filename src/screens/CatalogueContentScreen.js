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
  Button,
  Card,
  CardItem,
  Label,
  Item,
  Badge
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import getTheme from "../themes/components";
import scorenshareTheme from "../themes/variables/scorenshareTheme";
import AppNavFooter from "../components/AppNavFooter";
import { styles } from "../themes/variables/customStyles";
import {
  SearchBarLink,
  LoaderOverlay,
  ErrorOverlay,
  MusicArrayToList
} from "../components/MiscComponents";
import { GetData } from "../services/ApiCaller";
import MusicListItem from "../components/Music/MusicListItem";
// import { renderCatalogue } from "../services/CatalogueScreenMethods";

class CatalogueContentScreen extends Component {
  componentDidMount() {
    this.initCatalogueContentPage();
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ajaxCallState: "fetching",
      ajaxCallError: null,
      catalogue: {},
      musics: []
    };
  }

  initCatalogueContentPage = () => {
    const catId = this.props.navigation.getParam("id", "NULL");
    this.setState({ isLoading: true });
    GetData("catalogues/" + catId + "?resType=json")
      .then(result => {
        let response = result;
        this.setState({
          isLoading: false,
          ajaxCallState: 200,
          ajaxCallError: null,
          catalogue: response.catalogue,
          musics: response.musics
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

  render() {
    const { navigate } = this.props.navigation;

    return (
      <StyleProvider style={getTheme(scorenshareTheme)}>
        <Container
          style={{
            flex: 1
          }}
        >
          <Content style={[styles.bgDark]}>
            {this.state.isLoading ? (
              <LoaderOverlay text={"Fetching... Please wait"} />
            ) : this.state.ajaxCallState == "NET_ERR" ? (
              <ErrorOverlay
                text={this.state.ajaxCallError}
                reloadPage={this.initCatalogueContentPage}
              />
            ) : (
                  <Grid>
                    <Row
                      style={[
                        styles.darkBg,
                        {
                          flex: 1,
                          flexDirection: "row",
                          padding: 5
                        }
                      ]}
                    >
                      <Card
                        transparent
                        style={[
                          {
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                          },
                          styles.musicCard
                        ]}
                      >
                        <CardItem style={[styles.darkBg]}>
                          <Body>
                            <Icon
                              name="ios-disc"
                              style={[
                                styles.greyText,
                                { fontSize: 50, alignSelf: "center" }
                              ]}
                            />
                            <Text style={styles.greyText} />
                          </Body>
                        </CardItem>
                      </Card>
                      <View style={{ flex: 3, paddingLeft: 10 }}>
                        <Text style={styles.redText}>
                          {this.state.catalogue.title}
                        </Text>
                        <Text
                          style={[
                            styles.greyText,
                            { fontWeight: "100", fontSize: 15 }
                          ]}
                        >
                          {this.state.catalogue.description}
                        </Text>
                      </View>
                    </Row>
                    <Row>
                      <SearchBarLink
                        openSearchScreen={options =>
                          navigate("SearchScreenContent", { params: options })
                        }
                      />
                    </Row>
                    <Row>
                      {/* display music in this catalogue */}
                      <MusicArrayToList
                        musicArray={this.state.musics}
                        nav={navigate}
                      />
                    </Row>
                  </Grid>
            )}
          </Content>
          <AppNavFooter activeTab={"Catalogue"} nav={navigate} />
        </Container>
      </StyleProvider>
    );
  }
}
export default CatalogueContentScreen;
