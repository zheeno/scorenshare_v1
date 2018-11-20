import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
// import { fromLeft } from "react-navigation-transitions";
import HomeScreen from "./src/screens/HomeScreen";
import CatalogueScreen from "./src/screens/CatalogueScreen";
import CatalogueContentScreen from "./src/screens/CatalogueContentScreen";
import MusicContentScreen from "./src/screens/MusicContentScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { Root } from "native-base";
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Catalogue: CatalogueScreen,
    CatalogueContent: CatalogueContentScreen,
    MusicContent: MusicContentScreen,
    SearchScreenContent: SearchScreen
  },
  {
    initialRouteName: "Home",
    // transitionConfig: () => fromLeft(),
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#310a11"
      },
      headerTintColor: "#fff"
    }
  }
);

export default class App extends Component {
  render() {
    return (
      <Root>
        <RootStack />
      </Root>
    );
  }
}
