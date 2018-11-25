import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  StyleProvider,
  Text,
  View,
  Icon,
  Button,
  H1,
  Item,
  Label,
  Input,
  Form,
  Container
} from "native-base";
import getTheme from "../themes/components";
import scorenshareTheme from "../themes/variables/scorenshareTheme";
import { styles } from "../themes/variables/customStyles";
import {
  SearchBar,
  LoaderOverlay,
  ErrorOverlay
} from "../components/MiscComponents";

class LoginScreen extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(scorenshareTheme)}>
        <Container>
          <ScrollView style={[{ flex: 1 }, styles.darkBg]}>
            <View
              style={[
                {
                  flex: 1,
                  flexDirection: "row",
                  paddingTop: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }
              ]}
            >
              <View style={{ flex: 1, backgroundColor: "red" }} />
              <View style={[{ flex: 8 }]}>
                <View>
                  <H1 style={styles.redText}>Login</H1>
                </View>
                <View>
                  <Form style={{ flex: 1 }}>
                    <Item floatingLabel>
                      <Label>Username</Label>
                      <Icon name="ios-person" style={styles.greyText} />
                      <Input style={styles.greyText} />
                    </Item>
                    <Item floatingLabel style={{ marginTop: 10 }}>
                      <Label>Password</Label>
                      <Icon name="ios-lock" style={styles.greyText} />
                      <Input style={styles.greyText} secureTextEntry={true} />
                    </Item>
                    <View style={{ paddingTop: 30 }}>
                      <Button full iconRight style={{ borderRadius: 20 }}>
                        <Text>Login</Text>
                        <Icon name="md-log-in" />
                      </Button>
                    </View>
                  </Form>
                </View>
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </ScrollView>
        </Container>
      </StyleProvider>
    );
  }
}
export default LoginScreen;
