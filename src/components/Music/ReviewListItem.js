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

const ReviewListItem = props => {
  let ratings = {
    stars(rating) {
      rating = parseInt(rating);
      stars = [];
      for (let i = 0; i < rating; i++) {
        stars.push(
          <Icon
            key={"star_" + i}
            name="ios-star"
            style={{ fontSize: 13, color: "#1976D2" }}
          />
        );
      }
      return stars;
    }
  };

  return (
    <ListItem style={{ borderBottomColor: "#424242" }}>
      <Body
        style={{
          marginLeft: 0
        }}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.greyText,
            styles.catalogueCardTitle,
            { marginLeft: 0 }
          ]}
        >
          {props.rating.author.name}
        </Text>
        <Text style={[styles.greyText, { fontSize: 13, marginLeft: 0 }]}>
          {props.rating.review.review}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={[{ flex: 1 }]}>
            <Text style={[styles.darkText, { fontSize: 12 }]}>
              <Icon
                name="ios-timer"
                style={[styles.darkText, { fontSize: 12 }]}
              />
              &nbsp;
              {props.rating.review.created_at}
            </Text>
          </View>
          <View style={[{ flex: 1, alignItems: "flex-end" }]}>
            <Text>{ratings.stars(props.rating.review.rating)}</Text>
          </View>
        </View>
      </Body>
    </ListItem>
  );
};
export default ReviewListItem;
