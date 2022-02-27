import 'package:dictionary_app/services/dictionary_service.dart';
import 'package:dictionary_app/viewmodels/meaning_view_model.dart';
import 'package:flutter/material.dart';

enum Status { initial, loading, notfound, success }

class MeaningListViewModel extends ChangeNotifier {
  MeaningViewModel meaningViewModel = MeaningViewModel('', []);
  Status status = Status.initial;
  Future<void> getMeanings(String word) async {
    status = Status.loading;
    notifyListeners();
    List<String> meanings = await DictionaryService().searchWord(word);
    meaningViewModel = MeaningViewModel(word, meanings);
    status = meanings.isNotEmpty ? Status.success : Status.notfound;
    notifyListeners();
  }
}
