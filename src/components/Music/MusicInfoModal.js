import React, { Component } from "react";
import { Modal, ScrollView } from "react-native";
import {
  View,
  Text,
  Button,
  Col,
  ActionSheet,
  Row,
  Grid,
  Left,
  Icon,
  List
} from "native-base";
import { styles } from "../../themes/variables/customStyles";
import ReviewListItem from "./ReviewListItem";

class MusicInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={this.props.transparent}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.toggleModal(false);
        }}
      >
        <View
          style={[
            styles.flexRow_1,
            {
              flexDirection: "column",
              backgroundColor: "rgba(0,0,0,.94)"
            }
          ]}
        >
          <View style={[{ padding: 8, flex: 8 }]}>
            {/* title and price */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, paddingLeft: 0 }}>
                <Button
                  icon
                  full
                  small
                  transparent
                  onPress={() => {
                    this.props.toggleModal(false);
                  }}
                >
                  <Icon name="ios-arrow-back" style={styles.greyText} />
                </Button>
              </View>
              <View style={{ flex: 4 }}>
                <Text style={[styles.redText, { fontSize: 18 }]}>
                  {this.props.content.music.title}
                </Text>
                <Text
                  style={[styles.darkText, { fontSize: 13, marginTop: -5 }]}
                >
                  {this.props.content.owner.name}
                </Text>
              </View>
              <View style={{ flex: 2, alignItems: "flex-end" }}>
                {this.props.showPrice()}
              </View>
            </View>
            {/* description */}
            <View>
              <Text style={[styles.greyText]}>
                {this.props.content.music.notes}
              </Text>
            </View>
            {/* action buttons */}
            <View style={[{ flexDirection: "row" }]}>
              <View style={[{ flex: 1 }]}>
                <Button iconLeft full transparent onPress={this.props.onLike}>
                  <Icon
                    name="ios-heart"
                    style={this.props.like ? styles.redText : styles.greyText}
                  />
                  <Text style={styles.greyText}>Like</Text>
                </Button>
              </View>
              <View style={[{ flex: 1 }]}>
                <Button iconLeft full transparent>
                  <Icon name="ios-chatboxes" />
                  <Text style={styles.greyText}>Review</Text>
                </Button>
              </View>
            </View>
            <ScrollView>
              {/* reviews */}
              {this.props.content.reviews.length > 0 ? (
                <View>
                  <Text style={[styles.redText]}>Reviews</Text>
                  <Text
                    style={[
                      styles.greyText,
                      {
                        fontSize: 50,
                        alignSelf: "center",
                        marginTop: 30,
                        marginBottom: 30
                      }
                    ]}
                  >
                    {this.props.content.ratings.aveRating}
                  </Text>
                  {/* loop through musics */}
                  <List
                    dataArray={this.props.content.reviews}
                    renderRow={review => <ReviewListItem rating={review} />}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 30
                  }}
                >
                  <Icon
                    name="ios-chatboxes"
                    style={[styles.darkText, { fontSize: 80 }]}
                  />
                  <Text style={[styles.darkText, { fontSize: 18 }]}>
                    No reviews were found
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContents: "baseline"
            }}
          >
            <View style={{ flex: 4 }}>
              <Button iconLeft full rounded>
                <Icon name="ios-card" />
                <Text>Pay &#8358;{this.props.content.price}</Text>
              </Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button icon full transparent onPress={this.props.ActionSheet}>
                <Icon name="ios-arrow-dropup" style={styles.greyText} />
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default MusicInfoModal;
