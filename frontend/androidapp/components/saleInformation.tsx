import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SaleInformation() {
  

  const [detailsVisible, setdetailsVisible] = useState(false);

  return (
    <View style={{ backgroundColor: "#FFF", width: "100%", borderRadius: 20, height: (detailsVisible ? 200 : 40), paddingHorizontal: 12, alignItems: "center", elevation: 2 }}>

      {/* View que contém a data, origem/destino e o botão de visualizar mais detalhes do frete */}
      <TouchableOpacity style={{ width: "100%", height: 40, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }} onPress={() => setdetailsVisible(!detailsVisible)} >
        <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >11/06 Minerajil X Supermix</Text>
        <Ionicons name={detailsVisible ? "chevron-down-outline" : "chevron-back-outline"} size={24} color="#202020" />
      </TouchableOpacity>

      {/* View onde está as informações dos fretes */}
      <View style={{ display: (detailsVisible ? "flex" : "none") ,marginTop: 16, flexDirection: "column", gap: 8 }}>
        {/* Data do frete */}
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Data:</Text>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >11/06/2024</Text>
        </View>

        {/* Origem do frete */}
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Origem:</Text>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Minerajil</Text>
        </View>

        {/* Destino do frete */}
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Destino:</Text>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Supermix</Text>
        </View>

        {/* Carga do frete */}
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Carga:</Text>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Areia</Text>
        </View>

        {/* Valor do frete */}
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >Valor::</Text>
          <Text style={{ fontFamily: "outfit-regular", fontSize: 18, color: "#202020" }} >R$3.450,27</Text>
        </View>
      </View>
    </View>
  )
}