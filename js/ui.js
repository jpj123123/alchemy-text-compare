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
	var tries = 0;

    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

    // Defaults
	$scope.combined = [];
    $scope.initialised = false;
    $scope.alchemyAccomplished = false;
    $scope.urlOrStr = 'url';
    $scope.relThreshold = 0.2;
    $scope.nPages = 2;
    $scope.metrics = [
        { generous: false, name: "entities", key: "text", endpoint: "GetRankedNamedEntities" },
        { generous: false, name: "concepts", key: "text", endpoint: "GetRankedConcepts" },
        { generous: false, name: "keywords", key: "text", endpoint: "GetRankedKeywords" }
        // { generous: false, name: "relations", key: "object.text", endpoint: "GetRelations" }
    ]

    $scope.getNumber = function(num) {
        return new Array(num);
    }

    $scope.pages = [
        { url: "http://en.wikipedia.org/wiki/Window", data: {}, text: "RAF jets were scrambled on Wednesday..." },
        { url: "http://www.stormclad.co.uk/double-glazing-nottingham-derby.php", data: {}, text: "RAF Typhoon fighters have been scrambled..." }
    ];

    $scope.path = path;

    $scope.compare = function() {
		$scope.combined = [];
		tries = 0;

		$scope.download = false;
        $scope.initialised = true;
        $scope.alchemyAccomplished = false;
        var genuineAPICall = true;
        if(genuineAPICall) {
            // Check that all pages have all metric data
            _.each(new Array($scope.nPages), function(p,i) {
                var urlSegment = ($scope.urlOrStr == 'url') ? "url/URL" : "text/Text";
                var queryData = ($scope.urlOrStr == 'url') ? {url: $scope.pages[i].url} : {text: $scope.pages[i].text};

				console.log(urlSegment,queryData);

                $scope.alchemy(i, urlSegment, queryData ,function() {
                    if(i+1 == $scope.nPages) {
                        // console.log(JSON.stringify($scope.pages));
                        $scope.onalchemyRowLoaded();
                    }
                })
            });
        } else {
            $scope.pages = $scope.pagesData;
            $scope.onalchemyRowLoaded();
        }
    }

    $scope.alchemy = function(i,inputType,dataObj,callback) {
        _.each($scope.metrics, function(metric) {
            $scope.AlchemyApi(inputType, metric, dataObj,function(res) {
                // console.log(res);
              $scope.$apply(function(){

				// For comparison
                $scope.pages[i].data[res.metric] = {};
                $scope.pages[i].data[res.metric].raw = res.data;

                if(Object.keys($scope.pages[i].data).length == $scope.metrics.length) {
                  console.log("Finished analysing "+$scope.pages[i].url);
                  if(callback) callback();
                }
              });
            });
        });
    }

      // Find similarities and differences
    $scope.onalchemyRowLoaded = function() {
        console.log("Starting comparison analysis");
		try {
	        $scope.identical = {};
	        _.each($scope.metrics, function(metric) {

	            $scope.identical[metric.name] = intersectionObjects(
	                $scope.pages[0].data[metric.name].raw,
	                $scope.pages[1].data[metric.name].raw,
	                function(a,b) {
	                    return path(a,metric.key,"a").toLowerCase()
	                    === path(b,metric.key,"b").toLowerCase();
	                }
	            );

	            // Remove identical data from raw lists
	            _.each($scope.pages, function(page, i) {
	                page.data[metric.name].unique = _.filter(page.data[metric.name].raw,
                        function(thisRawRow){
                            return !_.any($scope.identical[metric.name], function(identiRow) {
                                return path(thisRawRow,metric.key,"a").toLowerCase()
                                === path(identiRow,metric.key,"b").toLowerCase();
                            });
                        }
                    );
	            });


	        });
	        $scope.alchemyAccomplished = true
			tries = 0;
	        // On completed metrics
		} catch(e) {
			tries++;
			console.warn(e);
			if(tries < 3) $scope.compare();
		}
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

    $scope.jsonToCSV = function() {

		$scope.combined = [];

		_.each($scope.pages, function(page) {
			_.each($scope.metrics, function(metric) {
				// For CSV
				/* // Disabled: inclusion of duplicate text.
				_.each($scope.identical[metric.name], function(datum) {
					datum.source = 'IDENTICAL';
					datum.metric = metric.name;
					$scope.combined.push(datum);
				});
				*/

				// For CSV
				_.each(page.data[metric.name].unique, function(datum) {
					datum.source = $scope.urlOrStr ? page.url : page.text.substring(0, 20);
					datum.metric = metric.name;
					$scope.combined.push(datum);
				});
				// --
			});
		});

		$scope.combined = _.sortByAll($scope.combined, ['source', 'relevance', 'count', 'metric']);
		var packet = {
			fields: ['source', 'metric', 'relevance', 'text', 'count', 'type'],
			data: $scope.combined.reverse()
		};

		console.log($scope.combined.length)
		var converter = new json2csv();
		converter(packet, function(err,data) {
			csvReceiver(data);
		});

		function csvReceiver(data, status, header, config) {
			var dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(data);
			$('#download')
				.attr("href", dataStr)
				.attr("download", "alchemyData.csv");

			$('#download').click();
			$scope.download = true;
        }
    }

    $scope.print = function() {
        window.print();
    }

	$scope.downloaded = function() {
		$scope.download = true;
		$scope.combined = [];
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

/**
 * Module dependencies.
 */
var get = _.get;

/**
 * Main function that converts json to csv
 *
 * @param {Object} params Function parameters containing data, fields,
 * delimiter (default is ','), hasCSVColumnTitle (default is true)
 * and default value (default is '')
 * @param {Function} callback(err, csv) - Callback function
 *   if error, returning error in call back.
 *   if csv is created successfully, returning csv output to callback.
 */
function json2csv() {

	return function(params, callback) {
	  if (!callback || typeof callback !== 'function') {
	    throw new Error('Callback is required');
	  }

	  checkParams(params, function (err) {
	    if (err) {
	      return callback(err);
	    }

	    var titles = createColumnTitles(params);
	    var csv = createColumnContent(params, titles);

	    callback(null, csv);
	  });
	};


	/**
	 * Check passing params
	 *
	 * @param {Object} params Function parameters containing data, fields,
	 * delimiter, default value, mark quotes and hasCSVColumnTitle
	 * @param {Function} callback Callback function returning error when invalid field is found
	 */
	function checkParams(params, callback) {
	  // if data is an Object, not in array [{}], then just create 1 item array.
	  // So from now all data in array of object format.
	  if (!Array.isArray(params.data)) {
	    var ar = [];
	    ar[0] = params.data;
	    params.data = ar;
	  }

	  if (!params.fields && params.data && params.data.length) {
	    params.fields = Object.keys(params.data[0]);
	  }

	  //#check fieldNames
	  if (params.fieldNames && params.fieldNames.length !== params.fields.length) {
	    return callback(new Error('fieldNames and fields should be of the same length, if fieldNames is provided.'));
	  }

	  params.fieldNames = params.fieldNames || params.fields;

	  //#check delimiter
	  params.del = params.del || ',';

	  //#check end of line character
	  params.eol = params.eol || '';

	  //#check quotation mark
	  params.quotes = typeof params.quotes === 'string' ? params.quotes : '"';

	  //#check nested option
	  params.nested = params.nested || false;

	  //#check default value
	  params.defaultValue = params.defaultValue;

	  //#check hasCSVColumnTitle, if it is not explicitly set to false then true.
	  if (params.hasCSVColumnTitle !== false) {
	    params.hasCSVColumnTitle = true;
	  }

	  callback(null);
	}

	/**
	 * Create the title row with all the provided fields as column headings
	 *
	 * @param {Object} params Function parameters containing data, fields and delimiter
	 * @returns {String} titles as a string
	 */
	function createColumnTitles(params) {
	  var str = '';

	  //if CSV has column title, then create it
	  if (params.hasCSVColumnTitle) {
	    params.fieldNames.forEach(function (element) {
	      if (str !== '') {
	        str += params.del;
	      }
	      str += JSON.stringify(element).replace(/\"/g, params.quotes);
	    });
	  }

	  return str;
	}

	/**
	 * Replace the quotation marks of the field element if needed (can be a not string-like item)
	 *
	 * @param {string} stringifiedElement The field element after JSON.stringify()
	 * @param {string} quotes The params.quotes value. At this point we know that is not equal to double (")
	 */
	function replaceQuotationMarks(stringifiedElement, quotes) {
	  var lastCharIndex = stringifiedElement.length - 1;

	  //check if it's an string-like element
	  if (stringifiedElement[0] === '"' && stringifiedElement[lastCharIndex] === '"') {
	    //split the stringified field element because Strings are immutable
	    var splitElement = stringifiedElement.split('');

	    //replace the quotation marks
	    splitElement[0] = quotes;
	    splitElement[lastCharIndex] = quotes;

	    //join again
	    stringifiedElement = splitElement.join('');
	  }

	  return stringifiedElement;
	}

	/**
	 * Create the content column by column and row by row below the title
	 *
	 * @param {Object} params Function parameters containing data, fields and delimiter
	 * @param {String} str Title row as a string
	 * @returns {String} csv string
	 */
	function createColumnContent(params, str) {
	  params.data.forEach(function (dataElement) {
	    //if null or empty object do nothing
	    if (dataElement && Object.getOwnPropertyNames(dataElement).length > 0) {
	      var line = '';
	      var eol = params.newLine || '\n';

	      params.fields.forEach(function (fieldElement) {
	        var val;

	        if (params.nested) {
	          val = get(dataElement, fieldElement, '');
	        } else {
	          val = dataElement[fieldElement];
	        }

	        if (val !== undefined) {
	          var stringifiedElement = JSON.stringify(val);

	          if (params.quotes !== '"') {
	            stringifiedElement = replaceQuotationMarks(stringifiedElement, params.quotes);
	          }

	          line += stringifiedElement;
	        } else if (params.defaultValue !== undefined) {
	          // Use default value if defined
	          line += JSON.stringify(params.defaultValue);
	        }

	        line += params.del;
	      });

	      //remove last delimeter
	      line = line.substring(0, line.length - 1);
	      line = line.replace(/\\"/g, Array(3).join(params.quotes));
	      //If header exists, add it, otherwise, print only content
	      if (str !== '') {
	        str += eol + line + params.eol;
	      } else {
	        str = line + params.eol;
	      }
	    }
	  });

	  return str;
	}
}
