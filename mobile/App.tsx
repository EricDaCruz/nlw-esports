import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PropsButton {
  title: string;
}

function Button ({title}: PropsButton) {
  return(
    <TouchableOpacity onPress={()=>console.log('Clicou no',title)}>
      <Text style={styles.button}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello React Native!</Text>
      <Button title="Botão 1"/>
      <Button title="Botão 2"/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 22,
    marginBottom: 20,
  },
  button:{
    color: '#9e9e9e',
    fontSize: 18,
    marginBottom: 10,
  }
});
