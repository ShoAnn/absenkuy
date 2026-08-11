import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState<string>('');
  const [message, setMessage] = useState<String>('');
  const [error, setError] = useState<String>('');

  const addTodo = (): void => {
    if (!text.trim()) return;
    setTodos([{ id: Date.now().toString(), title: text.trim(), done: false }, ...todos]);
    setText('');
    setMessage("Task added succesfully");
  };

  const toggleTodo = (id: string): void => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id: string): void => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      {message && (
        <Text style={styles.messageSuccess}>{message}</Text>
      )}
      {error && (
        <Text style={styles.messageError}>{message}</Text>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet</Text>}
        renderItem={({ item }: { item: Todo }) => (
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowLeft} onPress={() => toggleTodo(item.id)}>
              <Text style={[styles.check, item.done && styles.checkDone]}>
                {item.done ? '☑' : '☐'}
              </Text>
              <Text style={[styles.rowText, item.done && styles.rowTextDone]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  inputRow: { flexDirection: 'row', marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 22 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  check: { fontSize: 20, marginRight: 10 },
  checkDone: { color: '#6C5CE7' },
  rowText: { fontSize: 16 },
  rowTextDone: { textDecorationLine: 'line-through', color: '#aaa' },
  delete: { fontSize: 16, color: '#ccc', paddingHorizontal: 6 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 40 },
  messageSuccess: { textAlign: 'center', color: 'green', marginTop: 20 },
  messageError: { textAlign: 'center', color: 'red', marginTop: 20 },
});