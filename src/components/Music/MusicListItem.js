import React from "react";
import {
  Text,
  Body,
  ListItem,
  Left,
  Thumbnail,
  View,
  Icon,
  Right
} from "native-base";
import { styles } from "../../themes/variables/customStyles";

const MusicListItem = props => {
  const navigate = props.nav;
  const showPrice = price => {
    if (parseInt(price) == 0) {
      return <Text style={[styles.redText, { fontSize: 12 }]}>Free</Text>;
    } else {
      return (
        <Text style={[styles.redText, { fontSize: 12 }]}>&#8358;{price}</Text>
      );
    }
  };
  return (
    <ListItem
      thumbnail
      onPress={() =>
        navigate("MusicContent", {
          id: props.musicObj.music.id,
          title: props.musicObj.music.title
        })
      }
    >
      <Left
        style={{
          paddingTop: 10
        }}
      >
        <Thumbnail
          small
          source={require("../assets/img/Background-Music-Icon.png")}
        />
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
          {props.musicObj.music.title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.darkText, { fontSize: 12, marginTop: -5 }]}
        >
          {props.musicObj.owner.name}
        </Text>
        <View style={[styles.flexRow_1, { alignContent: "space-around" }]}>
          <Text
            style={[
              styles.greyText,
              {
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13
              }
            ]}
          >
            <Icon
              name="ios-heart"
              style={[styles.greyText, { fontSize: 13 }]}
            />
            &nbsp;&middot;&nbsp;
            {props.musicObj.likes}
          </Text>
          <Text style={[styles.greyText, styles.listInfoText]}>
            <Icon
              name="ios-chatboxes"
              style={[styles.greyText, { fontSize: 13 }]}
            />
            &nbsp;&middot;&nbsp;
            {props.musicObj.reviews.length}
          </Text>
          <Text style={[styles.greyText, styles.listInfoText]}>
            <Icon
              name="ios-cloud-download"
              style={[styles.greyText, { fontSize: 13 }]}
            />
            &nbsp;&middot;&nbsp;
            {props.musicObj.downloads}
          </Text>
          <Text style={[styles.greyText, styles.listInfoText]}>
            <Icon
              name="ios-archive"
              style={[styles.greyText, { fontSize: 13 }]}
            />
            &nbsp;&middot;&nbsp;
            {props.musicObj.files.length}
          </Text>
        </View>
      </Body>
      <Right>{showPrice(props.musicObj.price)}</Right>
    </ListItem>
  );
};
export default MusicListItem;
