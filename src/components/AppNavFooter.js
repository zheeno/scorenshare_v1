import React from "react";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { styles } from "../themes/variables/customStyles";

const AppNavFooter = props => {
  const navigate = props.nav;
  return (
    <Footer>
      <FooterTab>
        <Button
          onPress={() => {
            props.activeTab == "Home"
              ? props.reloadLanding()
              : navigate("Home");
          }}
          active={props.activeTab == "Home" ? true : false}
        >
          <Icon
            name="md-albums"
            active={props.activeTab == "Home" ? true : false}
          />
          <Text>Feeds</Text>
        </Button>
        <Button
          onPress={() => {
            navigate("Catalogue");
          }}
          active={props.activeTab == "Catalogue" ? true : false}
        >
          <Icon
            active={props.activeTab == "Catalogue" ? true : false}
            name="ios-disc"
          />
          <Text>Catalogues</Text>
        </Button>
        <Button
          onPress={() => navigate("ComposersScreen")}
          active={props.activeTab == "ComposersScreen" ? true : false}
        >
          <Icon
            active={props.activeTab == "ComposersScreen" ? true : false}
            name="ios-people"
          />
          <Text>Composers</Text>
        </Button>
        <Button
          onPress={() =>
            navigate("SearchScreenContent", { params: { filter: "music" } })
          }
          active={props.activeTab == "Search" ? true : false}
        >
          <Icon
            active={props.activeTab == "Search" ? true : false}
            name="ios-search"
          />
          <Text>Search</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default AppNavFooter;
