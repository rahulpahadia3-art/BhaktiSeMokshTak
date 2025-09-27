import React, { useState } from 'react';
import { View, Text, ScrollView, Button, CheckBox, StyleSheet, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';

const tasks = [
  "सुबह 5:00 बजे उठना",
  "मंगलाचरण करना",
  "समय पर नित्य नियम करना",
  "प्रथम मंत्र की माला करना (मानसिक)",
  "प्रथम मंत्र की माला करना (वीडियो से)",
  "1.5 घंटे सार नाम का जाप करना",
  "समय पर असुर निकंदन रमाइनी करना",
  "सुबह ज्योति जलाना",
  "शाम को संध्या आरती करना",
  "शाम को ज्योति जलाना",
  "प्रथम मंत्र का मानसिक जाप",
  "प्रथम मंत्र का वीडियो से जाप",
  "सार नाम का डेढ़ घंटे जाप",
  "धर्म यज्ञ किया",
  "ज्ञान यज्ञ किया",
  "प्रणाम यज्ञ किया",
  "हवन यज्ञ किया",
  "ध्यान यज्ञ किया",
  "किसी की निंदा नहीं की",
  "ऐसा कोई आचरण नहीं किया जिससे परमात्मा नाराज़ हों"
];

export default function App() {
  const [checked, setChecked] = useState(Array(tasks.length).fill(false));
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('./assets/music.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    playSound();
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, []);

  const toggleCheck = (index) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    setChecked(newChecked);
  };

  const score = checked.filter(Boolean).length * 10;

  return (
    <ImageBackground source={require('./assets/wallpaper.jpg')} style={styles.background}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>भक्ति से मोक्ष तक</Text>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskRow}>
            <CheckBox value={checked[index]} onValueChange={() => toggleCheck(index)} />
            <Text style={styles.taskText}>{task}</Text>
          </View>
        ))}
        <Text style={styles.score}>आज का स्कोर: {score}</Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 20 },
  taskRow: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  taskText: { marginLeft: 10, fontSize: 16 },
  score: { fontSize: 20, fontWeight: "bold", marginTop: 20, textAlign: "center" }
});
