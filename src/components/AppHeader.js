import React, { Component } from "react";
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  View
} from "native-base";
import { Image } from "react-native";
import { styles } from "../themes/variables/customStyles";

export default class AppHeader extends Component {
  render() {
    return (
      <View
        transparent
        style={[
          {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }
        ]}
      >
        <Left>
          <Button transparent light small>
            <Icon name="ios-menu" />
          </Button>
        </Left>
        <Body style={{ flex: 5, alignItems: "center" }}>
          <Image
            source={require("./assets/img/logo.png")}
            resizeMode={"center"}
            style={{
              width: 180,
              alignSelf: "center"
            }}
          />
        </Body>
        <Right>
          <Button transparent light small>
            <Icon name="ios-person-outline" />
          </Button>
        </Right>
      </View>
    );
  }
}
