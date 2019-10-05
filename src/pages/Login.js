import React, { useState, useEffect } from "react";
import {
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import API from "../services/api";

import Logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [techs, setTechs] = useState();

  useEffect(() => {
    AsyncStorage.getItem("@aircnc:user").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  async function handleSubmit() {
    console.log(email, techs);
    const response = await API.post("/sessions", {
      email
    });

    const { _id } = response.data;
    await AsyncStorage.setItem("@aircnc:user", _id);
    await AsyncStorage.setItem("@aircnc:techs", techs);

    navigation.navigate("List");
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      style={Styles.container}
    >
      <Image source={Logo} />

      <View style={Styles.form}>
        <Text style={Styles.label}>SEU E-MAIL *</Text>
        <TextInput
          style={Styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={Styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          style={Styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={Styles.button}>
          <Text style={Styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});
