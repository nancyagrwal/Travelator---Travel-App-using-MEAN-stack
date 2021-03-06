
(function (){
    angular
        .module('WebAppMaker')
        .controller('widgetNewController',widgetNewController);

    function widgetNewController($routeParams, $location, widgetService) {
        var model=this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];

        //event handlers
        model.createHeading=createHeading;
        model.createImage=createImage;
        model.createYouTube=createYouTube;
        model.createhtml=createhtml;
        model.createTextInput = createTextInput;


        function createTextInput() {
            var widgetText={
                widgetType: "INPUT",
                size: 1,
                text: ""

            };
            wdgt=widgetService.createWidget(model.pageId,widgetText)
                .then(redirectWidget, errorWidget);
        }


        function createHeading() {
            var widgetHeading={
                widgetType: "HEADER",
                size: 1,
                text: ""
            };
            wdgt=widgetService.createWidget(model.pageId,widgetHeading)
                .then(redirectWidget, errorWidget);
        }

        function createhtml() {
            var widgethtml={
                widgetType: "HTML",
                text: ""
            };
            wdgt=widgetService.createWidget(model.pageId,widgethtml)
                .then(redirectWidget, errorWidget);
        }

        function createImage() {
            var widgetImage={
                widgetType: "IMAGE",
                width:"100%",
                url:""
            };
            wdgt=widgetService.createWidget(model.pageId,widgetImage)
                .then(redirectWidget, errorWidget);
        }

        function createYouTube() {
            var widgetYouTube={
                widgetType: "YOUTUBE",
                width:"100%",
                url:""
            };
            wdgt=widgetService.createWidget(model.pageId,widgetYouTube)
                .then(redirectWidget, errorWidget);
        }

        function redirectWidget(wdgt){
            $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page/'+model.pageId+'/widget/'+wdgt._id);
        }

        function errorWidget(){
            model.message = "Error!"
        }

        model.goToWidget = goToWidget;
        model.logout = logout;

        function goToWidget()
        {
            $location.url("/user/" + model.userId +"/website/" +model.websiteId + "/page/" + model.pageId +"/widget");
        }

        function logout()
        {
            $location.url("/user/" + model.userId);

        }

    }
})();