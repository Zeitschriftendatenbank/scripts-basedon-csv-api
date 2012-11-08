/********************************************************************************************************************
*********************************************************************************************************************
			Museen Import ONLY
*********************************************************************************************************************
*********************************************************************************************************************/
function zdbBatchMuseen()
{
	var csv = new CSV();
	csv.__csvBatchCSVToMuseen = function ()
	{
		var museum = "";
		application.activeWindow.command("show d", false);		
		
		museum += "005 Tw\n";
		museum += "043 "+csv.line['ISIL']+"\n";
		museum += "700 "+csv.line['name']+"\n";
		museum += "730  =y S =a "+csv.line['str']+" =c "+csv.line['plz']+" =d "+csv.line['ort']+"\n";
		museum += "765  =a H =b m\n";
		museum += "780  =b 86\n";
		museum += "900 Weitere Informationen zu diesem Museum unter "+csv.line['url']+"\n";
		museum += "910 IMF:28-09-11:Grundlieferung";

		
		
		// edit record
		try{
			application.activeWindow.command("e n", false);
		} catch(e) {
			csv.__csvLOG("\tDatensatz kann nicht geoeffnet werden.\nFehlermeldung: " + e);
			return;
		}
		if (application.activeWindow.status != "ERROR") {

			// go to the end of the buffer
			application.activeWindow.title.startOfBuffer(false);
			application.activeWindow.title.insertText(museum);
			//	save buffer
			return csv.__csvSaveBuffer(true,museum);
		} else {
			//	return undone but write error to a log file
			return csv.__csvSaveBuffer(false,"\tDatensatz kann nicht geoeffnet werden. Status = ERROR.\n");
		}
	}
	csv.__csvSetProperties(csv.__csvBatchCSVToMuseen,["","ISIL","name","str","plz","ort","typ","url"],'ISIL','sg',false,"Museen_LOG.txt");
	try
	{	
		csv.__csvConfig();
		csv.__csvBatchImport();
	} 
	catch(e)
	{
		csv.__csvError(e);
	}	
}