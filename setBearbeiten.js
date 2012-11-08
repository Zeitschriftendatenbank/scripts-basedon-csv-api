/**
* Sammlung von Skripten zur Bearbetung von Sets
* alle WinIBW3 Versionen
* HOWTO:
* 1.  Funktion __leereFunktion(iterator,csv) kopieren, umbennen und anspassen
* 2. Funktion setBearbeiten anpassen:
*	- Log-Datei anpassen
*	- IDN der eigenen Bibliothek setzen (für welche Bibliothek wird das Set bearbeitet?)
*	- Name der auszuführenden eigenen Funktion (vorher __leereFunktion) in die do-while Schleife
*/
function setBearbeiten()
{

	var csv = new CSV();
	csv.__csvSetLogFilename("loeschen_LOG.txt");
	
	// IDN der eigenen Bibliothek
	csv.__csvSetEigeneBibliothek("026770687");
    
	var setSize = application.activeWindow.getVariable("P3GSZ");

    i = 1;
    do {

		// diese Funktion kann ausgetauscht werden
		__setBearbeitenLokaldatenLoeschen(i,csv);

        i++;

    } while (i <= setSize)

}
/**
* Template fuer eine eigene Funktion, die ausgeführt werden soll
* Fuer Funktionen, die mir csv zur Verfuegung stehen, siehe https://github.com/cKlee/WinIBW-CSV-API  
*/
function __leereFunktion(iterator,csv) {
	// edit record
	try
	{
		application.activeWindow.command("k " + iterator,false);
		var idn = application.activeWindow.getVariable("P3GPP");
	}
	catch(e) 
	{
		csv.__csvLOG("\tDatensatz kann nicht geoeffnet werden.\nFehlermeldung: " + e);
		return;
	}
	if (application.activeWindow.status != "ERROR")
	{
			//
			// HIER EIGENE BEFEHLE EINGEBEN
			//
	
	}
	//	save buffer
		return csv.__csvSaveBuffer(true,newfield);

	} else {
		//	return undone but write error to a log file
		return csv.__csvSaveBuffer(false,"\tDatensatz kann nicht geoeffnet werden. Status = ERROR.");
	}
}


function __setBearbeitenLokaldatenLoeschen(iterator,csv)
{
	// edit record
	try
	{
		application.activeWindow.command("k " + iterator,false);
		var idn = application.activeWindow.getVariable("P3GPP");
	}
	catch(e) 
	{
		csv.__csvLOG("\tDatensatz kann nicht geoeffnet werden.\nFehlermeldung: " + e);
		return;
	}
	if (application.activeWindow.status != "ERROR")
	{

		// go to the end of the buffer
		application.activeWindow.title.endOfBuffer(false);
		var lastLineNumber = application.activeWindow.title.currentLineNumber;
		var currentField = "";
		var newfield = "";
		
		// go to the local records
		application.activeWindow.title.findTag("7001",0,false,true,false);

		// search returns array of line counts
		var hitLines = csv.__utilCsvBatchCSVSearch(csv.eigene_bibliothek,lastLineNumber);
		

		if(hitLines.length == 0)
		{
			return csv.__csvSaveBuffer(false,"String " + csv.eigene_bibliothek + " kann nicht gefunden werden.\n");
		}
		
		
		for(var i = 0; i < hitLines.length;i++)
		{
			
			// go to the local records
			application.activeWindow.title.findTag("7001",0,false,true,false);	

			// go to the current hit 
			application.activeWindow.title.lineDown(hitLines[i],false);
		
			// go one line up
			//application.activeWindow.title.lineUp(1,false);			
			
			// as long as regex test is false
			var test = false;
			var count = 0;
			
			do
			{
				// write selection into variable
				currentField = application.activeWindow.title.currentField;
				test = csv.__utilCsvBatchCSVLineUpAndTest70XX(currentField);

			
				count++;
			} while(test != true && count < 10)
			
			// write selection into variable
			application.activeWindow.title.lineDown(1,false);
			currentField = application.activeWindow.title.currentField;
			//csv.__csvError(currentField);
			// replace x?? with l; {0,2} : zero or two letters after the x
			newfield = currentField.replace(/: [xau].{0,2}/,': l');
			// select current line
			application.activeWindow.title.startOfField(false);
			application.activeWindow.title.endOfField(true);
			// inert new field content
			application.activeWindow.title.insertText(newfield);
			csv.__csvLOG(idn + "\tErsetzt: "+ currentField + " gegen " + newfield + " in Zeile " + application.activeWindow.title.currentLineNumber);

		}

	//	save buffer
		return csv.__csvSaveBuffer(true,newfield);

	} else {
		//	return undone but write error to a log file
		return csv.__csvSaveBuffer(false,"\tDatensatz kann nicht geoeffnet werden. Status = ERROR.");
	}			
} // end of method




