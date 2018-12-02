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
  Container,
  Spinner
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
  componentDidMount() {}

  constructor(props) {
    super(props);
    this.state = {
      verifying: false,
      username: "",
      password: ""
    };
  }
  initLogin() {
    var username = this.state.username;
    var password = this.state.password;
    this.setState({ verifying: false });
    alert(username + " " + password);
    if (username.length > 0 && password.length > 0) {
      alert(username + " " + password);
      this.setState({ verifying: true });
    } else {
      // alert user
      this.setState({ verifying: false });
    }
  }
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
              <View style={{ flex: 1 }} />
              <View style={[{ flex: 8 }]}>
                <View>
                  <H1 style={styles.redText}>Login</H1>
                </View>
                <View>
                  <Form style={{ flex: 1 }}>
                    <Item floatingLabel>
                      <Label>Username</Label>
                      <Icon name="ios-person" style={styles.greyText} />
                      <Input
                        style={styles.greyText}
                        onChangeText={text => {
                          this.setState({ username: text });
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{ marginTop: 10 }}>
                      <Label>Password</Label>
                      <Icon name="ios-lock" style={styles.greyText} />
                      <Input
                        style={styles.greyText}
                        secureTextEntry={true}
                        onChangeText={text => {
                          this.setState({ password: text });
                        }}
                      />
                    </Item>
                    <View style={{ paddingTop: 30 }}>
                      <Button
                        full
                        iconRight
                        style={{ borderRadius: 20 }}
                        onPress={() => {
                          this.initLogin();
                        }}
                      >
                        <Text>Login</Text>

                        <Icon
                          name={
                            this.state.verifying ? "md-spinner" : "md-log-in"
                          }
                          type="MaterialIcons"
                        />
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
