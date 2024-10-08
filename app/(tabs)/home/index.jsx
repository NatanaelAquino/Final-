import React, { useState, useEffect } from "react"
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import * as Location from "expo-location"
import useChatGPT from '../../../src/hook/useChatGPT'

const FormExample = () => {
  const [formData, setFormData] = useState({
    solo: "",
    plantacao: "",
  });
  const { responseText, loading, error, callChatGPT } = useChatGPT()

  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== "granted") {
          setErrorMsg("Permissão para acessar a localização foi negada")
          return
        }

        let currentLocation = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = currentLocation.coords
        setLocation({ latitude, longitude })

      } catch (error) {
        setErrorMsg("Erro ao obter a cidade: " + error.message)
      }
    })()
  }, [])
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = () => {
    if (!formData.solo || !formData.plantacao || !location) {
      Alert.alert("Erro", "Preencha todos os campos e a localização!")
      return
    }
    callChatGPT(formData.solo, location, formData.plantacao)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Plantação:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o que você vai plantar"
        value={formData.plantacao}
        onChangeText={(value) => handleInputChange("plantacao", value)}
      />
      <Text style={styles.label}>Tipo de Solo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite Tipo de Solo"
        value={formData.solo}
        onChangeText={(value) => handleInputChange("solo", value)}
      />
      <Button title="Enviar" onPress={handleSubmit} />

      {loading && <Text>Carregando...</Text>}
      {error && <Text>{error}</Text>}
      {responseText && <Text>Melhor horário de irrigação: {responseText}</Text>}
      {errorMsg && <Text>{errorMsg}</Text>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
})

export default FormExample;

