# WinIBW3-Skripte basierend auf der WinIBW-CSV-API

## Datei: csvBatchExemplar.js
###WinIBW-Versionen
alle
###Beschreibung
Standard Skript für CSV Batch Import in die ZDB auf Exemplarebene. 
###Anmerkung
**Das Skript ist ausdrücklich nur für den ZDB-internen Gebrauch. Die Nutzung des Skripts durch kann zu  
* csvBatchTitel - Pakettitelimport aus CSV
* csvBatchExemplar - Paketlizenzsatzimport aus CSV

Datei: zdbBatchMuseen.js
WinIBW-Versionen: alle
Anmerkung: Nur für Import von Museumstiteln in die Adressdatei
Scripts:
* zdbBatchMuseen - benötigt Klasse CSV

Datei: zdb_scripte_csv.js
WinIBW-Versionen: alle
Anmerkung: Alle bisherigen CSV-Importskripte (jeweils unterschiedlich für den jeweligen Anwendungsfall)
Scripts:
* zdbBatchWiley - URL Änderung
* zdbBatchSage - Umfangreicher Sage Import benötigt __csvParseHRLizenz
* __csvParseHRLizenz - für zdbBatchSage
* csvBatchLoeschen - Funktionen für Erzeugung von Löschsätzen - NICHT mehr benutzen - BENUTZE Datei setBearbeiten.js
* csvBatchJSTOR - Umfangreicher JSTOR Import

Datei: setBearbeiten.js
WinIBW-Versionen: alle
Anmerkung: Skripte zum Bearbeiten von Sets. Hier müssen selber Skripte geschrieben werden. Für eine einfache Setbearbeitung BENUTZE Funktion sucheErsetze
Scripts:
* setBearbeiten - Hauptfunktion
Callback-Funktionen:
* __leereFunktion - zum Kopieren und Ändern
* __setBearbeitenLokaldatenLoeschen - 08/15 Skript zum Erzeugen von Löschsätzen (alle Bestände einer Bibliothek löschen)
* __setBearbeitenLokaldatenLoeschenOesterreich - extra für Österreich
