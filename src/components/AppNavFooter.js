import React from "react";
import { Footer, FooterTab, Button, Icon } from "native-base";
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
        </Button>
        <Button active={props.activeTab == "Music" ? true : false}>
          <Icon
            active={props.activeTab == "Music" ? true : false}
            name="ios-musical-notes"
          />
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
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default AppNavFooter;
