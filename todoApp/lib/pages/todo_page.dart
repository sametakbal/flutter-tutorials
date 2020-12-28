import 'package:flutter/material.dart';

class TodoPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final titleField = TextFormField(
      decoration: InputDecoration(
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(5))),
    );
    final descriptionField = TextFormField(
      maxLines: 5,
      decoration: InputDecoration(
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(5))),
    );

    final saveButton = FlatButton(
      onPressed: () {},
      child: Text(
        "Save",
        style: TextStyle(color: Colors.white),
      ),
      color: Colors.blue,
    );
    return Scaffold(
      appBar: AppBar(
        title: Text("New To do"),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: titleField,
          ),
          SizedBox(
            height: 10,
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: descriptionField,
          ),
          saveButton,
        ],
      ),
    );
  }
}
