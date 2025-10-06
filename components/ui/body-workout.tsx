import { useState } from "react";
import Body from "react-native-body-highlighter";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Body
        data={[
          { slug: "chest", intensity: 1 },
          { slug: "abs", intensity: 2 },
        ]}
        gender="female"
        side="front"
        scale={1.7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
