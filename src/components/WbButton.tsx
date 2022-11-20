import * as React from "react";
import { Pressable, StyleProp, StyleSheet, Text } from "react-native";

interface IButton {
  title: string;
  onPress(): void;
  style?: any;
}

const WbButton = ({ title, onPress, style }: IButton) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "lightblue", padding: "3%" },
  text: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "space-mono",
    textAlign: "center",
  },
});

export default WbButton;
