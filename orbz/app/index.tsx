import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Button";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Orbz Project #18</Text>
      </View>

      <View style={styles.footerContainer}>
        <Button label="Login" theme="primary" onPress={() => router.push("/landing")} />
        <Button label="Sign Up" onPress={() => router.push("/landing")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
    padding: 40,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 80,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    gap: 12,
  },
});
