import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Index = () => {
  const [inputs, setInputs] = useState([{ id: 0, time: "" }])


  const addTextInput = () => {
    setInputs([...inputs, { id: inputs.length, time: "" }])
  };

  const handleTimeChange = (input, index) => {
    let formattedInput = input.replace(/[^\d]/g, "")

    if (formattedInput.length >= 3) {
      formattedInput = formattedInput.slice(0, 2) + ":" + formattedInput.slice(2, 4)
    }

    const newInputs = inputs.map((inputField, i) =>
      i === index ? { ...inputField, time: formattedInput } : inputField
    )
    setInputs(newInputs)
  }

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((inputField, i) => i !== index);
    setInputs(newInputs);
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>HORÁRIOS</Text>
      {inputs.map((inputField, index) => (
        <SafeAreaView key={index} style={style.conteudo}>
          <TextInput
            style={style.textInput}
            value={inputField.time}
            onChangeText={(text) => handleTimeChange(text, index)}
            keyboardType="numeric"
            placeholder="00:00"
            maxLength={5}
          />
          <TouchableOpacity
            style={style.button}
            onPress={() => handleRemoveInput(index)}
          >
            <MaterialIcons name="clear" size={30} color="black" />
          </TouchableOpacity>
        </SafeAreaView>
      ))}
      <Button title="Adicionar horário" onPress={addTextInput} color="#841584" />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    marginRight: 10,
    textAlign:'center',
  },
  button: {
    padding: 10,
  },
});

export default Index;
