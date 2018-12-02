import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
// import { fromLeft } from "react-navigation-transitions";
import { Root } from "native-base";
import HomeScreen from "./src/screens/HomeScreen";
import CatalogueScreen from "./src/screens/CatalogueScreen";
import CatalogueContentScreen from "./src/screens/CatalogueContentScreen";
import MusicContentScreen from "./src/screens/MusicContentScreen";
import SearchScreen from "./src/screens/SearchScreen";
import AppHeader from "./src/components/AppHeader";
import { StatusBar } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import ComposerScreen from "./src/screens/ComposerScreen";
import ComposersContentScreen from "./src/screens/ComposersContentScreen";

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
    Catalogue: {
      screen: CatalogueScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Catalogues"
        };
      }
    },
    CatalogueContent: {
      screen: CatalogueContentScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: navigation.getParam("title")
        };
      }
    },
    MusicContent: {
      screen: MusicContentScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: null,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "transparent"
          }
        };
      }
    },
    SearchScreenContent: SearchScreen,
    ComposersScreen: {
      screen: ComposersContentScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: "Composers"
        };
      }
    },
    ComposerContent: {
      screen: ComposerScreen,
      navigationOptions: ({ navigation }) => {
        return {
          title: navigation.getParam("title")
        };
      }
    }
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
