Datei: zdb_scripts_perUser.js
WinIBW-Versionen: alle
Anmerkung: Standard Scripts f�r CSV Batch Import. Diese Datei steht f�r die DNB_WinIBW im automatischen Update bereit (P:\DNB_WinIBW\WinIBW30\scripts)
Scripts: 
* csvBatchTitel - Pakettitelimport aus CSV
* csvBatchExemplar - Paketlizenzsatzimport aus CSV

Datei: zdbBatchMuseen.js
WinIBW-Versionen: alle
Anmerkung: Nur f�r Import von Museumstiteln in die Adressdatei
Scripts:
* zdbBatchMuseen - ben�tigt Klasse CSV

Datei: zdb_scripte_csv.js
WinIBW-Versionen: alle
Anmerkung: Alle bisherigen CSV-Importskripte (jeweils unterschiedlich f�r den jeweligen Anwendungsfall)
Scripts:
* zdbBatchWiley - URL �nderung
* zdbBatchSage - Umfangreicher Sage Import ben�tigt __csvParseHRLizenz
* __csvParseHRLizenz - f�r zdbBatchSage
* csvBatchLoeschen - Funktionen f�r Erzeugung von L�schs�tzen - NICHT mehr benutzen - BENUTZE Datei setBearbeiten.js
* csvBatchJSTOR - Umfangreicher JSTOR Import

Datei: setBearbeiten.js
WinIBW-Versionen: alle
Anmerkung: Skripte zum Bearbeiten von Sets. Hier m�ssen selber Skripte geschrieben werden. F�r eine einfache Setbearbeitung BENUTZE Funktion sucheErsetze
Scripts:
* setBearbeiten - Hauptfunktion
Callback-Funktionen:
* __leereFunktion - zum Kopieren und �ndern
* __setBearbeitenLokaldatenLoeschen - 08/15 Skript zum Erzeugen von L�schs�tzen (alle Best�nde einer Bibliothek l�schen)
* __setBearbeitenLokaldatenLoeschenOesterreich - extra f�r �sterreich
