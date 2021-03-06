JsOsaDAS1.001.00bplist00�Vscript_�// https://macmost.com/export-all-of-the-notes-on-your-mac-using-a-script.html

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function writeFile(pPathStr, pOutputStr) {  //  @File @Write @ObjC
  /*  VER: 2.0  2017-03-18  
---------------------------------------------------------------
  PARAMETERS:
    pPathStr    | string  | Path of file to write.  May use tilde (~)
    pOutputStr  |  string  |  String to be output to file.
  */
  
  //--- CONVERT TO NS STRING ---
  var nsStr       = $.NSString.alloc.initWithUTF8String(pOutputStr)
  
  //--- EXPAND TILDE AND CONVERT TO NS PATH ---
  var nsPath      = $(pPathStr).stringByStandardizingPath
  
  //--- WRITE TO FILE ---
  //      Returns true IF successful, ELSE false
  var successBool  = nsStr.writeToFileAtomicallyEncodingError(nsPath, true, $.NSUTF8StringEncoding, $())
  
  if (!successBool) {
    throw new Error("function writeFile ERROR:\nWrite to File FAILED for:\n" + pPathStr)
  }
  
  return successBool
  
};

// set things up
var app = Application.currentApplication();
app.includeStandardAdditions = true;
var notesApp = Application('Notes');
notesApp.includeStandardAdditions = true;

// choose which notes
var notes = notesApp.notes;
var whichNotes = app.chooseFromList(notes.name(), { withPrompt: "Which Notes?", multipleSelectionsAllowed: true });



if (whichNotes) {

	// choose save location
	var saveWhere = app.chooseFolder().toString();
	
	if (saveWhere) {
	
		// loop through all notes
		for(var i=0; i<notes.length; i++) {
		
			// is this note one to be exported?
			if (whichNotes.indexOf(notes[i].name()) > -1) {
			
				// save file as html
				var filename = saveWhere+"/"+notes[i].name()+".html";
				//var file = app.openForAccess(Path(filename), { writePermission: true });
				//app.setEof(file, { to: 0 });
				//app.write(notes[i].body(), {to: file});
				//app.closeAccess(file);
				//console.log(filename, notes[i].body())
				writeFile(filename, notes[i].body())
			}
		}
	}
}                              �jscr  ��ޭ