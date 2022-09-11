import 'package:flutter/material.dart';
import 'package:news_app/pages/news_page.dart';
import 'package:news_app/viewmodel/article_list_view_model.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Haberler',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: ChangeNotifierProvider(
        create: (context) => ArticleListViewModel(),
        child: const NewsPage(),
      ),
    );
  }
}