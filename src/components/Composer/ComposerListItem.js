import React, { Component } from "react";
import { Image } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Body,
  Icon,
  Button,
  ListItem,
  Left,
  Right,
  View
} from "native-base";
import { styles } from "../../themes/variables/customStyles";

const ComposerListItem = props => {
  const navigate = props.nav;

  return (
    <ListItem
      thumbnail
      onPress={() =>
        navigate("ComposerContent", {
          id: props.content.id,
          title: props.content.name
        })
      }
    >
      <Left
        style={{
          paddingTop: 10,
          width: 40,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View>
          <Icon
            name="ios-contact"
            style={[styles.greyText, { fontSize: 40 }]}
          />
        </View>
      </Left>
      <Body
        style={{
          paddingLeft: 10,
          paddingBottom: 2,
          paddingRight: 5
        }}
      >
        <Text
          numberOfLines={1}
          style={[styles.greyText, styles.catalogueCardTitle]}
        >
          {props.content.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.darkText, { fontSize: 12, marginTop: -5 }]}
        >
          Sub data
        </Text>
      </Body>
    </ListItem>
  );
};
export default ComposerListItem;
