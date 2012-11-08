/********************************************************************************************************************
*********************************************************************************************************************
			Wiley ONLY
*********************************************************************************************************************
*********************************************************************************************************************/
// Wiley URL Änderung
function zdbBatchWiley()
{
	var csv = new CSV();
	csv.__csvBatchCSVToWiley = function ()
	{

		application.activeWindow.command("show d", false);
		// edit record
		try{
			application.activeWindow.command("k", false);
		} catch(e) {
			csv.__csvLOG("\tDatensatz kann nicht geoeffnet werden.\nFehlermeldung: " + e);
			return;
		}
		if (application.activeWindow.status != "ERROR") {

			// go to the end of the buffer
			application.activeWindow.title.startOfBuffer(false);
			var found = true;
			var current;
			/*while(found == true)
			{
				//found = application.activeWindow.title.find("http://www.bibliothek",false,false,false);
				found = application.activeWindow.title.find("http://ezb.uni-regensburg.de/",false,false,false);
				if(found == true) 
				{
					//application.activeWindow.title.startOfField(false);
					current = application.activeWindow.title.currentField;
					current = current.replace(/http:\/\/ezb\.uni-regensburg.*=x/g,csv.line['EZB-URL']+'=x');
					application.activeWindow.title.deleteLine(1);
					application.activeWindow.title.insertText("\n"+current+"\n");
				}
				
			}
			found = true;
*/			
			while(found == true)
			{
				found = application.activeWindow.title.find("http://www3.interscience",false,false,false);
				if(found == true) 
				{
					//application.activeWindow.title.startOfField(false);
					current = application.activeWindow.title.currentField;
					current = current.replace(/http:\/\/www3\.interscience.*=x/g,csv.line['Wiley-URL']+'=x');
					application.activeWindow.title.deleteLine(1);
					application.activeWindow.title.insertText("\n"+current+"\n");
				}
				
			}
			
			

			//	save buffer
			return csv.__csvSaveBuffer(true,current);
		} else {
			//	return undone but write error to a log file
			return csv.__csvSaveBuffer(false,"\tDatensatz kann nicht geoeffnet werden. Status = ERROR.\n");
		}
	}
	csv.__csvSetProperties(csv.__csvBatchCSVToWiley,["","ZDB-ID","EZB-URL","Wiley-URL"],'ZDB-ID','zdb',false,"Wiley_LOG.txt");
	try
	{	
		csv.__csvConfig();
		csv.__csvBatch();
	} 
	catch(e)
	{
		csv.__csvError(e);
	}	
}

/********************************************************************************************************************
*********************************************************************************************************************
			SAGE ONLY
*********************************************************************************************************************
*********************************************************************************************************************/

