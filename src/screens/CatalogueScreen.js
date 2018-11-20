import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import {
  Container,
  StyleProvider,
  Text,
  Content,
  View,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Icon
} from "native-base";
import { Row, Col, Grid } from "react-native-easy-grid";
import getTheme from "../themes/components";
import scorenshareTheme from "../themes/variables/scorenshareTheme";
import AppNavFooter from "../components/AppNavFooter";
import { styles } from "../themes/variables/customStyles";
import {
  SearchBarLink,
  LoaderOverlay,
  ErrorOverlay
} from "../components/MiscComponents";
import { GetData } from "../services/ApiCaller";
// import { renderCatalogue } from "../services/CatalogueScreenMethods";

class CatalogueScreen extends Component {
  // state = {
  //   catalogues: [
  //     {
  //       id: 1,
  //       category: "Contemporary",
  //       description: "Lorem espium modus suprede echma nostum",
  //       numSongs: 3
  //     },
  //     {
  //       id: 2,
  //       category: "Gospel",
  //       description: "Lorem espium modus suprede echma nostum",
  //       numSongs: 3
  //     },
  //     {
  //       id: 3,
  //       category: "Afro Beats",
  //       description: "Lorem espium modus suprede echma nostum",
  //       numSongs: 3
  //     },
  //     {
  //       id: 4,
  //       category: "Felabration",
  //       description: "Lorem espium modus suprede echma nostum",
  //       numSongs: 30
  //     }
  //   ]
  // };
  componentDidMount() {
    // const { id } = this.props.match.params;
    this.initCataloguePage();
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ajaxCallState: "fetching",
      ajaxCallError: null,
      carousel: [],
      catalogues: []
    };
  }

  static navigationOptions = {
    title: "Catalogues"
  };

  initCataloguePage = () => {
    this.setState({ isLoading: true });
    GetData("catalogues?resType=json")
      .then(result => {
        let response = result;
        this.setState({
          isLoading: false,
          ajaxCallState: 200,
          ajaxCallError: null,
          catalogues: response.catalogues
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
        {this.state.isLoading ? (
          <LoaderOverlay text={"Fetching... Please wait"} />
        ) : this.state.ajaxCallState == "NET_ERR" ? (
          <ErrorOverlay
            text={this.state.ajaxCallError}
            reloadPage={this.initCataloguePage}
          />
        ) : (
          <Container
            style={{
              flex: 1
            }}
          >
            {/* <AppHeader /> */}
            <Content style={[styles.bgDark]}>
              <ScrollView>
              <SearchBarLink openSearchScreen={(options) => navigate("SearchScreenContent", {params: options})} />
                {/* loop through catalogues */}
                {this.state.catalogues.length > 0 ? (
                  <List
                    dataArray={this.state.catalogues}
                    renderRow={catalogue => (
                      <ListItem
                        onPress={() =>
                          navigate("CatalogueContent", {
                            id: catalogue.id,
                            title: catalogue.category,
                            content: catalogue
                          })
                        }
                      >
                        <Body>
                          <Text
                            numberOfLines={1}
                            style={[styles.redText, styles.catalogueCardTitle]}
                          >
                            {catalogue.category}
                          </Text>
                          <Text note numberOfLines={2} style={styles.greyText}>
                            {catalogue.description}
                          </Text>
                        </Body>
                      </ListItem>
                    )}
                  />
                ) : (
                  <Grid style={{ height: 250 }}>
                    <Col
                      style={[
                        {
                          alignItems: "center",
                          justifyContent: "center"
                        }
                      ]}
                    >
                      <Icon
                        name="md-information-circle"
                        style={[styles.darkText, { fontSize: 50 }]}
                      />
                      <Text style={[styles.darkText]}>Nothing here to see</Text>
                    </Col>
                  </Grid>
                )}
              </ScrollView>
            </Content>
            <AppNavFooter
              activeTab={"Catalogue"}
              nav={navigate}
              reloadCatalogues={this.initCataloguePage}
            />
          </Container>
        )}
      </StyleProvider>
    );
  }
}

export default CatalogueScreen;
