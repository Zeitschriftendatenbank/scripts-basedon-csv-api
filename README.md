# WinIBW3-Skripte basierend auf der WinIBW-CSV-API

##Datei: csvBatchExemplar.js
###Skript: csvBatchExemplar
####WinIBW-Versionen
alle
####Beschreibung
Standard Skript für CSV Batch Import in die ZDB auf Exemplarebene. 
####Anmerkung
Nur in Verwendung mit csv.js.
####Hinweis
**Das Skript ist ausdrücklich nur für den Gebrauch durch die ZDB-Redaktion. Das Skript kann durch unsachgemäßen Gebrauch großen Schaden verursachen und kann daher nur auf eigene Verantwortung nachgenutzt werden.**

###Skript: csvBatchTitel
####WinIBW-Versionen
alle
####Beschreibung
Standard Skript für CSV Batch Import in die ZDB auf Titelebene.
####Anmerkung
Nur in Verwendung mit csv.js.
####Hinweis
**Das Skript ist ausdrücklich nur für den Gebrauch durch die ZDB-Redaktion. Das Skript kann durch unsachgemäßen Gebrauch großen Schaden verursachen und kann daher nur auf eigene Verantwortung nachgenutzt werden.**

##Datei: zdbBatchMuseen.js
###Skript: zdbBatchMuseen
####WinIBW-Versionen:
alle
####Anmerkung
Nur für Import von Museumstiteln in die Adressdatei. Nur in Verwendung mit csv.js.
####Hinweis
**Das Skript ist ausdrücklich nur für den Gebrauch durch die ZDB-Redaktion. Das Skript kann durch unsachgemäßen Gebrauch großen Schaden verursachen und kann daher nur auf eigene Verantwortung nachgenutzt werden.**

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
