import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import {
  Alert,
  AsyncStorage,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from "react-native";

import SpotList from "../components/SpotList";

import Logo from "../assets/logo.png";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("@aircnc:user").then(user_id => {
      const socket = socketio("http://192.168.1.10:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        const status = booking.approved ? "APROVADA" : "REJEITADA";
        Alert.alert(
          `Sua reserva em ${booking.spot.company} na data de ${booking.date} foi ${status}!`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("@aircnc:techs").then(storageTechs => {
      const arrTechs = storageTechs.split(",").map(tech => tech.trim());
      setTechs(arrTechs);
    });
  }, []);

  return (
    <SafeAreaView style={Styles.container}>
      <Image style={Styles.logo} source={Logo} />
      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 10
  }
});
