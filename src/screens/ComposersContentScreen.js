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
import ComposerListItem from "../components/Composer/ComposerListItem";
// import { renderCatalogue } from "../services/CatalogueScreenMethods";

class ComposersContentScreen extends Component {
  componentDidMount() {
    this.initComposersPage();
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ajaxCallState: "fetching",
      ajaxCallError: null,
      carousel: [],
      composers: []
    };
  }

  initComposersPage = () => {
    this.setState({ isLoading: true });
    GetData("composers?resType=json")
      .then(result => {
        let response = result;
        this.setState({
          isLoading: false,
          ajaxCallState: 200,
          ajaxCallError: null,
          composers: response.composers
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
                reloadPage={this.initComposersPage}
              />
            ) : (
              <ScrollView>
                <SearchBarLink
                  openSearchScreen={options =>
                    navigate("SearchScreenContent", { params: options })
                  }
                />
                {this.state.composers.length > 0 ? (
                  <List
                    dataArray={this.state.composers}
                    renderRow={result => (
                      <ComposerListItem
                        content={result}
                        nav={navigate}
                      />
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
            )}
          </Content>
          <AppNavFooter
            activeTab={"ComposersScreen"}
            nav={navigate}
            reloadComposers={this.initComposersPage}
          />
        </Container>
      </StyleProvider>
    );
  }
}

export default ComposersContentScreen;
