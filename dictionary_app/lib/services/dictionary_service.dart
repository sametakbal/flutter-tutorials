import 'dart:convert';

import 'package:dictionary_app/models/kelimler_response.dart';
import 'package:http/http.dart' as http;

class DictionaryService {
  Future<List<String>> searchWord(String word) async {
    Uri url = Uri.parse('https://sozluk.gov.tr/gts?ara=$word');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final result = json.decode(response.body);
      List<String> anlamlar = [];
      if (result[0] != null) {
        KelimelerResponse kelimelerResponse =
            KelimelerResponse.fromJson(result[0]);
        for (AnlamlarList anlam in kelimelerResponse.anlamlarList!) {
          anlamlar.add(anlam.anlam!);
        }
      }
      return anlamlar;
    }

    throw Exception('Bad Request');
  }
}
