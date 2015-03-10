var ALCHEMY_API_URL = "http://access.alchemyapi.com/calls/"
  , ALCHEMY_API_KEY = "35857293ebb9f7309de666daa8b04ecb1977ef9e"

angular.module('alchemy',[])
.config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('split', function($scope, $http) {
    $(document).ready(function() {
      $("[tabindex=1]").focus().select() // focus on URL 1
    })
    /* -----
    | Config
    */

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    // Defaults
    $scope.urlOrStr = 'url';
    $scope.relThreshold = 0.2;
    $scope.nPages = 2;
    $scope.metrics = [
        { generous: false, name: "entities", key: "text", endpoint: "GetRankedNamedEntities" },
        { generous: false, name: "concepts", key: "text", endpoint: "GetRankedConcepts" },
        { generous: false, name: "keywords", key: "text", endpoint: "GetRankedKeywords" },
        { generous: false, name: "relations", key: "object.text", endpoint: "GetRelations" }
    ]

    $scope.getNumber = function(num) {
        return new Array(num);
    }

    $scope.page = [
        { text: "RAF jets were scrambled on Wednesday after two Russian military aircraft were seen off the Cornwall coast, the Ministry of Defence says. An MoD spokesman said the two planes were escorted by the RAF until they were out of the 'UK area of interest'. The Russian Bear bombers did not enter UK sovereign airspace, he added. Defence Secretary Michael Fallon has warned there is a 'real and present danger' of Russia trying to destabilise three Baltic states. On Wednesday, Mr Fallon spoke of his concerns about Russian interference in Latvia, Lithuania and Estonia. Part of a trend The MoD said: 'RAF Quick Reaction Alert Typhoon fighter aircraft were launched [on Wednesday] after Russian aircraft were identified flying close to UK airspace. 'The Russian planes were escorted by the RAF until they were out of the UK area of interest. At no time did the Russian military aircraft cross into UK sovereign airspace.' A Russian Tu-95 Bear 'H' aircraft The two Russian Bear bombers were 'escorted' by RAF jets, the MoD says (file photo) The BBC's political correspondent Ross Hawkins says that, according to the Department for Transport, there was no record of disruption to civil aviation as a result of the bombers' presence. He said the incident was part of a trend of Russian aircraft flying close to UK airspace and there have also been concerns about similar incidents across Europe. It is a show of strength from the Russians, and such incidents are carried out with political intent as the Russian government knows it will be noted and reported on, our correspondent added. A similar incident occurred in January, when the UK Foreign Office said two Russian Tu-95 Bear H bombers flying near UK airspace had caused 'disruption to civil aviation'. They were also escorted by RAF jets throughout the time they were in the 'UK area of interest', according to officials.", url: "http://en.wikipedia.org/wiki/Window", data: {} },
        { text: "RAF Typhoon fighters have been scrambled to escort two Russian Bear bombers off the coast of Cornwall in the latest instance of Russian planes manoeuvring close to British air space, the Ministry of Defence has said. The RAF has been called on to escort Russian aircraft about once a month recently, amid heightened tensions over between the UK and Russia over Vladimir Putin’s backing of separatist rebels in Ukraine. A Ministry of Defence spokeswoman said on Thursday: “RAF quick reaction alert Typhoon fighter aircraft were launched yesterday after Russian aircraft were identified flying close to UK air space. The Russian planes were escorted by the RAF until they were out of the UK area of interest. At no time did the Russian military aircraft cross into UK sovereign air space.” Last month, Moscow’s ambassador was summoned to London by the Foreign Office after a flight by two Russian bombers over the Channel, which Britain said posed a potential danger to civilian flights.  Russian warships have also passed through the English channel on a number of occasions in recent months. On Tuesday, the Yaroslav Mudry was tracked by the Royal Navy as it sailed back to Russia after a deployment in the Mediterranean with its accompanying tanker, the Kola.  British warship HMS Argyll, based in Plymouth, Devon, was deployed and used its Lynx helicopter and sensors to locate and monitor the movement of the Russian ships off the coast of France and through the English Channel. The UK defence secretary, Michael Fallon, warned on Thursday that Putin could repeat the tactics used to destabilise Ukraine in Baltic members of the Nato alliance. As well as the war in Ukraine, where fighting has continued despite a ceasefire being agreed, relations between the UK and Russia have also been strained by a public inquiry in London into the 2006 killing of a former Russian intelligence officer, Alexander Litvinenko, by radioactive poisoning. Flights close to other Nato members’ air space have also become more frequent as tensions have increased between Moscow and the west. Nato said it flew 400 intercepts last year, four times more than in 2013.", url: "http://www.stormclad.co.uk/double-glazing-nottingham-derby.php", data: {} }
    ];

    $scope.path = path;

    $scope.compare = function() {
        var fromURL = true;
        if(fromURL) {
        // Check that all pages have all metric data
          _.each(new Array($scope.nPages), function(p,i) {
            if($scope.urlOrStr == 'url') {
            ///////////
            /// FROM URL
            ///////////
                $scope.alchemy(i, "url/URL", {url: $scope.page[i].url} ,function() {
                  if(i+1 == $scope.nPages) {
                    // console.log(JSON.stringify($scope.page));
                    $scope.onalchemyRowLoaded();
                  }
                })
            } else {
            ///////////
            /// FROM TEXT
            ///////////
                $scope.alchemy(i, "text/Text", {text: $scope.page[i].text} ,function() {
                  if(i+1 == $scope.nPages) {
                    // console.log(JSON.stringify($scope.page));
                    $scope.onalchemyRowLoaded();
                  }
                })
            ///////////
            }
          });
        } else {
            $scope.page = $scope.pageData;
            $scope.onalchemyRowLoaded();
        }
    }

    $scope.alchemy = function(i,inputType,dataObj,callback) {
        _.each($scope.metrics, function(metric) {
            $scope.AlchemyApi(inputType, metric, dataObj,function(res) {
                // console.log(res);
              $scope.$apply(function(){
                $scope.page[i].data[res.metric] = {};
                $scope.page[i].data[res.metric].raw = res.data;
                if(Object.keys($scope.page[i].data).length == $scope.metrics.length) {
                  console.log("Finished analysing "+$scope.page[i].url);
                  if(callback) callback();
                }
              });
            });
        });
    }

      // Find similarities and differences
    $scope.onalchemyRowLoaded = function() {
        console.log("Starting comparison analysis");
        $scope.identical = {};
        _.each($scope.metrics, function(metric) {

            // Compile list of identical data
            // console.log($scope.page[0].data[metric.name].raw,$scope.page[1].data[metric.name].raw)
            $scope.identical[metric.name] = intersectionObjects(
                $scope.page[0].data[metric.name].raw,
                $scope.page[1].data[metric.name].raw,
                function(a,b) {
                    return path(a,metric.key,"a").toLowerCase()
                    === path(b,metric.key,"b").toLowerCase();
                }
            );

            // Remove identical data from raw lists
            _.each($scope.page, function(page,i) {
                page.data[metric.name].unique =
                    _.filter(
                        page.data[metric.name].raw,
                        function(thisRawRow){
                            return !_.any($scope.identical[metric.name], function(identiRow) {
                                return path(thisRawRow,metric.key,"a").toLowerCase()
                                === path(identiRow,metric.key,"b").toLowerCase();
                            });
                        }
                    );
            });

        });
    }

    $scope.AlchemyApi = function(inputType, metric, dataObj, callback) {
        dataObj.apikey = ALCHEMY_API_KEY;
        dataObj.outputMode = 'json';

        $.ajax({
          url: 'https://access.alchemyapi.com/calls/'+inputType+metric.endpoint,
          dataType: 'jsonp',
          jsonp: 'jsonp',
          type: "post",
          data: dataObj,
          success: function(res) {
            if (res["status"] === "OK") {
              callback({metric: metric.name, data: res[metric.name]});
            }
          }
        });
    }
})
.filter('capitalize', function() {
  return function(input, all) {
    return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
  }
})
.filter('strToHSL', function() {
  return function(input) {
    return intToHSL(getHashCode(input));
  }
})
.filter('splitByCap', function() {
  return function(input) {
    return input.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).join(" ")
  }
})
.filter('normalised', function() {
  return function(input, min, max, newMin, newMax) {
    var ratio = (max > min) ? input/(max-min) : input/(min-max);
    var range = (max < min) ? (max - min) : (min - max);
    var newRange = (max < min) ? (newMax - newMin) : (newMin - newMax);
    var output;

    if(newMax > newMin) {
      return newMax - (newRange * ratio);
    } else {
      return newMin - (newRange * ratio);
    }
  }
})
.filter('relevanceColor', function($filter) {
    return function(input) {
        return "hsl("+$filter('normalised')(input,0,1,80,0)+",100%,"+$filter('normalised')(input,0,1,100,40)+"%)";
    }
})
.directive('alchemy', function ($compile) {
    var templates = {
        entities: "<td>\
                        <span class='badge'\
                            style='background: {{alchemyRow.relevance|relevanceColor}}'>\
                            {{alchemyRow.relevance|number:2}}</span>\
                    </td>\
                    <td>\
                        <span class='badge'\
                            style='background: hsl({{alchemyRow.count|normalised:1:10:50:-20}},100%,{{alchemyRow.count|normalised:1:10:100:40}}%)'>\
                            {{alchemyRow.count}}</span>\
                    </td>\
                    <td>\
                        <span class='entity-name'>{{alchemyRow.text}}</span>\
                    </td>\
                    <td>\
                        <span class='label entity-type' style='background: {{alchemyRow.type | strToHSL}};' data-icon='{{alchemyRow.type}}'>{{alchemyRow.type|splitByCap}}</span>\
                    </td>",
        keywords: "<td>\
                        <span class='badge'\
                            style='background: {{alchemyRow.relevance|relevanceColor}}'>\
                            {{alchemyRow.relevance|number:2}}</span>\
                    </td>\
                    <td>{{alchemyRow.text}}</td>",
        concepts: "<td>\
                        <span class='badge'\
                            style='background: {{alchemyRow.relevance|relevanceColor}}'>\
                            {{alchemyRow.relevance|number:2}}</span>\
                    </td>\
                    <td>{{alchemyRow.text}}</td>",
        relations: "<td>\
                        <div ng-if='alchemyRow.subject' class='rel-item rel-subject' ng-if='alchemyRow.subject.text'>\
                            <div class='rel-item__string'>{{alchemyRow.subject.text}}</div>\
                            <div class='rel-item__caption'>subject</div>\
                        </div>\
                        <span ng-if='alchemyRow.action' class='rel-arrow'></span>\
                        <div ng-if='alchemyRow.action' class='rel-item rel-action' ng-if='alchemyRow.action.verb.text'>\
                            <div class='rel-item__string'>{{alchemyRow.action.text}}</div>\
                            <div class='rel-item__caption'>verb</div>\
                        </div>\
                        <span ng-if='alchemyRow.object' class='rel-arrow'></span>\
                        <div ng-if='alchemyRow.object' class='rel-item rel-object' ng-if='alchemyRow.object.text'>\
                            <div class='rel-item__string'>{{alchemyRow.object.text}}</div>\
                            <div class='rel-item__caption'>object</div>\
                        </div>\
                        <span ng-if='alchemyRow.location' class='rel-arrow'></span>\
                        <div ng-if='alchemyRow.location' class='rel-item rel-location' ng-if='alchemyRow.object.text'>\
                            <div class='rel-item__string'>{{alchemyRow.location.text}}</div>\
                            <div class='rel-item__caption'>location</div>\
                        </div>\
                    </td>"
    };

    var linker = function(scope, element, attrs) {
        element.html(templates[scope.alchemy]);
        $compile(element.contents())(scope);
    }

    return {
        restrict: "A",
        link: linker,
        scope: {
            alchemy:'=',
            alchemyRow: '='
        }
    };
});

function getHashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
function intToHSL(int) {
    var shortened = int % 360;
    return "hsl(" + shortened + ",100%,30%)";
};
function intersectionObjects() {
    var Results = arguments[0];
    var LastArgument = arguments[arguments.length - 1];
    var ArrayCount = arguments.length;
    var areEqualFunction = _.isEqual;

    if(typeof LastArgument === "function") {
        areEqualFunction = LastArgument;
        ArrayCount--;
    }

    for(var i = 1; i < ArrayCount ; i++) {
        var array = arguments[i];
        Results = intersectionObjects2(Results, array, areEqualFunction);
        if(Results.length === 0) break;
    }
    return Results;
}
function intersectionObjects2(a, b, areEqualFunction) {
    var Result = [];

    for(var i = 0; i < a.length; i++) {
        var aElement = a[i];
        var existsInB = _.any(b, function(bElement) { return areEqualFunction(bElement, aElement); });
        if(existsInB) {
            Result.push(aElement);
        }
    }

    return Result;
}
/**
 * Retrieve nested item from object/array
 * @param {Object|Array} obj
 * @param {String} path dot separated
 * @param {*} def default value ( if result undefined )
 * @returns {*}
 */
function path(obj, path, def) {
    var i, len;

    for(i = 0,path = path.split('.'), len = path.length; i < len; i++){
        if(!obj || typeof obj !== 'object') return def;
        obj = obj[path[i]];
    }

    if(obj === undefined) return def;
    return obj;
}
