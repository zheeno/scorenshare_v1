import React from "react";
import { Image } from "react-native";
import { Card, CardItem, Text, Body, Icon } from "native-base";
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
            id: props.content.music.id,
            title: props.content.music.title,
            content: JSON.stringify(props.content)
          })
        }
      >
        <Body>
          <Image
            source={require("../assets/img/Background-Music-Icon.png")}
            style={styles.thumbnail}
          />
          <Text numberOfLines={1} style={[styles.greyText]}>
            <Text style={[styles.greyText, styles.musicCardTitle]}>
              <Icon
                name="ios-cloud-download"
                style={[styles.greyText, { fontSize: 11 }]}
              />
              &nbsp;
              {props.content.downloads}
            </Text>
            &nbsp;&middot;&nbsp;
            {Number(props.content.price) > 0 ? (
              <Text style={[styles.greyText, styles.musicCardTitle]}>
                &#8358;{props.content.price}
              </Text>
            ) : (
              <Text style={[styles.greyText, styles.musicCardTitle]}>FREE</Text>
            )}
          </Text>
        </Body>
      </CardItem>
      <CardItem footer style={[styles.bgDark, { paddingTop: 0 }]}>
        <Text
          numberOfLines={1}
          style={[styles.greyText, styles.musicCardTitle]}
        >
          {props.content.music.title}
        </Text>
      </CardItem>
    </Card>
  );
};
export default MusicCard;
