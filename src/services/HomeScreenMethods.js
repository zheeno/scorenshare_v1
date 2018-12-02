import React from "react";
import ComposerCard from "../components/Composer/ComposerCard";
import MusicCard from "../components/Music/MusicCard";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native";
import { Text, Toast, Button } from "native-base";
import { styles } from "../themes/variables/customStyles";
import { GetData } from "../services/ApiCaller";

export function renderFeed(feed, navigate) {
  switch (feed.contentType) {
    case "user-list":
      result = renderUserScrollList(feed, navigate);
      break;

    default:
      result = renderMusicScrollList(feed, navigate);
      break;
  }
  return result;
}

export function renderMusicScrollList(feed, navigate) {
  return (
    <React.Fragment key={"Frag_" + feed.catalogue.id}>
      {/* check if the catalogue has music contents */}
      {feed.musics.length > 0 ? (
        <Row key={feed.catalogue.id}>
          <Col style={styles.padTop25}>
            <Text style={[styles.redText, { marginLeft: 25 }]}>
              {feed.catalogue.category}
            </Text>
            <Button
              small
              light
              transparent
              style={[{ right: 5, top: 20, position: "absolute" }]}
              onPress={() =>
                navigate("CatalogueContent", {
                  id: feed.catalogue.id,
                  title: feed.catalogue.category,
                  content: feed
                })
              }
            >
              <Text style={{ fontSize: 12 }}>More</Text>
            </Button>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Grid style={{ overflowX: "auto" }}>
                {feed.musics.map(musicObj => (
                  <Col
                    key={musicObj.music.id}
                    style={styles.musicCardContainer}
                  >
                    <MusicCard nav={navigate} content={musicObj} />
                  </Col>
                ))}
              </Grid>
            </ScrollView>
          </Col>
        </Row>
      ) : (
        <Text>&nbsp;</Text>
      )}
    </React.Fragment>
  );
}

export function renderUserScrollList(feed, navigate) {
  return (
    <Row key={feed.title}>
      {/* featured contents */}
      <Col style={styles.padTop25}>
        <Text style={[styles.redText, { marginLeft: 25 }]}>{feed.title}</Text>
        {/* <Text
          style={[
            styles.greyText,
            { right: 10, top: 25, position: "absolute", fontSize: 12 }
          ]}
        >
          More
        </Text> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Grid style={{ overflowX: "auto" }}>
            {feed.content.map(content => (
              <Col key={content.id} style={styles.musicCardContainer}>
                <ComposerCard nav={navigate} content={content} />
              </Col>
            ))}
          </Grid>
        </ScrollView>
      </Col>
      {/* featured contents ends here */}
    </Row>
  );
}
