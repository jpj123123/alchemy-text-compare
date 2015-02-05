<!DOCTYPE html>
<html lang='en-gb' ng-app='alchemy'>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Goog Product Table</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel='stylesheet' href='public/css/app.min.css' />
    <link rel='stylesheet' href='../global/public/css/app.min.css' />
</head>
<body>
    <?php include '../global/header.php'; ?>

    <div class='container' ng-controller='split'>
        <div class='row'>
            <div class='col-md-12'>
                <h1>CHRYSUS Literary Content Analyser</h1>
                <p class='wiki-def'><strong>Chrysus</strong> (Greek: Χρύσος; aka Khrysos) in Greek mythology is the spirit (daimon) of gold.</p>
            </div>
        </div>

        <div class='row'>
            <h3 class='col-xs-12'>Comparison</h3>
            <div ng-repeat='i in getNumber(nPages) track by $index' class='col-sm-6'>
                <form class='data-input' ng-submit='alchemy($index)'>
                    <div class="form-group">
                        <label ng-if='$index == 0'>Control page</label>
                        <label ng-if='$index == 1'>Test page</label>
                        <input ng-model='page[$index].url' tabindex="{{$index+1}}" type='url' class="form-control" placeholder="URL" />
                    </div>
                </form>
            </div>
        </div>

        <center>
            <button ng-click='compare()' class='btn btn-primary btn-lg'>Compare pages</button>
        </center>
        <br>

        <article class='metric-row panel panel-default' ng-repeat='metric in metrics'>
            <div class='panel-body'>
                <h2 class='metric-row__name center'>{{metric.name | capitalize}}</h2>
                <hr>
                <section class='metric-identical row'>
                    <h4 class='col-sm-3'>Identical {{metric.name}}</h4>
                    <div class='metric-row__set data-output col-sm-6'>
                        <!-- ?=> ENTITIES -->
                        <table ng-if='metric.name == "entities"' class="table">
                            <thead>
                                <th>Relevance</th>
                                <th>Frequency</th>
                                <th>Entity</th>
                                <th>Type</th>
                            </thead>
                            <tr ng-repeat='data in identical[metric.name]'
                                alchemy="metric.name" alchemy-row='data' ></tr>
                        </table>
                        <!-- ?=> CONCEPTS -->
                        <table ng-if='metric.name == "concepts"' class="table">
                            <thead>
                                <th>Relevance</th>
                                <th>Frequency</th>
                            </thead>
                            <tr ng-repeat='data in identical[metric.name]'
                                alchemy="metric.name" alchemy-row='data' ></tr>
                        </table>
                        <!-- ?=> KEYWORDS -->
                        <table ng-if='metric.name == "keywords"' class="table">
                            <thead>
                                <th>Relevance</th>
                                <th>Frequency</th>
                            </thead>
                            <tr ng-repeat='data in identical[metric.name]'
                                alchemy="metric.name" alchemy-row='data' ></tr>
                        </table>
                        <!-- ?=> RELATIONS -->
                        <table ng-if='metric.name == "relations"' class="table">
                            <tr ng-repeat='data in identical[metric.name]'
                                alchemy="metric.name" alchemy-row='data' ></tr>
                        </table>
                    </div>
                </section>
                <section class='metric-different'>
                    <!-- Toggle -->
                    <div class='toggle-data row'>
                        <h4 class='col-sm-12'>Differing {{metric.name}}</h4>
                        <div class='col-sm-12'>
                            <label class="checkbox-inline">
                                <input type='checkbox' ng-model='metric.generous' class='btn btn-default' />
                                <strong ng-show='metric.generous'>Hide</strong>
                                <strong ng-show='!metric.generous'>Show</strong>
                                <span>less relevant items</span>
                            </label>
                            <br>
                        </div>
                    </div>
                    <!-- -->
                    <div class='row'>
                        <div ng-repeat='i in getNumber(nPages) track by $index' class='metric-row__set data-output col-xs-6'>
                            <!-- ?=> ENTITIES -->
                            <table ng-if='metric.name == "entities"' class="table">
                                <tr ng-repeat='data in page[$index].data[metric.name].unique'
                                    alchemy="metric.name" alchemy-row='data'
                                    ng-show='metric.generous || data.relevance > relThreshold'></tr>
                            </table>
                            <!-- ?=> CONCEPTS -->
                            <table ng-if='metric.name == "concepts"' class="table">
                                <tr ng-repeat='data in page[$index].data[metric.name].unique'
                                    alchemy="metric.name" alchemy-row='data'
                                    ng-show='metric.generous || data.relevance > relThreshold'></tr>
                            </table>
                            <!-- ?=> KEYWORDS -->
                            <table ng-if='metric.name == "keywords"' class="table">
                                <tr ng-repeat='data in page[$index].data[metric.name].unique'
                                    alchemy="metric.name" alchemy-row='data'
                                    ng-show='metric.generous || data.relevance > relThreshold'></tr>
                            </table>
                            <!-- ?=> RELATIONS -->
                            <table ng-if='metric.name == "relations"' class="table">
                                <tr ng-repeat='data in page[$index].data[metric.name].unique'
                                    alchemy="metric.name" alchemy-row='data'></tr>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </article>

    </div>

    <footer class='container'>
        <div class='row'>
            <div class='col-md-12'>2015 &copy; Boom</div>
        </div>
    </footer>

    <script src="public/js/libs.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <script src="public/js/app.min.js"></script>
</body>
</html>