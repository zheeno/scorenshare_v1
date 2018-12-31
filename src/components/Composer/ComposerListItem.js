import React, { Component } from "react";
import { Image } from "react-native";
import { Text, Body, Icon, ListItem, Left, View } from "native-base";
import { styles } from "../../themes/variables/customStyles";

const ComposerListItem = props => {
  const navigate = props.nav;

  return (
    <ListItem
      thumbnail
      onPress={() =>
        navigate("ComposerContent", {
          id: props.content.composer.id,
          title: props.content.composer.name
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
          {props.content.composer.name}
        </Text>
        <Text>
          <Text style={[styles.darkText, { fontSize: 12, marginTop: -5 }]}>
            <Icon
              style={[styles.darkText, { fontSize: 12 }]}
              name="ios-musical-note"
            />
            &nbsp;&middot;&nbsp;
            {props.content.collection.length}
          </Text>
          <Text style={[styles.darkText, { fontSize: 12, marginTop: -5 }]}>
            &nbsp;&nbsp;
            <Icon
              style={[styles.darkText, { fontSize: 12, marginTop: -5 }]}
              name="ios-people"
            />
            &nbsp;&middot;&nbsp;
            {props.content.followers}
          </Text>
        </Text>
      </Body>
    </ListItem>
  );
};
export default ComposerListItem;
