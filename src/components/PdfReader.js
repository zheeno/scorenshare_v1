import React from "react";
import { View, Toast } from "native-base";
import { styles } from "../themes/variables/customStyles";
import { ErrorOverlay } from "./MiscComponents";
import Pdf from "react-native-pdf";

const PdfReader = ({ file }) => {
  return (
    <View style={styles.PdfContainer}>
      {file.uri != null ? (
        <Pdf
          source={{
            uri: file.uri,
            cache: true
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            message = error.message;
            prefix = message.substr(0, 1).toUpperCase();
            affix = message.substr(1, message.length - 1).toLowerCase();
            Toast.show({
              text: prefix + affix,
              buttonText: "Dismiss",
              buttonTextStyle: { color: "#fff" },
              buttonStyle: { borderWidth: 1, borderColor: "#fff" },
              duration: 10000,
              position: "top",
              type: "danger"
            });
          }}
          style={styles.pdf}
        />
      ) : (
        <ErrorOverlay text={"File Not Found"} netErr={false} />
      )}
    </View>
  );
};
export default PdfReader;
