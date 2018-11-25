import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
// import { fromLeft } from "react-navigation-transitions";
import HomeScreen from "./src/screens/HomeScreen";
import CatalogueScreen from "./src/screens/CatalogueScreen";
import CatalogueContentScreen from "./src/screens/CatalogueContentScreen";
import MusicContentScreen from "./src/screens/MusicContentScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { Root } from "native-base";
import AppHeader from "./src/components/AppHeader";
import { StatusBar } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import { styles } from "./src/themes/variables/customStyles";
const RootStack = createStackNavigator(
  {
    LoginPage: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          headerTitle: (
            <AppHeader
              menu={false}
              loggedIn={true}
              nav={navigate}
              right={true}
              regBtn={true}
            />
          ),
          headerStyle: {
            height: 50,
            backgroundColor: "#310a11"
          }
        };
      }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        const { navigate } = navigation;
        return {
          headerTitle: (
            <AppHeader
              menu={true}
              loggedIn={true}
              nav={navigate}
              right={true}
              profileBtn={true}
            />
          ),
          headerStyle: {
            height: 50,
            backgroundColor: "#310a11"
          }
        };
      }
    },
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
        <StatusBar hidden={true} />
        <RootStack />
      </Root>
    );
  }
}
