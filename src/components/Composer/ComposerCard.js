import React, { Component } from "react";
import { Image } from "react-native";
import { Card, CardItem, Text, Body, Icon, Button } from "native-base";
import { styles } from "../../themes/variables/customStyles";

const ComposerCard = props => {
  const navigate = props.nav;

  return (
    <Card noShadow style={[styles.musicCard, styles.bgDark]}>
      <CardItem
        style={styles.bgDark}
        button
        onPress={() =>
          navigate("ComposerContent", {
            id: props.content.id,
            title: props.content.name
          })
        }
      >
        <Body style={{ alignItems: "center", justifyContent: "center" }}>
          <Icon
            name="md-contact"
            style={{
              fontSize: 60,
              color: "#FFF"
            }}
          />
          {/* <Text style={[styles.greyText, { fontSize: 13 }]}>
               <Icon
                name="ios-musical-notes"
                style={[styles.greyText, { fontSize: 13 }]}
              /> 
               &nbsp;&middot;&nbsp;{props.content.musics.length} 
            </Text> */}
          <Text
            numberOfLines={1}
            style={[styles.greyText, styles.musicCardTitle]}
          >
            {props.content.name}
          </Text>
        </Body>
      </CardItem>
      <CardItem
        footer
        style={[
          styles.bgDark,
          { alignItems: "center", justifyContent: "center", paddingTop: 0 }
        ]}
      >
        <Button
          iconLeft
          rounded
          small
          style={{ marginTop: -10, alignSelf: "center" }}
        >
          <Icon name="md-add-circle" />
          <Text>Follow</Text>
        </Button>
      </CardItem>
    </Card>
  );
};
export default ComposerCard;
