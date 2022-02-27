class KelimelerResponse {
  List<AnlamlarList>? anlamlarList;
  KelimelerResponse({this.anlamlarList});

  KelimelerResponse.fromJson(Map<String, dynamic> json) {
    if (json['anlamlarListe'] != null) {
      anlamlarList = [];
      json['anlamlarListe']
          .forEach((a) => anlamlarList!.add(AnlamlarList.fromJson(a)));
    }
  }
}

class AnlamlarList {
  String? anlam;

  AnlamlarList({this.anlam});

  AnlamlarList.fromJson(Map<String, dynamic> json) {
    anlam = json['anlam'];
  }
}
