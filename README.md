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
####Beschreibung
Import von Museumstiteln in die Adressdatei.
####Anmerkung
Nur für Import von Museumstiteln in die Adressdatei. Nur in Verwendung mit csv.js.
####Hinweis
**Das Skript ist ausdrücklich nur für den Gebrauch durch die ZDB-Redaktion. Das Skript kann durch unsachgemäßen Gebrauch großen Schaden verursachen und kann daher nur auf eigene Verantwortung nachgenutzt werden.**

##Datei: zdb_scripte_csv.js
###Skript: zdbBatchWiley
####WinIBW-Versionen:
alle
####Beschreibung
URL-Änderung der Titel in Wiley-Zeitschriften-Paketen
####Anmerkung
Nur URL-Änderungen in Wiley-Zeitschriften-Paketen. Nur in Verwendung mit csv.js.
####Hinweis
**Das Skript ist ausdrücklich nur für den Gebrauch durch die ZDB-Redaktion. Das Skript kann durch unsachgemäßen Gebrauch großen Schaden verursachen und kann daher nur auf eigene Verantwortung nachgenutzt werden.**
###Skript: zdbBatchSage, __csvParseHRLizenz
####WinIBW-Versionen:
alle
####Beschreibung
Umfangreicher Sage Import.
####Anmerkung
Nur Sage-Zeitschriften-Pakete. Nur in Verwendung mit csv.js.
*  - für zdbBatchSage
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
