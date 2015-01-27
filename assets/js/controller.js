var ALCHEMY_API_URL = "http://access.alchemyapi.com/calls/"
  , ALCHEMY_API_KEY = "35857293ebb9f7309de666daa8b04ecb1977ef9e"

angular.module('alchemy',[])
.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('split', function($scope, $http) {
    /* -----
    | Config
    */

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    $scope.nPages = 2;
    $scope.getNumber = function(num) {
        return new Array(num);
    }
    $scope.page = [
        { url: "http://www.bbc.co.uk/news/world-europe-30981950",
        data: {} },
        { url: "http://www.theguardian.com/world/2015/jan/26/syriza-forms-government-rightwing-independent-greeks-party",
        data: {} }
    ]

    $scope.alchemy = function(i) {
        page = $scope.page[i];

        var metrics = [
            { name: "entities", endpoint: "url/URLGetRankedNamedEntities" },
            { name: "keywords", endpoint: "url/URLGetRankedKeywords" },
            { name: "concepts", endpoint: "url/URLGetRankedConcepts" },
            { name: "relations", endpoint: "url/URLGetRelations" }
        ]

        _.each(metrics, function(metric) {
            $scope.AlchemyApi(page.url, metric, function(res) {
                // console.log(res.data);
                console.log(i);
                console.log($scope.page);
                $scope.page[i].data[res.metric] = res.data;
            });
        });
    }

    $scope.AlchemyApi = function(url, metric, callback) {
        $.ajax({
          url: 'https://access.alchemyapi.com/calls/'+metric.endpoint,
          dataType: 'jsonp',
          jsonp: 'jsonp',
          type: "post",
          data: {
            apikey: ALCHEMY_API_KEY,
            url: url,
            outputMode: 'json'
        },
          success: function(res) {
            if (res["status"] === "OK") {
              callback({metric: metric.name, data: res[metric.name]});
            }
            // else if (res["status"] === "ERROR") {
            //   //Do something bad
            // }
          },
          // error: function(jqxhr) {
          //   //console.log(jqxhr);
          // }
        });
    }
})