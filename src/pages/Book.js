import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import API from "../services/api";

export default function Book({ navigation }) {
  const id = navigation.getParam("id");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem("@aircnc:user");
    await API.post(`/spots/${id}/bookings`, { date }, { headers: { user_id } });

    Alert.alert("Solicitação de reserva enviada com sucesso!");
    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={Styles.container}>
      <Text style={Styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={Styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={handleSubmit} style={Styles.button}>
        <Text style={Styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCancel}
        style={[Styles.button, Styles.cancelButton]}
      >
        <Text style={Styles.buttonText}>Cancelar Reserva</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
