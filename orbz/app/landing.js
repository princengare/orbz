import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import Button from "@/components/Button";

const zodiacSigns = [
  { sign: "Aries", start: "03-21", end: "04-19" },
  { sign: "Taurus", start: "04-20", end: "05-20" },
  { sign: "Gemini", start: "05-21", end: "06-20" },
  { sign: "Cancer", start: "06-21", end: "07-22" },
  { sign: "Leo", start: "07-23", end: "08-22" },
  { sign: "Virgo", start: "08-23", end: "09-22" },
  { sign: "Libra", start: "09-23", end: "10-22" },
  { sign: "Scorpio", start: "10-23", end: "11-21" },
  { sign: "Sagittarius", start: "11-22", end: "12-21" },
  { sign: "Capricorn", start: "12-22", end: "01-19" },
  { sign: "Aquarius", start: "01-20", end: "02-18" },
  { sign: "Pisces", start: "02-19", end: "03-20" },
];

export default function Landing() {
  const router = useRouter();
  const [birthday, setBirthday] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [horoscopeMessage, setHoroscopeMessage] = useState("");

  //make zodiacSign and timeZone global to be shared to image.js

  const getZodiacSign = (date) => {
    for (let sign of zodiacSigns) {
      const [startMonth, startDay] = sign.start.split("-").map(Number);
      const [endMonth, endDay] = sign.end.split("-").map(Number);
      const [birthMonth, birthDay] = date.split("-").map(Number);

      if (
        (birthMonth === startMonth && birthDay >= startDay) ||
        (birthMonth === endMonth && birthDay <= endDay)
      ) {
        return sign.sign;
      }
    }
    return "";
  };
  
  const handleSubmit = () => {
    if (!birthday || !timeZone) {
      Alert.alert("Error", "Please enter both your birthday and time zone.");
      return;
    }

    const userZodiac = getZodiacSign(birthday);
    

    if (userZodiac) {
      router.push({ pathname: "/image", params: { zodiac: userZodiac, timeZone } });
    } else {
      Alert.alert("Error", "Invalid birthday format. Use MM-DD.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Astrology Prediction</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your birthday (MM-DD)"
        placeholderTextColor="#aaa"
        value={birthday}
        onChangeText={setBirthday}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your time zone (e.g., GMT-5)"
        placeholderTextColor="#aaa"
        value={timeZone}
        onChangeText={setTimeZone}
      />

      <Button label="Get Horoscope" theme="primary" onPress={handleSubmit} />

      <Button label="Exit" theme="secondary" onPress={() => router.push("/")} />
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
  header: {
    color: "#ffd33d",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#333",
  },
  zodiac: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
  },
});
