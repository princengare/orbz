import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { useState, useLocalSearchParams, Link, useEffect, useRef } from "react";
import Button from "@/components/Button";

export default function Image() {
    const router = useRouter();
    const [horoscopeMessage, setHoroscopeMessage] = useState("");
    const { zodiac, timeZone } = useGlobalSearchParams();
    const [loading, setLoading] = useState(true);
    const viewShotRef = useRef(null);

    const fetchHoroscope = async (zodiac, timeZone) => {
        const openAiApiKey = 'sk-proj-apiKey';
    
        const prompt = `Generate a daily horoscope prediction for someone born under the ${zodiac} zodiac sign, considering their time zone of ${timeZone}. The horoscope should be around 3 sentences, offering advice and predictions for the day.`;
      
        console.log("Sending API request...");
      
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openAiApiKey.trim()}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: "You are an astrology expert generating daily horoscopes." },
                { role: 'user', content: prompt }
              ],
              max_tokens: 150,
              temperature: 0.7,
            }),
          });
        
          console.log("Response status:", response.status);
        
          if (response.ok) {
            const data = await response.json();
            console.log("API response data:", data);
        
            const horoscope = data.choices[0]?.message?.content.trim();
        
            if (horoscope) {
              setHoroscopeMessage(horoscope);
            } else {
              Alert.alert("Error", "No horoscope message returned.");
            }
          } else {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            Alert.alert("Error", `Failed to fetch horoscope. ${errorData.error?.message || "Unknown error"}`);
          }
        } catch (error) {
          console.error("API request failed:", error);
          Alert.alert("Error", "Failed to fetch horoscope. Please try again.");
        } finally {
            setLoading(false);
        }
      };

      const captureAndShare = async () => {
        try {
            const uri = await viewShotRef.current.capture();
            console.log("Image saved to", uri);

            if (!(await Sharing.isAvailableAsync())) {
                Alert.alert("Sharing not available");
                return;
            }

            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error("Error capturing or sharing:", error);
        }
    };

      useEffect(() => {
        if (zodiac && timeZone) {
            fetchHoroscope(zodiac, timeZone);
          } else {
            setLoading(false);
            Alert.alert("Error", "Missing zodiac sign or time zone.");
          }
      }, [zodiac, timeZone]);

      
      return (
        <View style={styles.container}>
            <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
                {loading ? (
                    <ActivityIndicator size="large" color="#ffd33d" />
                ) : (
                    <Text style={styles.horoscopeText}>{horoscopeMessage}</Text>
                )}
            </ViewShot>
            <Button label="Share" theme="primary" onPress={captureAndShare} />
            <Button label="Back" theme="secondary" onPress={() => router.push("/")} />
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
    horoscopeContainer: {
        padding: 20,
        backgroundColor: "#333",
        borderRadius: 10,
        alignItems: "center",
    },
    horoscopeText: {
        color: "#ffd33d",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 20,
    },
});
