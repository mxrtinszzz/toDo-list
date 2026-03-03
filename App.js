import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
export default function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function lineTask(id) {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks toDo</Text>

      <View style={styles.float}>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={task}
            onChangeText={setTask}
            placeholder="add a task"
            placeholderTextColor="#aaa"
          />

          <Pressable style={styles.button} onPress={addTask}>
            <Text>Add</Text>
          </Pressable>
        </View>

        {/* LISTA COM MESMO PADDING DO INPUT */}
        <ScrollView
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {tasks.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => lineTask(item.id)}
              style={{ marginBottom: 10 }}
            >
              <Text
                style={{
                  color: item.completed ? "#888" : "#fff",
                  fontSize: 16,
                  textDecorationLine: item.completed
                    ? "line-through"
                    : "none",
                  textDecorationColor: "#d3acf1",
                }}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0D0714',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#d3acf1',
    fontSize: 20,
    marginBottom: 20,
  },

  float: {
    backgroundColor: '#1f132d',
    width: 300,
    height: 500,
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  input: {
    width: 200,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#463462',
    paddingHorizontal: 10, // 👈 referência de alinhamento
    textAlignVertical: 'center',
    color: '#fff',
    borderWidth: 0,
    outlineWidth: 0,
  },

  button: {
    height: 45,
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#d3acf1',
    borderRadius: 8,
  },

});