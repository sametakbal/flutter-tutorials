import 'dart:io';

import 'package:path_provider/path_provider.dart';
import 'package:sqflite/sqflite.dart';
import 'package:todoApp/models/todo.dart';

class TodoService {
  static TodoService instance = TodoService._internal();

  TodoService._internal();

  factory TodoService() {
    return instance;
  }

  Future<List<Todo>> getTodos(bool isDone) async {
    final mapList = await getTodoMaps();
    List<Todo> todoList = [];

    mapList.forEach((element) {
      todoList.add(Todo.fromMap(element));
    });

    if (isDone) {
      return todoList.where((element) => !element.isDone).toList();
    }
    return todoList.where((element) => element.isDone).toList();
  }

  Future<List<Map<String, dynamic>>> getTodoMaps() async {
    Database db = await this.db;
    return await db.query('todos');
  }

  static Database _db;

  Future<Database> get db async {
    if (_db == null) {
      _db = await _initDb();
    }
    return _db;
  }

  Future<Database> _initDb() async {
    Directory dir = await getApplicationDocumentsDirectory();
    String path = dir.path + 'todo.db';
    final todoDb = await openDatabase(path, version: 1, onCreate: _createDb);
    return todoDb;
  }

  void _createDb(Database db, int version) async {
    await db.execute(
        'CREATE TABLE todos(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'title TEXT,description TEXT,isDone INT)');
  }

  Future<int> addTodo(Todo todo) async {
    Database db = await this.db;
    int res = await db.insert('todos', todo.toMap());
    print(res.toString());
    return res;
  }

  Future<int> updateIsDone(Todo todo) async {
    Database db = await this.db;
    return await db
        .update('todos', todo.toMap(), where: 'id=?', whereArgs: [todo.id]);
  }
}
