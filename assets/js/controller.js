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

    $scope.nPages = 2;
    $scope.metrics = [
        { name: "entities", key: "text", endpoint: "url/URLGetRankedNamedEntities" },
        { name: "keywords", key: "text", endpoint: "url/URLGetRankedKeywords" },
        { name: "concepts", key: "text", endpoint: "url/URLGetRankedConcepts" },
        { name: "relations", key: "object.text", endpoint: "url/URLGetRelations" }
    ]

    $scope.getNumber = function(num) {
        return new Array(num);
    }

    $scope.page = [
        { url: "http://en.wikipedia.org/wiki/Cooker", data: {} },
        { url: "http://www.appliancecity.co.uk/products/cookers/", data: {} }
    ];
    $scope.pageData = [{"url":"http://en.wikipedia.org/wiki/Cooker","data":{"concepts":{"raw":[{"text":"Cooking appliances","relevance":"0.952112","dbpedia":"http://dbpedia.org/resource/Cooking_appliances","$$hashKey":"object:31"},{"text":"Oven","relevance":"0.602499","dbpedia":"http://dbpedia.org/resource/Oven","freebase":"http://rdf.freebase.com/ns/m.029bxz","opencyc":"http://sw.opencyc.org/concept/Mx4rvViZrJwpEbGdrcN5Y29ycA","$$hashKey":"object:32"},{"text":"Kitchen stove","relevance":"0.576439","dbpedia":"http://dbpedia.org/resource/Kitchen_stove","freebase":"http://rdf.freebase.com/ns/m.02wv746","opencyc":"http://sw.opencyc.org/concept/Mx4rvViGo5wpEbGdrcN5Y29ycA","$$hashKey":"object:33"},{"text":"Cooking","relevance":"0.447647","dbpedia":"http://dbpedia.org/resource/Cooking","freebase":"http://rdf.freebase.com/ns/m.01mtb","opencyc":"http://sw.opencyc.org/concept/Mx4rQoMFtHTAEdaAAACgyZzFrg","$$hashKey":"object:34"},{"text":"Microwave oven","relevance":"0.432097","dbpedia":"http://dbpedia.org/resource/Microwave_oven","freebase":"http://rdf.freebase.com/ns/m.0fx9l","opencyc":"http://sw.opencyc.org/concept/Mx4rv_N5fpwpEbGdrcN5Y29ycA","$$hashKey":"object:35"},{"text":"Rice cooker","relevance":"0.42491","dbpedia":"http://dbpedia.org/resource/Rice_cooker","freebase":"http://rdf.freebase.com/ns/m.020ytc","opencyc":"http://sw.opencyc.org/concept/Mx4rvgTeM5wpEbGdrcN5Y29ycA","yago":"http://yago-knowledge.org/resource/Rice_cooker","$$hashKey":"object:36"},{"text":"Countertop","relevance":"0.410191","dbpedia":"http://dbpedia.org/resource/Countertop","freebase":"http://rdf.freebase.com/ns/m.0b3fp9","opencyc":"http://sw.opencyc.org/concept/Mx4rvVj-L5wpEbGdrcN5Y29ycA","$$hashKey":"object:37"},{"text":"Stove","relevance":"0.405204","dbpedia":"http://dbpedia.org/resource/Stove","freebase":"http://rdf.freebase.com/ns/m.02ppnm","$$hashKey":"object:38"}]},"keywords":{"raw":[{"relevance":"0.945641","text":"cooker","$$hashKey":"object:47"},{"relevance":"0.929614","text":"traditional cooking stove","$$hashKey":"object:48"},{"relevance":"0.900492","text":"aga cooker","$$hashKey":"object:49"},{"relevance":"0.85377","text":"cooking vessel","$$hashKey":"object:50"},{"relevance":"0.833942","text":"1922 by the Nobel Prize-winning Swedish","$$hashKey":"object:51"},{"relevance":"0.832615","text":"electrical cooking appliance","$$hashKey":"object:52"},{"relevance":"0.800024","text":"heat storage stove","$$hashKey":"object:53"},{"relevance":"0.756291","text":"Induction cooker","$$hashKey":"object:54"},{"relevance":"0.755189","text":"Electric cooker","$$hashKey":"object:55"},{"relevance":"0.733914","text":"Rice cooker","$$hashKey":"object:56"},{"relevance":"0.728371","text":"Swedish AGA company","$$hashKey":"object:57"},{"relevance":"0.727","text":"Pressure cooker","$$hashKey":"object:58"},{"relevance":"0.724497","text":"cooking process","$$hashKey":"object:59"},{"relevance":"0.714299","text":"Slow cooker","$$hashKey":"object:60"},{"relevance":"0.711397","text":"physicist Gustaf Dalén","$$hashKey":"object:61"},{"relevance":"0.710276","text":"Solar cooker","$$hashKey":"object:62"},{"relevance":"0.709866","text":"unattended cooking","$$hashKey":"object:63"},{"relevance":"0.696314","text":"cooking techniques","$$hashKey":"object:64"},{"relevance":"0.694959","text":"Electric rice cookers","$$hashKey":"object:65"},{"relevance":"0.693431","text":"cooking appliances","$$hashKey":"object:66"},{"relevance":"0.690106","text":"ferromagnetic interface disk","$$hashKey":"object:67"},{"relevance":"0.676668","text":"kitchen appliance","$$hashKey":"object:68"},{"relevance":"0.675839","text":"electric kitchen appliance","$$hashKey":"object:69"},{"relevance":"0.6755","text":"Cook stove","$$hashKey":"object:70"},{"relevance":"0.670676","text":"built-in extractor hoods","$$hashKey":"object:71"},{"relevance":"0.668893","text":"internal steam pressure","$$hashKey":"object:72"},{"relevance":"0.664074","text":"large-scale solar cookers","$$hashKey":"object:73"},{"relevance":"0.66311","text":"relatively low temperature","$$hashKey":"object:74"},{"relevance":"0.646939","text":"higher temperature water","$$hashKey":"object:75"},{"relevance":"0.639028","text":"Cook stoves","$$hashKey":"object:76"},{"relevance":"0.633868","text":"Gas stove","$$hashKey":"object:77"},{"relevance":"0.620088","text":"Kitchen stove","$$hashKey":"object:78"},{"relevance":"0.601904","text":"modern stoves","$$hashKey":"object:79"},{"relevance":"0.598798","text":"Kitchen stoves","$$hashKey":"object:80"},{"relevance":"0.585789","text":"heats food","$$hashKey":"object:81"},{"relevance":"0.57761","text":"traditional stoves","$$hashKey":"object:82"},{"relevance":"0.576306","text":"ferromagnetic metal","$$hashKey":"object:83"},{"relevance":"0.57181","text":"induction cooktop","$$hashKey":"object:84"},{"relevance":"0.570721","text":"heating food","$$hashKey":"object:85"},{"relevance":"0.566135","text":"animal dung","$$hashKey":"object:86"},{"relevance":"0.564759","text":"crop residue","$$hashKey":"object:87"},{"relevance":"0.563914","text":"flammable gas","$$hashKey":"object:88"},{"relevance":"0.563558","text":"iron components","$$hashKey":"object:89"},{"relevance":"0.563251","text":"continuously-burning source","$$hashKey":"object:90"},{"relevance":"0.56163","text":"induction heating","$$hashKey":"object:91"},{"relevance":"0.559951","text":"natural gas","$$hashKey":"object:92"},{"relevance":"0.559196","text":"slow-burning coal","$$hashKey":"object:93"},{"relevance":"0.558269","text":"heavy frame","$$hashKey":"object:94"},{"relevance":"0.555252","text":"direct heat","$$hashKey":"object:95"},{"relevance":"0.555198","text":"rice steamer","$$hashKey":"object:96"}]},"entities":{"raw":[{"type":"FieldTerminology","relevance":"0.755898","count":"1","text":"Pressure cooker","$$hashKey":"object:147"},{"type":"Company","relevance":"0.656612","count":"2","text":"AGA","disambiguated":{"name":"Aga Rangemaster Group","website":"http://www.agarangemaster.com/","dbpedia":"http://dbpedia.org/resource/Aga_Rangemaster_Group","freebase":"http://rdf.freebase.com/ns/m.09lrg9"},"$$hashKey":"object:148"},{"type":"Person","relevance":"0.482417","count":"1","text":"Gustaf Dalén","disambiguated":{"subType":["Academic","AwardWinner","Scientist"],"name":"Gustaf Dalén","dbpedia":"http://dbpedia.org/resource/Gustaf_Dalén","freebase":"http://rdf.freebase.com/ns/m.0mzyq","yago":"http://yago-knowledge.org/resource/Gustaf_Dal%C3%A9n"},"$$hashKey":"object:149"},{"type":"FieldTerminology","relevance":"0.462674","count":"1","text":"natural gas","$$hashKey":"object:150"},{"type":"FieldTerminology","relevance":"0.455731","count":"1","text":"petroleum gas","$$hashKey":"object:151"},{"type":"JobTitle","relevance":"0.411483","count":"1","text":"chief engineer","$$hashKey":"object:152"},{"type":"JobTitle","relevance":"0.40074","count":"1","text":"physicist","$$hashKey":"object:153"},{"type":"Country","relevance":"0.363157","count":"1","text":"Japan","$$hashKey":"object:154"},{"type":"Country","relevance":"0.358115","count":"1","text":"US","disambiguated":{"subType":["Location","Region","AdministrativeDivision","GovernmentalJurisdiction","FilmEditor"],"name":"United States","website":"http://www.usa.gov/","dbpedia":"http://dbpedia.org/resource/United_States","freebase":"http://rdf.freebase.com/ns/m.09c7w0","ciaFactbook":"http://www4.wiwiss.fu-berlin.de/factbook/resource/United_States","opencyc":"http://sw.opencyc.org/concept/Mx4rvVikKpwpEbGdrcN5Y29ycA","yago":"http://yago-knowledge.org/resource/United_States"},"$$hashKey":"object:155"},{"type":"Company","relevance":"0.354008","count":"1","text":"apple","$$hashKey":"object:156"},{"type":"Country","relevance":"0.329971","count":"1","text":"New Zealand","disambiguated":{"subType":["Organization","Location","HumanLanguage","Region","AdministrativeDivision","CompanyDivision","GovernmentalJurisdiction","Kingdom"],"name":"New Zealand","geo":"-41.28333333333333 174.45","dbpedia":"http://dbpedia.org/resource/New_Zealand","freebase":"http://rdf.freebase.com/ns/m.0ctw_b","ciaFactbook":"http://www4.wiwiss.fu-berlin.de/factbook/resource/New_Zealand","opencyc":"http://sw.opencyc.org/concept/Mx4rvVjjBJwpEbGdrcN5Y29ycA","yago":"http://yago-knowledge.org/resource/New_Zealand"},"$$hashKey":"object:157"},{"type":"Country","relevance":"0.313951","count":"1","text":"Australia","disambiguated":{"subType":["Location","GovernmentalJurisdiction","Kingdom"],"name":"Australia","geo":"-35.3 149.13333333333333","dbpedia":"http://dbpedia.org/resource/Australia","freebase":"http://rdf.freebase.com/ns/m.0chghy","geonames":"http://sws.geonames.org/2077456/","ciaFactbook":"http://www4.wiwiss.fu-berlin.de/factbook/resource/Australia","opencyc":"http://sw.opencyc.org/concept/Mx4rvViUs5wpEbGdrcN5Y29ycA","yago":"http://yago-knowledge.org/resource/Australia"},"$$hashKey":"object:158"},{"type":"Country","relevance":"0.313162","count":"1","text":"Canada","disambiguated":{"subType":["Location","GovernmentalJurisdiction","Kingdom","AwardDiscipline","FilmScreeningVenue"],"name":"Canada","geo":"45.4 -75.66666666666667","website":"http://www.gc.ca","dbpedia":"http://dbpedia.org/resource/Canada","freebase":"http://rdf.freebase.com/ns/m.0d060g","ciaFactbook":"http://www4.wiwiss.fu-berlin.de/factbook/resource/Canada","opencyc":"http://sw.opencyc.org/concept/Mx4rvVimZ5wpEbGdrcN5Y29ycA","yago":"http://yago-knowledge.org/resource/Canada"},"$$hashKey":"object:159"}]},"relations":{"raw":[{"subject":{"text":"a heavy frame"},"action":{"text":"cast","lemmatized":"cast","verb":{"text":"cast","tense":"past"}},"object":{"text":"iron components"},"$$hashKey":"object:173"},{"subject":{"text":"a heavy frame made from cast iron components"},"action":{"text":"can absorb","lemmatized":"can absorb","verb":{"text":"absorb","tense":"future"}},"object":{"text":"heat"},"$$hashKey":"object:174"},{"subject":{"text":"the accumulated heat"},"action":{"text":"used","lemmatized":"use","verb":{"text":"use","tense":"future"}},"$$hashKey":"object:175"},{"subject":{"text":"by slow-burning coal"},"action":{"text":"heated","lemmatized":"heat","verb":{"text":"heat","tense":"past"}},"object":{"text":"the Aga cooker"},"$$hashKey":"object:176"},{"subject":{"text":"the Aga cooker"},"action":{"text":"was","lemmatized":"be","verb":{"text":"be","tense":"past"}},"object":{"text":"invented in 1922 by the Nobel Prize-winning Swedish physicist Gustaf Dalén (1869–1937), who was employed first as the chief engineer of the Swedish AGA company"},"$$hashKey":"object:177"},{"subject":{"text":"by the Nobel Prize-winning Swedish physicist Gustaf Dalén (1869–1937), who was employed first as the chief engineer of the Swedish AGA company"},"action":{"text":"was invented","lemmatized":"be invent","verb":{"text":"invent","tense":"past"}},"object":{"text":"the Aga cooker"},"$$hashKey":"object:178"},{"subject":{"text":"Cook stove –"},"action":{"text":"heated","lemmatized":"heat","verb":{"text":"heat","tense":"past"}},"object":{"text":"by burning wood, charcoal, animal dung or crop residue"},"$$hashKey":"object:179"},{"subject":{"text":"Cook stoves"},"action":{"text":"are commonly used","lemmatized":"be commonly use","verb":{"text":"use","tense":"past"}},"object":{"text":"for cooking and heating food in developing countries"},"$$hashKey":"object:180"},{"subject":{"text":"Gas stove (British English) –"},"action":{"text":"uses","lemmatized":"use","verb":{"text":"use","tense":"present"}},"object":{"text":"natural gas, propane, butane, liquefied petroleum gas or other flammable gas as a fuel source"},"$$hashKey":"object:181"},{"subject":{"text":"Most modern stoves"},"action":{"text":"come","lemmatized":"come","verb":{"text":"come","tense":"present"}},"location":{"text":"in a unit"},"$$hashKey":"object:182"},{"subject":{"text":"Induction cooker –"},"action":{"text":"heats","lemmatized":"heat","verb":{"text":"heat","tense":"present"}},"object":{"text":"a cooking vessel"},"$$hashKey":"object:183"},{"subject":{"text":"a cooking vessel"},"action":{"text":"be","lemmatized":"be","verb":{"text":"be","tense":"future"}},"object":{"text":"made of a ferromagnetic metal"},"$$hashKey":"object:184"},{"subject":{"text":"a cooking vessel"},"action":{"text":"must be made","lemmatized":"must be make","verb":{"text":"make","tense":"future"}},"object":{"text":"of a ferromagnetic metal such as cast iron or stainless steel"},"$$hashKey":"object:185"},{"subject":{"text":"all models of induction cooktop, a cooking vessel"},"action":{"text":"cast","lemmatized":"cast","verb":{"text":"cast","tense":"past"}},"object":{"text":"iron or stainless steel"},"$$hashKey":"object:186"},{"subject":{"text":"Copper, glass and aluminum vessels"},"action":{"text":"can be placed","lemmatized":"can be place","verb":{"text":"place","tense":"future"}},"object":{"text":"on a ferromagnetic interface disk which enables these materials to be used"},"$$hashKey":"object:187"},{"subject":{"text":"a ferromagnetic interface disk"},"action":{"text":"enables","lemmatized":"enable","verb":{"text":"enable","tense":"present"}},"object":{"text":"these materials to be used"},"$$hashKey":"object:188"},{"subject":{"text":"an oven"},"action":{"text":"used","lemmatized":"use","verb":{"text":"use","tense":"past"}},"object":{"text":"for baking"},"$$hashKey":"object:189"},{"subject":{"text":"higher temperature water vapour (i.e.,"},"action":{"text":"increased","lemmatized":"increase","verb":{"text":"increase","tense":"past"}},"object":{"text":"energy"},"$$hashKey":"object:190"},{"subject":{"text":"increased energy), which transfers heat more rapidly"},"action":{"text":"compared","lemmatized":"compare","verb":{"text":"compare","tense":"past"}},"object":{"text":"to dry air, cooks food very quickly"},"$$hashKey":"object:191"},{"subject":{"text":"increased energy), which transfers heat more rapidly compared to dry air,"},"action":{"text":"cooks","lemmatized":"cook","verb":{"text":"cook","tense":"present"}},"object":{"text":"food"},"$$hashKey":"object:192"},{"subject":{"text":"Rice cooker –"},"action":{"text":"referred","lemmatized":"refer","verb":{"text":"refer","tense":"past"}},"object":{"text":"an electric kitchen appliance used to boil or steam rice"},"$$hashKey":"object:193"},{"subject":{"text":"Rice cooker – also referred to as a rice steamer,"},"action":{"text":"is","lemmatized":"be","verb":{"text":"be","tense":"present"}},"object":{"text":"an electric kitchen appliance used to boil or steam rice"},"$$hashKey":"object:194"},{"subject":{"text":"an electric kitchen appliance"},"action":{"text":"boil","lemmatized":"boil","verb":{"text":"boil","tense":"future"}},"object":{"text":"steam rice"},"$$hashKey":"object:195"},{"subject":{"text":"an electric kitchen appliance"},"action":{"text":"to boil or steam","lemmatized":"to boil or steam","verb":{"text":"steam","tense":"present"}},"object":{"text":"rice"},"$$hashKey":"object:196"},{"subject":{"text":"Electric rice cookers"},"action":{"text":"were developed","lemmatized":"be develop","verb":{"text":"develop","tense":"past"}},"location":{"text":"in Japan"},"$$hashKey":"object:197"},{"subject":{"text":"they"},"action":{"text":"are","lemmatized":"be","verb":{"text":"be","tense":"present"}},"object":{"text":"known as suihanki (Jap.: 炊飯器)"},"$$hashKey":"object:198"},{"subject":{"text":"they"},"action":{"text":"are known","lemmatized":"be know","verb":{"text":"know","tense":"past"}},"object":{"text":"as suihanki (Jap.: 炊飯器)"},"$$hashKey":"object:199"},{"subject":{"text":"Slow cooker –"},"action":{"text":"also known","lemmatized":"also know","verb":{"text":"know","tense":"past"}},"object":{"text":"as a Crock-Pot"},"$$hashKey":"object:200"},{"subject":{"text":"a trademark that"},"action":{"text":"is","lemmatized":"be","verb":{"text":"be","tense":"present"}},"object":{"text":"sometimes used generically in the US, Canada, Australia and New Zealand"},"$$hashKey":"object:201"},{"subject":{"text":"a trademark"},"action":{"text":"used","lemmatized":"use","verb":{"text":"use","tense":"past"}},"location":{"text":"in the US, Canada, Australia and New Zealand"},"$$hashKey":"object:202"},{"subject":{"text":"a countertop electrical cooking appliance"},"action":{"text":"is used","lemmatized":"be use","verb":{"text":"use","tense":"past"}},"object":{"text":"for simmering"},"$$hashKey":"object:203"},{"subject":{"text":"It"},"action":{"text":"allows","lemmatized":"allow","verb":{"text":"allow","tense":"present"}},"object":{"text":"for the unattended cooking for many hours of pot roast, stews, soups, \"boiled\" dinners and other suitable dishes, including dips, desserts and beverages"},"$$hashKey":"object:204"},{"subject":{"text":"dips, desserts and beverages"},"action":{"text":"including","lemmatized":"include","verb":{"text":"include","tense":"present"}},"object":{"text":"other suitable dishes"},"$$hashKey":"object:205"},{"subject":{"text":"– a device"},"action":{"text":"uses","lemmatized":"use","verb":{"text":"use","tense":"present"}},"object":{"text":"the energy of direct sunlight"},"$$hashKey":"object:206"},{"subject":{"text":"Solar cooker – a device which uses the energy of direct sunlight to heat,"},"action":{"text":"cook or pasteurize","lemmatized":"cook or pasteurize","verb":{"text":"cook","tense":"present"}},"object":{"text":"food or drink"},"$$hashKey":"object:207"},{"subject":{"text":"a device"},"action":{"text":"cook or pasteurize","lemmatized":"cook or pasteurize","verb":{"text":"pasteurize","tense":"present"}},"object":{"text":"food or drink"},"$$hashKey":"object:208"},{"subject":{"text":"some"},"action":{"text":"are","lemmatized":"be","verb":{"text":"be","tense":"present"}},"object":{"text":"as powerful or as expensive as traditional stoves"},"$$hashKey":"object:209"},{"subject":{"text":"This page"},"action":{"text":"was","lemmatized":"be","verb":{"text":"be","tense":"past"}},"$$hashKey":"object:210"},{"subject":{"text":"This page"},"action":{"text":"modified","lemmatized":"modify","verb":{"text":"modify","tense":"past"}},"$$hashKey":"object:211"}]}}},{"url":"http://www.appliancecity.co.uk/products/cookers/","data":{"concepts":{"raw":[{"text":"Oven","relevance":"0.968677","dbpedia":"http://dbpedia.org/resource/Oven","freebase":"http://rdf.freebase.com/ns/m.029bxz","opencyc":"http://sw.opencyc.org/concept/Mx4rvViZrJwpEbGdrcN5Y29ycA","$$hashKey":"object:362"},{"text":"Microwave oven","relevance":"0.819837","dbpedia":"http://dbpedia.org/resource/Microwave_oven","freebase":"http://rdf.freebase.com/ns/m.0fx9l","opencyc":"http://sw.opencyc.org/concept/Mx4rv_N5fpwpEbGdrcN5Y29ycA","$$hashKey":"object:363"},{"text":"Cooking appliances","relevance":"0.78563","dbpedia":"http://dbpedia.org/resource/Cooking_appliances","$$hashKey":"object:364"},{"text":"Heat","relevance":"0.598501","dbpedia":"http://dbpedia.org/resource/Heat","freebase":"http://rdf.freebase.com/ns/m.03k2v","$$hashKey":"object:365"},{"text":"Kitchen stove","relevance":"0.486772","dbpedia":"http://dbpedia.org/resource/Kitchen_stove","freebase":"http://rdf.freebase.com/ns/m.02wv746","opencyc":"http://sw.opencyc.org/concept/Mx4rvViGo5wpEbGdrcN5Y29ycA","$$hashKey":"object:366"},{"text":"Heating","relevance":"0.486696","dbpedia":"http://dbpedia.org/resource/Heating","$$hashKey":"object:367"},{"text":"Fuel","relevance":"0.468643","dbpedia":"http://dbpedia.org/resource/Fuel","freebase":"http://rdf.freebase.com/ns/m.02ywd","$$hashKey":"object:368"},{"text":"Thermostat","relevance":"0.451766","dbpedia":"http://dbpedia.org/resource/Thermostat","freebase":"http://rdf.freebase.com/ns/m.01ncmt","opencyc":"http://sw.opencyc.org/concept/Mx4rPzsFcStqEdiaugAH6RYvVQ","$$hashKey":"object:369"}]},"keywords":{"raw":[{"relevance":"0.940669","text":"range cookers","$$hashKey":"object:378"},{"relevance":"0.808066","text":"style range cookers","$$hashKey":"object:379"},{"relevance":"0.796846","text":"wide freestanding cookers","$$hashKey":"object:380"},{"relevance":"0.784823","text":"Electric range cookers","$$hashKey":"object:381"},{"relevance":"0.757784","text":"gas range cookers","$$hashKey":"object:382"},{"relevance":"0.645235","text":"seamless cooking surface","$$hashKey":"object:383"},{"relevance":"0.628864","text":"gas hob","$$hashKey":"object:384"},{"relevance":"0.623066","text":"tepanyaki cooking plate","$$hashKey":"object:385"},{"relevance":"0.601009","text":"possible browsing experience","$$hashKey":"object:386"},{"relevance":"0.545866","text":"stainless steel models","$$hashKey":"object:387"},{"relevance":"0.54038","text":"multifunction fan ovens","$$hashKey":"object:388"},{"relevance":"0.537146","text":"different fuel types","$$hashKey":"object:389"},{"relevance":"0.530545","text":"Appliance City home","$$hashKey":"object:390"},{"relevance":"0.524557","text":"best roasting results","$$hashKey":"object:391"},{"relevance":"0.521383","text":"separate gas grill","$$hashKey":"object:392"},{"relevance":"0.513591","text":"cast iron griddle","$$hashKey":"object:393"},{"relevance":"0.509463","text":"tall electric fan","$$hashKey":"object:394"},{"relevance":"0.498411","text":"gas cooking","$$hashKey":"object:395"},{"relevance":"0.491925","text":"cooking functions","$$hashKey":"object:396"},{"relevance":"0.486924","text":"cooking results","$$hashKey":"object:397"},{"relevance":"0.426056","text":"ceramic hobs","$$hashKey":"object:398"},{"relevance":"0.418237","text":"induction hobs","$$hashKey":"object:399"},{"relevance":"0.402628","text":"responsive controls","$$hashKey":"object:400"},{"relevance":"0.396758","text":"best brands","$$hashKey":"object:401"},{"relevance":"0.396344","text":"popular subgroups","$$hashKey":"object:402"},{"relevance":"0.390919","text":"amazing selection","$$hashKey":"object:403"},{"relevance":"0.38801","text":"cookie settings","$$hashKey":"object:404"},{"relevance":"0.387206","text":"privacy page","$$hashKey":"object:405"},{"relevance":"0.38671","text":"different colours","$$hashKey":"object:406"},{"relevance":"0.381192","text":"dual fuel","$$hashKey":"object:407"},{"relevance":"0.380755","text":"impressive heat","$$hashKey":"object:408"},{"relevance":"0.377667","text":"left hand","$$hashKey":"object:409"},{"relevance":"0.377257","text":"moist atmosphere","$$hashKey":"object:410"},{"relevance":"0.375731","text":"popular type","$$hashKey":"object:411"},{"relevance":"0.375635","text":"pan using magnets","$$hashKey":"object:412"},{"relevance":"0.374647","text":"popular choice","$$hashKey":"object:413"},{"relevance":"0.36793","text":"little heat","$$hashKey":"object:414"},{"relevance":"0.367033","text":"maximum flexibility","$$hashKey":"object:415"},{"relevance":"0.366973","text":"efficient type","$$hashKey":"object:416"},{"relevance":"0.366124","text":"stops heating","$$hashKey":"object:417"},{"relevance":"0.25754","text":"website","$$hashKey":"object:418"},{"relevance":"0.257535","text":"market","$$hashKey":"object:419"},{"relevance":"0.251784","text":"Rangemaster","$$hashKey":"object:420"},{"relevance":"0.245728","text":"Smeg","$$hashKey":"object:421"},{"relevance":"0.238698","text":"Aga","$$hashKey":"object:422"},{"relevance":"0.234877","text":"Britannia","$$hashKey":"object:423"},{"relevance":"0.233244","text":"parts","$$hashKey":"object:424"},{"relevance":"0.233193","text":"Stoves","$$hashKey":"object:425"},{"relevance":"0.232104","text":"cookies","$$hashKey":"object:426"},{"relevance":"0.230919","text":"time","$$hashKey":"object:427"}]},"entities":{"raw":[{"type":"Company","relevance":"0.731711","count":"1","text":"Aga","disambiguated":{"name":"Aga Rangemaster Group","website":"http://www.agarangemaster.com/","dbpedia":"http://dbpedia.org/resource/Aga_Rangemaster_Group","freebase":"http://rdf.freebase.com/ns/m.09lrg9"},"$$hashKey":"object:478"},{"type":"Company","relevance":"0.725453","count":"1","text":"Rangemaster","$$hashKey":"object:479"},{"type":"Company","relevance":"0.679215","count":"1","text":"Appliance City","$$hashKey":"object:480"},{"type":"Quantity","relevance":"0.679215","count":"1","text":"55cm","$$hashKey":"object:481"},{"type":"Quantity","relevance":"0.679215","count":"1","text":"60cm","$$hashKey":"object:482"},{"type":"Quantity","relevance":"0.679215","count":"1","text":"90cm","$$hashKey":"object:483"}]},"relations":{"raw":[{"subject":{"text":"This"},"action":{"text":"help","lemmatized":"help","verb":{"text":"help","tense":"future"}},"object":{"text":"provide you with the best possible browsing experience"}},{"subject":{"text":"This"},"action":{"text":"will help provide","lemmatized":"will help provide","verb":{"text":"provide","tense":"future"}},"object":{"text":"you"}},{"subject":{"text":"you"},"action":{"text":"browsing","lemmatized":"browse","verb":{"text":"browse","tense":"present"}},"object":{"text":"experience"}},{"subject":{"text":"'Accept'"},"action":{"text":"clicking","lemmatized":"click","verb":{"text":"click","tense":"present"}},"object":{"text":"you consent to the use of cookies on this website"}},{"subject":{"text":"You"},"action":{"text":"can change","lemmatized":"can change","verb":{"text":"change","tense":"future"}},"object":{"text":"your cookie settings"}},{"subject":{"text":"You"},"action":{"text":"to do","lemmatized":"to do","verb":{"text":"do","tense":"future"}},"object":{"text":"this"}},{"subject":{"text":"We"},"action":{"text":"offer","lemmatized":"offer","verb":{"text":"offer","tense":"present"}},"object":{"text":"an amazing selection of range cookers from some of the best brands on the market including Rangemaster, Britannia, Falcon, Stoves and Smeg to name but a few"}},{"subject":{"text":"Rangemaster, Britannia, Falcon, Stoves and Smeg to name but a few"},"action":{"text":"including","lemmatized":"include","verb":{"text":"include","tense":"present"}},"object":{"text":"the market"}},{"subject":{"text":"We"},"action":{"text":"offer","lemmatized":"offer","verb":{"text":"offer","tense":"present"}},"object":{"text":"a selection of 55cm and 60cm wide freestanding cookers which are available in different fuel types including gas, electric and dual fuel"}},{"subject":{"text":"gas, electric and dual fuel"},"action":{"text":"including","lemmatized":"include","verb":{"text":"include","tense":"present"}},"object":{"text":"different fuel types"}},{"subject":{"text":"the filter"},"action":{"text":"use","lemmatized":"use","verb":{"text":"use","tense":"present"}},"location":{"text":"on the left hand side"}},{"subject":{"text":"Electric range cookers with ceramic hobs"},"action":{"text":"are","lemmatized":"be","verb":{"text":"be","tense":"present"}},"object":{"text":"a popular choice"}},{"subject":{"text":"these cookers"},"action":{"text":"offer","lemmatized":"offer","verb":{"text":"offer","tense":"present"}},"object":{"text":"impressive heat up times and responsive controls"}},{"subject":{"text":"Many of these models"},"action":{"text":"offer","lemmatized":"offer","verb":{"text":"offer","tense":"present"}},"object":{"text":"multifunction fan ovens which allow you to choose from a selection of cooking functions"}},{"subject":{"text":"Many of these models offer multifunction fan ovens"},"action":{"text":"allow","lemmatized":"allow","verb":{"text":"allow","tense":"present"}},"object":{"text":"you to choose from a selection of cooking functions"}},{"subject":{"text":"these models"},"action":{"text":"offer","lemmatized":"offer","verb":{"text":"offer","tense":"present"}},"object":{"text":"the best of both worlds - the speed and even cooking results of a fan oven and the controllability of a gas hob"}},{"subject":{"text":"Many brands"},"action":{"text":"offer","lemmatized":"offer","verb":{"text":"offer","tense":"present"}},"object":{"text":"a cast iron griddle or tepanyaki cooking plate"}},{"subject":{"text":"Many people"},"action":{"text":"believe","lemmatized":"believe","verb":{"text":"believe","tense":"present"}},"object":{"text":"that gas cooking provides the best roasting results due to the moist atmosphere which it creates which helps to prevent your food from drying out"}},{"subject":{"text":"it"},"action":{"text":"helps to prevent","lemmatized":"help to prevent","verb":{"text":"prevent","tense":"future"}},"object":{"text":"your food"}},{"subject":{"text":"Some 90cm wide gas range cookers"},"action":{"text":"have","lemmatized":"have","verb":{"text":"have","tense":"present"}},"object":{"text":"a separate gas grill and a tall electric fan oven giving you maximum flexibility"}},{"subject":{"text":"a separate gas grill and a tall electric fan oven"},"action":{"text":"giving","lemmatized":"give","verb":{"text":"give","tense":"present"}},"object":{"text":"maximum flexibility"}},{"subject":{"text":"These cookers"},"action":{"text":"have","lemmatized":"have","verb":{"text":"have","tense":"present"}},"object":{"text":"the most efficient type of hob available"}},{"subject":{"text":"induction hobs"},"action":{"text":"are","lemmatized":"be","verb":{"text":"be","tense":"present"}},"object":{"text":"quicker than a gas hob,"}},{"subject":{"text":"The hob"},"action":{"text":"heats","lemmatized":"heat","verb":{"text":"heat","tense":"present"}},"object":{"text":"the pan"}},{"subject":{"text":"the pan"},"action":{"text":"is","lemmatized":"be","verb":{"text":"be","tense":"present"}},"object":{"text":"removed"}},{"subject":{"text":"the pan is removed from the cooking surface"},"action":{"text":"leaving","lemmatized":"leave","verb":{"text":"leave","tense":"present"}},"object":{"text":"very little heat"},"location":{"text":"in the glass"}}]}}}]

    $scope.alchemy = function(i,callback) {
        page = $scope.page[i];

        _.each($scope.metrics, function(metric) {
            $scope.AlchemyApi(page.url, metric, function(res) {
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

    $scope.compare = function() {
        var fromURL = false;
      if(fromURL) {
        // Check that all pages have all metric data
          _.each(new Array($scope.nPages), function(p,i) {
            $scope.alchemy(i,function() {
              if(i+1 == $scope.nPages) {
                console.log(JSON.stringify($scope.page));
                $scope.onAlchemyDataLoaded();
              }
            })
          });
      } else {
        $scope.page = $scope.pageData;
        $scope.onAlchemyDataLoaded();
      }
    }

    $scope.path = path;

      // Find similarities and differences
    $scope.onAlchemyDataLoaded = function() {
        // console.log("Starting comparison analysis");
        $scope.identical = {};
        _.each($scope.metrics, function(metric) {

            // console.log($scope.page[0].data[metric.name].raw)
            $scope.identical[metric.name] = intersectionObjects(
                $scope.page[0].data[metric.name].raw,
                $scope.page[1].data[metric.name].raw,
                function(a,b) {
                    // console.log(metric.name,metric.key,path(a,metric.key));
                    return path(a,metric.key,"...") === path(b,metric.key,"...");
                }
            );
            // console.log($scope.identical[metric.name]);
            _.each($scope.page, function(page) {

                page.data[metric.name].unique = _.filter(
                    page.data[metric.name].raw,
                    function(row) {
                        var isUnique = 0;
                        _.each($scope.identical[metric.name], function(identicalRow) {
                            isUnique += (path(row,metric.key,"...") == path(identicalRow,metric.key,"...")) ? 1 : 0;
                        });
                        return (isUnique > 0);
                    }
                );
            })

            // $scope.intersection = _.intersection(
            //                         $scope.page[0].data[metric.name],
            //                         $scope.page[1].data[metric.name]
            //                       );
            // $scope.difference = _.difference(
            //                         $scope.page[0].data[metric.name],
            //                         $scope.page[1].data[metric.name]
            //                       );
        })
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

    if(newMax > newMin)
    {
      output = newMax - (newRange * ratio);
    }
    else
    {
      output = newMin - (newRange * ratio);
    }
    return output;
  }
})

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