function zdbBatchSage()
{
	var csv = new CSV();
	csv.__csvBatchCSVTosage = function ()
	{

		application.activeWindow.command("show d", false);
		// Sichert Inhalt des Zwischenspeichers, da dieser sonst durch copyTitle() überschrieben würde

		try{
			var clipboard = application.activeWindow.clipboard;
		} catch(e){
			// do nothing
		}
		// Kopiert Titel
		var kopie = application.activeWindow.copyTitle();
		application.activeWindow.clipboard = clipboard;
		
		var lizenzString = kopie.match(/4085 =u http:\/\/.*\.sagepub.com.*=x H; (.*)=z NL/);
		// 1.1999,1 - 2.2000,4
		try{
			lizenzString = lizenzString[1].replace(/^\s+/, '').replace (/\s+$/, '');
			// test if something like [-2 Jahre] is in the string
			var reg = /\[/;
			var eckige = reg.test(lizenzString);
			if (eckige == true){
				lizenzStringArray = lizenzString.split("[");
				lizenzString = lizenzStringArray[0];
				lizenzString = lizenzString.replace(/^\s+/, '').replace (/\s+$/, '');
			}
		} catch(e){
			csv.__csvLOG("Fehler bei Regulaeren Ausdruecken.");
			return 0;
		}
		

		
		var lizenzArray = lizenzString.split(" ");
		var end = new Array();
		var withoutIssue;
		if(lizenzArray[2]){
			withoutIssue = lizenzArray[2].split(",");
			end = __csvParseHRLizenz(withoutIssue[0]);
		}
		withoutIssue = lizenzArray[0].split(",");
		var start = __csvParseHRLizenz(withoutIssue[0]);
		
	//	create field 7120 content
		// start volume
		var v = (start['volume'] == "") ? "" : "/v" + start['volume'];
		
		// start year
		var b = (start['year'] == "") ? "" : "/b" + start['year'];
		
		// volume end
		var V = (!end['volume']) ? "" : "/V" + end['volume'];
		
		// year end
		var E = "";
		var E2 = "";
		if(!csv.line['Jahr Ende']) {
			E = (!end['year']) ? "" : "/E" + end['year'];
			E2 = (!end['year']) ? "" : " "+end['year'];
		} else {
			if(!end['year']){
				E = "/E" + csv.line['Jahr Ende'];
				E2 = " "+ csv.line['Jahr Ende'];
			} else {
				E = "/E" + end['year'];
				E2 = "";
			}
		}
		
		if(!end['volume'] && !end['year'] && E == "") {
			V = "-";
		}
		
			
		var bestandsangaben = v + b + V + E;
		var bestandsangaben2 = lizenzString;

		
		var urlArray = kopie.match(/4085 =u (.*sagepub.*)=x.*=z NL/);
		
	//	create value for field 7135
		var lizenz = "";
		switch(csv.code){
			case "nl": lizenz = "Nationallizenz";
			break;
			case "ad": lizenz = "DFG-geförderte Allianz-Lizenz";
			break;
			case "al": lizenz = "Allianz-Lizenz";
			break;
			case "nk": lizenz = "Nationalkonsortium";
			break;
		}
		
		//Schleife von 1 bis 99, da max. 99 Exemplare pro Bibliothek erfasst werden können
		for (var i = 1; i <= 99; i++) {
			var vergleich = 7000 + i;
			if (kopie.indexOf(vergleich) == -1) {
				var eingabe = vergleich + " x\n4800 " + csv.eigene_bibliothek + "\n7120 " + bestandsangaben + "\n7135 =u " + urlArray[1] + "=x " + lizenz + "\n8032 " + bestandsangaben2 + "\n8034 " + csv.text + "\n";
				// Exemplarsatz anlegen und befüllen
				application.activeWindow.command("e e" + i, false);
				if (application.activeWindow.status != "ERROR") {
					application.activeWindow.title.startOfBuffer(false);
					application.activeWindow.title.insertText(eingabe);
				//	save buffer
					return csv.__csvSaveBuffer(true,eingabe);
				} else {
					//	return undone but write error to a log file
					return csv.__csvSaveBuffer(false, "Datensatz kann nicht geoeffnet werden. Status = ERROR.\n"+eingabe);
				}
			}
		}	
	}

	csv.__csvSetCallback(csv.__csvBatchCSVTosage);	
	try
	{	
		csv.__csvConfig();
		csv.__csvBatch();
	} 
	catch(e)
	{
		csv.__csvError(e);
	}	
}
//--------------------------------------------------------------------------------------------------------
//name:		__csvParseHRLizenz
// is called by	__csvBatchCSVTosage
//description:	parses a licence string into an array FOR SAGE IMPORT ONLY
//user:	  	internal
//input: 		a license string from field 4085
//return:		array
//author: 		Carsten Schulze
//date:		2011-03-17
//version:		1.0.0.0
//status:		testing
//--------------------------------------------------------------------------------------------------------
function __csvParseHRLizenz(string){
	var lizenz = new Array();
	// test if issue is given
	lizenz['issue'] = "";
	var reg1 = /,/;
	var is = reg1.test(string);
	if(is == true){
		var issArray = string.split(",");
		lizenz['issue'] = issArray[1];
	}
	
	// test if volume is given
	lizenz['volume'] = "";
	var reg2 = /\./;
	var vol = reg2.test(string);
	if(vol == true){
		var volArray = string.split(".");
		lizenz['volume'] = volArray[0];
		lizenz['year'] = volArray[1];
	} else { // only the year is given
		lizenz['year'] = string;
	}
	
	return lizenz;
}


/********************************************************************************************************************
*********************************************************************************************************************
			JSTOR ONLY
*********************************************************************************************************************
*********************************************************************************************************************/
function csvBatchJSTOR(){
	var csv = new CSV();
	
	

	csv.__csvJSTOR = function()
		{
			application.activeWindow.command("show d", false);

			// edit record
			try{
				application.activeWindow.command("k", false);
			} catch(e) {
				csv.__csvLOG("\tDatensatz kann nicht geoeffnet werden.\nFehlermeldung: " + e);
				return;
			}
			if (application.activeWindow.status != "ERROR")
			{

				///////////////////////////////////////////////////////////////////
				//		0600 Korrektur
				//////////////////////////////////////////////////////////////////
				var jstors = 
				{
					"ZDB-1-JA1":"ZDB-1-JA1",
					"ZDB-1-JA2":"ZDB-1-JA2",
					"ZDB-1-JA3":"ZDB-1-JA3",
					"ZDB-1-JA4":"ZDB-1-JA4",
					"ZDB-1-JA5":"ZDB-1-JA5",
					"ZDB-1-JA6":"ZDB-1-JA6",
					"ZDB-1-JAC":"ZDB-1-JAC",
					"ZDB-1-JB1":"ZDB-1-JB1",
					"ZDB-1-JB2":"ZDB-1-JB2",
					"ZDB-1-JBS":"ZDB-1-JBS",
					"ZDB-1-JEB":"ZDB-1-JEB",
					"ZDB-1-JHG":"ZDB-1-JHG",
					"ZDB-1-JIR":"ZDB-1-JIR",
					"ZDB-1-JLL":"ZDB-1-JLL",
					"ZDB-1-JLS":"ZDB-1-JLS",
					"ZDB-1-JMS":"ZDB-1-JMS",
					"ZDB-1-JMU":"ZDB-1-JMU",
					"ZDB-1-JMC":"ZDB-1-JMC",
					"ZDB-1-JP1":"ZDB-1-JP1",
					"ZDB-1-JP2":"ZDB-1-JP2"
				};
				var feld0601 = application.activeWindow.title.findTag("0601",0,false,false,true);
				var feld0601Split = feld0601.split(";");

				var feld0600 = application.activeWindow.title.findTag("0600",0,true,true,true); // cursor steht am anfang der zeile
//__zdbError("altes Feld: " + feld0600);	

				// nur wenn NUR jstor-sigel vorhanden
				var newfeld0600 = feld0600.replace('nl','nk');
				if(newfeld0600.indexOf('nk') != newfeld0600.lastIndexOf('nk')) newfeld0600 = newfeld0600.replace(';nk','');
//__zdbError("neues Feld im Moment: " + newfeld0600);	
				for(var o = 0;o < feld0601Split.length; o++)
				{

					if(typeof jstors[feld0601Split[o]] == 'undefined') // wenn ein sigel nicht jstor-sigel
					{
						//var testx = regJSTOR.test(feld0601Split[o]);
//__zdbError(feld0601Split[o] + " ist kein JSTOR ISIL");
						// abbrechen wenn ein anderes Paket
//__zdbError(feld0601Split[o].substring(0,6) + " verglichen mit ZDB-1-");
						if(feld0601Split[o].substring(0,6) != 'ZDB-1-') continue;
//__zdbError(feld0601Split[o].substring(0,7) + " verglichen mit ZDB-1-J");
						if(feld0601Split[o].substring(0,7) != 'ZDB-1-J' || feld0601Split[o] == ('ZDB-1-JCO' || 'ZDB-1-JAP') )
						{
							// feld 0600 von nk klären
							feld0600 = feld0600.replace(';nk','');
							feld0600 = feld0600.replace('nk','');
							newfeld0600 = feld0600 + ";nk";
							break;
						}
					}
				}
				
		
				// select current line
				application.activeWindow.title.startOfField(false);
				application.activeWindow.title.endOfField(true);
				// inert new field content
				application.activeWindow.title.insertText(newfeld0600);
				csv.__csvLOG("Ersetzt: "+ feld0600 + " gegen " + newfeld0600 + " in Zeile " + application.activeWindow.title.currentLineNumber);
				
				
				///////////////////////////////////////////////////////////////////
				//		Lokaldatensatz
				//////////////////////////////////////////////////////////////////			
				
				// go to the end of the buffer
				application.activeWindow.title.endOfBuffer(false);
				var lastLineNumber = application.activeWindow.title.currentLineNumber;
				var currentField = "";
				var newfield = "";
				
				// go to the local records
				application.activeWindow.title.findTag("7001",0,false,true,false);

				// search returns array of line counts
				var hitLines = csv.__csvBatchCSVToJSTORSearch(jstors,lastLineNumber);


				if(hitLines.length == 0)
				{
					return csv.__csvSaveBuffer(false,"Es konnte kein JSTOR-Sigel gefunden werden.\n");
				}
				
			
				for(var i = 0; i < hitLines.length;i++){
					
					// go to the local records
					application.activeWindow.title.findTag("7001",0,false,true,false);	

					// go to the next hit 
					application.activeWindow.title.lineDown(hitLines[i],false);
					
					// as long as regex test is false
					var test = false;
					var count = 0;
					while(test != true && count < 10){
						// write selection into variable
						currentField = application.activeWindow.title.currentField;
						test = csv.__csvBatchCSVToJSTORLineUpAndTest(jstors,currentField);
						count++;

					}
					
					// 7135 Nationallizenz entfernen
					application.activeWindow.title.find("7135 =u",true,false,true);
					currentField = application.activeWindow.title.currentField;
					application.activeWindow.title.startOfField(false);
					application.activeWindow.title.endOfField(true);
					newfield = currentField.replace(" Nationallizenz ", " ");
					application.activeWindow.title.insertText(newfield);
					csv.__csvLOG("Ersetzt: "+ currentField + " gegen " + newfield + " in Zeile " + application.activeWindow.title.currentLineNumber);
					
					application.activeWindow.title.find("8034 ",true,false,true);
					currentField = application.activeWindow.title.currentField;
					newfield = "8034 Der Online-Zugriff auf das Produkt JSTOR wurde durch eine Anschubfinanzierung der Deutschen Forschungsgemeinschaft (DFG) unterstützt und wird durch die Bayerische Staatsbibliothek organisiert";
					application.activeWindow.title.startOfField(false);
					application.activeWindow.title.endOfField(true);
					application.activeWindow.title.insertText(newfield);
					csv.__csvLOG("Ersetzt: "+ currentField + " gegen " + newfield + " in Zeile " + application.activeWindow.title.currentLineNumber);

				}
				
				
			//	save buffer
				return csv.__csvSaveBuffer(true,newfield);

			} 
			
			else
			{
				//	return undone but write error to a log file
				return csv.__csvSaveBuffer(false,"\tDatensatz kann nicht geoeffnet werden. Status = ERROR.\n"+newfield);
			}			
		} // end of method		
		
		
	csv.__csvBatchCSVToJSTORSearch = function (jstors,lastline)
		{
			var lines = new Array();
			var regex;
			var count = 0;
			var currentField = "";
			var currentLine = application.activeWindow.title.currentLineNumber;
			while(currentLine != lastline){
				application.activeWindow.title.lineDown(1,false);
				currentLine = application.activeWindow.title.currentLineNumber;
				count++;
				// write selection into variable
				currentField = application.activeWindow.title.currentField;
				for(var i in jstors)
				{
					regex = new RegExp(jstors[i],"gm");
					if(regex.test(currentField)) lines.push(count);
				}
			}

			return lines;
		}
		
	csv.__csvBatchCSVToJSTORLineUpAndTest = function (jstors,currentField)
		{
			// go one line up
			application.activeWindow.title.lineUp(1,false);
			for(var i in jstors)
			{
				var regex = new RegExp("<" + jstors[i] +">","g");
				var test = regex.test(currentField);
				if(test) break;
			}
							
			return test;
		}
		
	csv.__csvSetProperties(csv.__csvJSTOR,["","ZDB-ID"],'ZDB-ID','zdb',false,"ZDB_LOG_JSTOR.txt");

	

//__zeigeEigenschaften(csv);
	try
	{
		csv.__csvConfig();
		csv.__csvBatch();
	} 
	catch(e)
	{
		csv.__csvError(e);
	}
	

}