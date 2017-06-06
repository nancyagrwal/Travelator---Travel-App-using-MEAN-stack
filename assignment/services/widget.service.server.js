var app = require('../../express');
var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/upload'});
var fs = require('fs');

var widgets = [
    {
        "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "Size2HeadingName"
    },
    {
        "_id": "234",
        "widgetType": "HEADING",
        "pageId": "321",
        "size": 4,
        "text": "Lorem ipsum",
        "name": "Size4HeadingName"
    },
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/", "name": "loremPixel", "text": "Sample Image Description"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {
        "_id": "567",
        "widgetType": "HEADING",
        "pageId": "321",
        "size": 4,
        "text": "Lorem ipsum",
        "name": "Size4HeadingNameID567"
    },
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


app.get('/api/assignment/widget/:widgetId', findWidgetById);
app.get('/api/assignment/page/:pageId/widget', findAllWidgetsForPage);
app.post('/api/assignment/page/:pageId/widget', createWidget);
app.put('/api/assignment/widget/:widgetId', updateWidget);
app.delete('/api/assignment/widget/:widgetId', deleteWidget);
app.post('/api/assignment/upload', upload.single('myFile'), uploadImage);


function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    if(myFile != null) {

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        // var size = myFile.size;
        // var mimetype = myFile.mimetype;


        var widget = {};

        widget.url = '/assignment/upload/' + filename;


        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w].url = widget.url;
                break;
            }
        }


        var callbackUrl = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId
            + "/page/" + pageId + "/widget/";

        res.redirect(callbackUrl);
    }
}


function deleteWidget(req, res) {
    widgetId = req.params.widgetId;

    for (var w in widgets) {
        if (widgets[w]._id == widgetId) {
            widgets.splice(w, 1);
            res.send(widgets);
            return;
        }
    }
    res.sendStatus(404);
}

// updateWidget(widgetId, widget) - updates the widget in local widgets array
// whose _id matches the widgetId parameter
function updateWidget(req, res) {

    var widgetId = req.params.widgetId;
    var widget = req.body;

    //Find that widget by Id to update by iterating over all widgets
    for (var w in widgets) {

        //If that Id is found
        //UPDATE COMMON PART
        if (widgets[w]._id == widgetId) {
            widgets[w].text = widget.text;
            widgets[w].name = widget.name;


            //UPDATE HEADING SPECIFIC STUFF
            if (widgets[w].widgetType === "HEADING" ||
                widgets[w].widgetType === "HTML") {
                widgets[w].size = widget.size;
            }

            //UPDATE IMAGE SPECIFIC STUFF
            else if (widgets[w].widgetType === "IMAGE") {
                widgets[w].width = widget.width;
                widgets[w].url = widget.url;
            }

            //
            else if (widgets[w].widgetType === "YOUTUBE") {
                widgets[w].width = widget.width;
                widgets[w].url = widget.url;
            }

        }
    }
    res.send(widgets);
    return;
}//END OF UPDATE WIDGET FUNCTION


// createWidget(pageId, widget) - adds the widget parameter instance to the local widgets array.
function createWidget(req, res) {
    var widget = req.body;
    widgets.push(widget);
    return res.json(widgets);
}


function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    // console.log("findWidgteById" +widgetId);
    for (var w in widgets) {
        if (widgets[w]._id == widgetId) {
            // console.log(widgets[w]);
            res.json(widgets[w]);
            return;
        }
    }
    // res.sendStatus(404);
}


function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;

    var widgetsByPageIdArray = [];
    for (var w in widgets) {
        var widget = widgets[w];
        if (widget.pageId == pageId) {
            widgetsByPageIdArray.push(widget);
        }
    }
    return res.send(widgetsByPageIdArray);
}



