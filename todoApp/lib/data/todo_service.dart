import 'package:todoApp/models/todo.dart';

class TodoService {
  static List<Todo> todos = [];

  static List<Todo> getTodos() {
    if (todos.isEmpty) {
      todos.add(Todo(
          id: 1,
          title: "Kitap oku",
          description: "En az 50 sayfa",
          isDone: false));
      todos.add(Todo(
          id: 2,
          title: "Spor Yap",
          description: "Spor salonuna git",
          isDone: false));
      todos.add(Todo(
          id: 3,
          title: "Oda temizliği",
          description: "Oda temizliği yap",
          isDone: false));
      todos.add(Todo(
          id: 4,
          title: "Ders çalış",
          description: "Sınava hazırlık yap.",
          isDone: true));
    }
    return todos.where((element) => !element.isDone).toList();
  }

  static List<Todo> getDoneTodos() {
    return todos.where((element) => element.isDone).toList();
  }
}
