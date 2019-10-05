import React, { useState, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";

import { withNavigation } from "react-navigation";

import API from "../../services/api";

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await API.get("/spots", {
        params: { tech }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate("Book", { id });
  }

  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>
        Empresas que usam <Text style={Styles.bold}>{tech}</Text>
      </Text>
      <FlatList
        style={Styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={Styles.listItem}>
            <Image
              style={Styles.thumbnail}
              source={{
                uri: "http://192.168.1.10:3333/files/192x192-1569972790973.png"
              }}
            />
            <Text style={Styles.company}>{item.company}</Text>
            <Text style={Styles.price}>
              {item.price ? `R$ ${item.price}/dia` : "GRATUITO"}
            </Text>
            <TouchableOpacity
              onPress={() => handleNavigate(item._id)}
              style={Styles.button}
            >
              <Text style={Styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: "#444",
    paddingHorizontal: 20,
    marginBottom: 15
  },
  bold: {
    fontWeight: "bold"
  },
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginRight: 15
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 2
  },
  company: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10
  },
  price: {
    fontSize: 15,
    color: "#999",
    marginTop: 5
  },
  button: {
    height: 32,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 15
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14
  }
});

export default withNavigation(SpotList);
