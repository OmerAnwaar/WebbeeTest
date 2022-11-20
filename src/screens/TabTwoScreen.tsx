import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { Text, View } from "../components/Themed";
import { RootState } from "../store/store";

export default function TabTwoScreen() {
  const count = useSelector((state: RootState) => state.category.value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Text style={styles.title}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
