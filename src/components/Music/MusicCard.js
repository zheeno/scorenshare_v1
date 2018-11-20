import React from "react";
import { Image } from "react-native";
import { Card, CardItem, Text, Body } from "native-base";
import { styles } from "../../themes/variables/customStyles";

const MusicCard = props => {
  const navigate = props.nav;

  return (
    <Card style={[styles.musicCard, styles.bgDark]}>
      <CardItem
        button
        style={styles.bgDark}
        onPress={() =>
          navigate("MusicContent", {
            id: props.content.id,
            title: props.content.title,
            content: JSON.stringify(props.content)
          })
        }
      >
        <Body>
          <Image
            source={require("../assets/img/Background-Music-Icon.png")}
            style={styles.thumbnail}
          />
          <Text
            numberOfLines={1}
            style={[styles.greyText, styles.musicCardTitle]}
          >
            {props.content.title}
          </Text>
        </Body>
      </CardItem>
    </Card>
  );
};
export default MusicCard;
