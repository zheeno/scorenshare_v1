import React from "react";
import CatalogueCard from "../components/Music/CatalogueCard";
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from "react-native";
import { Text, Toast } from "native-base";
import { styles } from "../themes/variables/customStyles";

export function renderCatalogue(catalogue) {
  return <CatalogueCard key={catalogue.id} content={catalogue} />;
}
