import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  View,
  Item,
  Form,
  Icon,
  Button,
  Input,
  Left,
  Right,
  Body,
  Container,
  Spinner,
  Row,
  List
} from "native-base";
import { styles } from "../themes/variables/customStyles";
import MusicListItem from "./Music/MusicListItem";
import { Col } from "react-native-easy-grid";

export const ErrorOverlay = props => {
  return (
    <Container>
      <View style={[styles.bgDark, styles.flexColumn, styles.justifyCenter]}>
        <Row
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 50
          }}
        >
          <Icon name="ios-globe" style={[styles.greyText, { fontSize: 80 }]} />
          <Icon
            name="ios-close-circle"
            style={[styles.redText, { marginTop: -80, marginRight: -50 }]}
          />
        </Row>
        <Row
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <Text style={[styles.greyText, { marginLeft: 5, fontSize: 15 }]}>
            {props.text}
          </Text>
        </Row>
        <Row
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 30
          }}
        >
          <Button
            icon
            primary
            rounded
            onPress={() => {
              props.reloadPage(props.pageContentId);
            }}
            style={{ alignSelf: "flex-end" }}
          >
            <Icon name="ios-refresh" />
            <Text>Try Again</Text>
          </Button>
        </Row>
      </View>
    </Container>
  );
};

export const LoaderOverlay = props => {
  //   const navigate = props.nav;
  return (
    <Container>
      <View style={[styles.bgDark, styles.flexRow_1, styles.justifyCenter]}>
        <Spinner color="#1976D2" />
        <Text style={[styles.greyText, { marginLeft: 5, fontSize: 13 }]}>
          {props.text}
        </Text>
      </View>
    </Container>
  );
};

export class SearchBarLink extends Component {
  constructor(props) {
    super(props);
    // navigate = props.nav;
    this.state = {
      searchFilter: "music"
    };
  }
  render() {
    return (
      <View
        style={[
          styles.darkBg,
          barStyles.container,
          { paddingTop: 20, paddingBottom: 20 }
        ]}
      >
        <Left>
          <Button
            transparent
            small
            light
            onPress={() => {
              this.setState({ searchFilter: "music" });
            }}
          >
            {/* link to discover trending music */}
            <Icon
              name="ios-musical-note"
              style={
                this.state.searchFilter == "music"
                  ? styles.redText
                  : styles.greyText
              }
            />
          </Button>
        </Left>
        <Button
          icon
          style={[
            barStyles.bar,
            {
              backgroundColor: "#313131",
              padding: 5,
              borderRadius: 20,
              flex: 3
            }
          ]}
          onPress={() =>
            this.props.openSearchScreen({ filter: this.state.searchFilter })
          }
        >
          <Left style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="ios-search"
              style={[styles.greyText, { fontSize: 20 }]}
            />
          </Left>
          <Body style={{ flex: 5, alignItems: "flex-start" }}>
            <Text style={[styles.greyText]}>Search</Text>
          </Body>
        </Button>
        <Right>
          <Button
            transparent
            small
            light
            onPress={() => {
              this.setState({ searchFilter: "composers" });
            }}
          >
            {/* link to discover composers */}
            <Icon
              name="ios-people"
              style={
                this.state.searchFilter == "composers"
                  ? styles.redText
                  : styles.greyText
              }
            />
          </Button>
        </Right>
      </View>
    );
  }
}
export class MusicArrayToList extends Component {
  constructor(props) {
    super(props);
    navigate = props.nav;
  }
  render() {
    return (
      <View style={[styles.bgDark, { flex: 1 }]}>
        {/* music collection created by the selected composer*/}
        {this.props.musicArray.length > 0 ? (
          <List
            dataArray={this.props.musicArray}
            renderRow={musicObj => (
              <MusicListItem musicObj={musicObj} nav={navigate} />
            )}
          />
        ) : (
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
            <Text style={[styles.darkText]}>Nothing here to see</Text>
          </Col>
        )}
      </View>
    );
  }
}
export class SearchBar extends Component {
  constructor(props) {
    super(props);
    navigate = props.nav;
    this.state = {
      searchFilter: "music",
      keyword: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(newText) {
    this.setState({ keyword: newText });
  }

  render() {
    return (
      <Form style={[barStyles.container]}>
        <Item
          noBorder
          padder
          style={[
            barStyles.bar,
            { borderBottomColor: "#101010", flex: 3, alignSelf: "auto" }
          ]}
        >
          <Icon name="ios-search" style={[styles.greyText, { fontSize: 15 }]} />
          <Input
            placeholder={this.props.placeholder}
            returnKeyType="search"
            autoFocus={true}
            defaultValue={this.state.keyword}
            onChangeText={this.handleTextChange}
            onSubmitEditing={() => {
              this.props.initSearch(this.state.keyword);
            }}
            style={[
              styles.greyText,
              { paddingTop: 10, paddingRight: 15, borderBottomColor: "#101010" }
            ]}
          />
        </Item>
        <Right>
          <Button
            transparent
            onPress={() => {
              this.setState({ keyword: "" });
            }}
          >
            <Icon name="ios-close" style={[styles.greyText]} />
          </Button>
        </Right>
      </Form>
    );
  }
}

const barStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  bar: {
    zIndex: 10,
    width: 200,
    height: 30,
    fontSize: 15,
    alignSelf: "center"
  }
});
