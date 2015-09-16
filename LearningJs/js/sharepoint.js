

       var Title, AttID, Office, Getname, SentBy, Vessel, FilePath, ArrString, FileName, getlistid, ListId, FP = "";

$(document).on("click","#AvailablePrints input", function() {
    // write some SP code tht will load the attachments for this item by it ID only
    //calling a function to get FilePath and DocName using the AttID
    var attrId = $(this).attr('data-itemid');
    Title = $(this).attr('data-doctitle');
	        
    //Uncheck all the rest of checkboxes and only leaeve the one clicked 
    $('.CheckBoxes').attr('checked', false);
    $(this).attr('checked', true);

           
    var ItemId = $(this).attr("data-itemid");
							
    //alert(FilePath + ItemId );
    //printit(FilePath);
    //this function has been replaceed by
    loadAttachementFile(attrId);
    $(this).attr("data-fp", FileName);
    $(this).attr("data-docname", FilePath);
    var FilePath = $(this).attr("data-fp");
    var DocName = $(this).attr("data-docname");
    var x;
    if (confirm("You are about to update the tracking details. Please check that the invoice is correct. Once you have update the tracking details you may print the document. Continue to update tracking details?") == true) {
        UpdateStatus(ItemId,DocName);
    } else {

    }

});

function UpdateStatus(itemId,DocName)
{
    var UserName = $().SPServices.SPGetCurrentUser({
        fieldNames: ["FirstName","LastName"],
        debug: false

    });

    var PrintedBy = UserName.FirstName + " " + UserName.LastName;
    var CurrentDate = new Date($.now());
    var year =  CurrentDate.getFullYear();
    var month = CurrentDate.getMonth()+1;
    if(month <= 9)
        month = '0'+month;
    var day = CurrentDate.getDate();
    if(day <= 9)
        day = '0'+day;
    var hours = CurrentDate.getHours();
    if(hours <= 9)
        hours = '0'+hours;
    var minutes =  CurrentDate.getMinutes();
    if(minutes <= 9)
        seconds = '0'+minutes;
    var seconds = CurrentDate.getSeconds ();
    if(seconds <= 9)
        seconds = '0'+seconds;

    var PrintedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    //alert(PrintedDate);

    if (!itemId)
    {
        alert("UpdateStatus(ERROR): No itemId defined as input param!");
    }
    $().SPServices({
        operation: "UpdateListItems",
        async: false,
        listName: "Creditor Invoice Tracking",
        ID: itemId,
        // valuepairs: [[updatedata[i].Field, updatedata[i].Data]],
        valuepairs: [["PrintedDate", PrintedDate],["PrintedBy0", PrintedBy],["RecievedandPrinted", "Yes"]],
        // valuepairs: [["PrintedDate", PrintedDate]],
        completefunc: function (xData, Status)
        {
            //alert("ishere");
            $("#IsPrinted").html("<strong>"+DocName+ " has been sent to printer by "+ PrintedBy + " on "+ PrintedDate +"</strong>");
        }
    });


}

$(document).ready(function(){

    var _query = "<Query><Where><And><Geq><FieldRef Name='Attachments' /><Value Type='Attachments'>1</Value></Geq><And><Eq><FieldRef Name='RecievedandPrinted' />"+
            "<Value Type='Choice'>No</Value></Eq><Eq><FieldRef Name='Archived_x0020_Status' /><Value Type='Choice'>Active</Value></Eq></And></And></Where><OrderBy>"+
            "<FieldRef Name='Vessel' Ascending='FALSE'/></OrderBy></Query>";
    //var ItemArray = [];
    var i = 0;
    var output = "";
    eptyStrAtt = "PrintItems";


    $().SPServices({
        operation: "GetListItems",
        async: false,
        listName: "Creditor Invoice Tracking",
        CAMLQuery: _query,
        CAMLQueryOptions: "<QueryOptions><ViewFieldsOnly>TRUE</ViewFieldsOnly><IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns></QueryOptions>",
        CAMLViewFields: "<ViewFields><FieldRef Name='LinkTitle' /><FieldRef Name='ID' /><FieldRef Name='Attachments' /><FieldRef Name='Office' /><FieldRef Name='Author' />"+
                        "<FieldRef Name='Vessel' /></ViewFields>",
        CAMLRowLimit: 50,
        completefunc: function (xData, Status) {
            $(xData.responseXML).SPFilterNode("z:row").each(function() {
                //alert( xData.responseText );
                var Title = $(this).attr("ows_LinkTitle");
                var AttID = $(this).attr("ows_ID");
                var Office = $(this).attr("ows_Office");
                var Getname = $(this).attr("ows_Author").split("#");
                var SentBy = Getname[1];
                var Vessel = $(this).attr("ows_Vessel");
                //alert(AttID);
                //var output = ItemArray[i];
                i = i + 1
                //Only Load details without actual files
                output += "<li class='PrintItems' id=" + eptyStrAtt + "  style='list-style: none ;' ><input type='checkbox' id='checkbox" +
                                               AttID + "' name='checkbox' class='CheckBoxes' style='Display:inline;' data-docname='" + eptyStrAtt + "' data-doctitle='" + Title + "' data-fp='" + eptyStrAtt + "' data-itemid='" + AttID + "'  /><p id='IsPrinted'>" + Title + " - " + Vessel + "</p></li><br />";

            });
            $("#AvailablePrints").append(output);//document.getElementById("pdfDocument").style.display ="inline";
        }

    });

});


function loadAttachementFile(AttID) {
    var requestedFilePath = "";
		    
    $().SPServices({
        operation: "GetAttachmentCollection",
        listName: "Creditor Invoice Tracking",
        ID: AttID,
        completefunc: function (xData, Status) {
            //console.log( Status );
            //console.log( xData.responseText );
            //alert("Attachements");
            var output = "";

            //debugger;
            $(xData.responseXML).find("Attachments > Attachment").each(function (i, el) {
                //$("#AvailablePrints").html("<div id='pdf'><li class='PrintItems' >Documents to be printed</li><br/></div>");
                var $node = $(this),
               FilePath = $node.text(),
               ArrString = FilePath.split("/"),
               FileName = ArrString[ArrString.length - 1],
               getlistid = Title.split("_"),
               ListId = getlistid[1],
               FP = AttID + "/" + FileName;

                requestedFilePath = FilePath;
            });
		           
            //pass the path/url of the file requested so It can be displayed on an iframe/image [.pdf/.jpg]
            
            printit(requestedFilePath);

        }
    });
}

//Do the actual preview of the document
function printit(url) {
    //create iframe with src
    if (url.indexOf(".jpg") != -1) {
        $("#HidePdf").html("<img id='PrintPDF' src='" + url + "' width='600' height='800px' />");

    } else {
        $("#HidePdf").html("<embed type='application/pdf' id='PrintPDF' src='" + url + "' width='600' height='800px'></embed>");
        var doc = document.getElementById('PrintPDF');
    }

}