function __setBearbeitenLokaldatenLoeschenOesterreich(iterator,csv)
{
	// edit record
	try
	{
		application.activeWindow.command("k " + iterator,false);
		var idn = application.activeWindow.getVariable("P3GPP");
	}
	catch(e) 
	{
		csv.__csvLOG("\tDatensatz kann nicht geoeffnet werden.\nFehlermeldung: " + e);
		return;
	}
	if (application.activeWindow.status != "ERROR")
	{

		// go to the end of the buffer
		application.activeWindow.title.endOfBuffer(false);
		var lastLineNumber = application.activeWindow.title.currentLineNumber;
		var currentField = "";
		var newfield = "";
		
		// go to the local records
		application.activeWindow.title.findTag("7001",0,false,true,false);

		// search returns array of line counts
		//var hitLines = csv.__utilCsvBatchCSVSearch(csv.eigene_bibliothek,lastLineNumber);
		
// oesterreich
		var hitLines = csv.__utilCsvBatchCSVSearch(" : l",lastLineNumber);

		if(hitLines.length == 0)
		{
			return csv.__csvSaveBuffer(false,"String " + csv.eigene_bibliothek + " kann nicht gefunden werden.\n");
		}
		
		
		for(var i = 0; i < hitLines.length;i++)
		{
			
			// go to the local records
			application.activeWindow.title.findTag("7001",0,false,true,false);	

			// go to the current hit 
			application.activeWindow.title.lineDown(hitLines[i],false);
		
			// go one line up
			//application.activeWindow.title.lineUp(1,false);			
			
			// as long as regex test is false
			var test = false;
			var count = 0;
			
			do
			{
				// write selection into variable
				currentField = application.activeWindow.title.currentField;
				//test = csv.__utilCsvBatchCSVLineUpAndTest70XX(currentField);

// oesterreich				
test = csv.__utilCsvBatchCSVLineDownAndTestRegex(currentField,/7120 /g);
if(test == true) application.activeWindow.title.lineUp(1,false);
			
				count++;
			} while(test != true && count < 10)
			
			// write selection into variable
			/*
			application.activeWindow.title.lineDown(1,false);
			currentField = application.activeWindow.title.currentField;
			//csv.__csvError(currentField);
			// replace x?? with l; {0,2} : zero or two letters after the x
			newfield = currentField.replace(/: [xau].{0,2}/,': l');
			// select current line
			application.activeWindow.title.startOfField(false);
			application.activeWindow.title.endOfField(true);
			// inert new field content
			application.activeWindow.title.insertText(newfield);
			csv.__csvLOG(idn + "\tErsetzt: "+ currentField + " gegen " + newfield + " in Zeile " + application.activeWindow.title.currentLineNumber);
			*/
// oesterreich			
currentField = application.activeWindow.title.currentField;
application.activeWindow.title.deleteLine(1);
var newfield = "7120 geloescht";
		}

	//	save buffer
		return csv.__csvSaveBuffer(true,newfield);

	} else {
		//	return undone but write error to a log file
		return csv.__csvSaveBuffer(false,"\tDatensatz kann nicht geoeffnet werden. Status = ERROR.");
	}			
} // end of method