import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, Text, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { API_TOKEN } from "@env";

export default function App() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const myHeaders = new Headers();
  myHeaders.append("apikey", API_TOKEN);

  const getExchangeRates = () => {
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${selectedCurrency}&from=EUR&amount=${amount}`,
      requestOptions
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then((data) => {
        setConvertedAmount(data.result);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleConvert = () => {
    Keyboard.dismiss();
    getExchangeRates();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter amount to convert"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      <Picker
        style={{ width: 118 }}
        selectedValue={selectedCurrency}
        onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}
      >
        <Picker.Item label="USD $" value="USD" />
        <Picker.Item label="GBP £" value="GBP" />
        <Picker.Item label="SEK kr" value="SEK" />
        <Picker.Item label="CAD $" value="CAD" />
        <Picker.Item label="JPY ¥" value="JPY" />
        <Picker.Item label="CNY ¥" value="CNY" />
      </Picker>
      <Button title="Convert" onPress={handleConvert} />
      <Text>Converted Amount: {convertedAmount}</Text>
      <StatusBar style="auto" />
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
  input: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
});
