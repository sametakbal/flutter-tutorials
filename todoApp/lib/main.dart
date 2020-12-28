import 'package:flutter/material.dart';
import 'package:todoApp/pages/todo_list_page.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: DefaultTabController(
        length: 2,
        child: TodoListPage(),
      ),
    );
  }
}
