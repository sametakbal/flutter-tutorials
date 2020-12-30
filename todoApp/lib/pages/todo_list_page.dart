import 'package:flutter/material.dart';
import 'package:todoApp/data/todo_service.dart';
import 'package:todoApp/models/todo.dart';
import 'package:todoApp/pages/todo_page.dart';

class TodoListPage extends StatefulWidget {
  @override
  _TodoListPageState createState() => _TodoListPageState();
}

class _TodoListPageState extends State<TodoListPage> {
  TodoService service = TodoService.instance;
  List<Todo> todos = [];
  List<Todo> doneTodos = [];

  @override
  void initState() {
    loadData();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("To Do"),
        centerTitle: true,
        bottom: TabBar(
          tabs: [
            Tab(
              icon: Icon(Icons.check_box_outline_blank),
            ),
            Tab(
              icon: Icon(Icons.check),
            ),
          ],
        ),
      ),
      body: TabBarView(
        children: [
          getTodoList(todos),
          getTodoList(doneTodos),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(builder: (_) => TodoPage()))
              .then((value) => loadData());
        },
        child: Icon(Icons.add),
      ),
    );
  }

  Widget getTodoList(List<Todo> todos) {
    return todos.length == 0
        ? Center(child: Text('Henüz bir şey yok'))
        : ListView.builder(
            itemCount: todos.length,
            itemBuilder: (context, index) {
              return Card(
                child: ListTile(
                  title: Text(todos[index].title),
                  subtitle: Text(todos[index].description),
                  trailing: Checkbox(
                    onChanged: (value) {
                      todos[index].isDone = value;
                      service
                          .updateIsDone(todos[index])
                          .then((value) => loadData());
                    },
                    value: todos[index].isDone,
                  ),
                ),
              );
            },
          );
  }

  loadData() {
    service.getTodos(true).then((value) {
      setState(() {
        todos = value;
      });
    });
    service.getTodos(false).then((value) {
      setState(() {
        doneTodos = value;
      });
    });
  }
}
