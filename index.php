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

        <div class='row'>
            <h3 class='col-xs-12'>Alchemy results</h3>
        </div>

        <article class='metric-row panel panel-default' ng-repeat='metric in metrics'>
            <header class='panel-heading'>
                <h4 class='metric-row__name panel-title center'>{{metric.name | capitalize}}</h4>
            </header>
            <div class='panel-body row'>
                <section ng-repeat='i in getNumber(nPages) track by $index' class='metric-row__set data-output col-sm-6'>
                    <!--
                        introduce a bit of display logic at this point
                    -->

                    <!-- ?=> MOST METRICS -->
                    <!-- <table ng-if='metric.name != "relations"' class="table">
                        <tr ng-repeat='(property, data) in page[$index].data[metric.name]'>
                            <td>{{data.text}}</td>
                        </tr>
                    </table> -->

                    <!-- ?=> ENTITIES -->
                    <table ng-if='metric.name == "entities"' class="table">
                        <tr ng-repeat='(property, data) in page[$index].data[metric.name].raw'>
                            <td>
                                <span
                                    class='badge'
                                    style='background: hsl(150,100%,{{data.relevance|normalised:0:1:100:50}}%)'>
                                    {{data.relevance|number:2}}</span>
                            </td>
                            <td>
                                <span
                                    class='badge'
                                    style='background: hsl({{data.count|normalised:1:10:50:-20}},100%,{{data.count|normalised:1:10:100:40}}%)'>
                                    {{data.count}}</span>
                            </td>
                            <td>
                                {{data.text}}
                                <span class='label entity-type' style='background: {{data.type | strToHSL}};'>{{data.type|splitByCap}}</span>
                            </td>
                        </tr>
                    </table>

                    <!-- ?=> RELATIONS -->
                    <table ng-if='metric.name == "relations"' class="table">
                        <tr ng-repeat='(property, data) in page[$index].data[metric.name].raw'>
                            <td>
                                <div class='rel-item rel-subject' ng-if='data.subject.text'>
                                    <div class='rel-item__string'>{{data.subject.text}}</div>
                                    <div class='rel-item__caption'>subject</div>
                                </div>
                                <span class='rel-arrow'></span>
                                <div class='rel-item rel-action' ng-if='data.action.verb.text'>
                                    <div class='rel-item__string'>{{data.action.verb.text}}</div>
                                    <div class='rel-item__caption'>verb</div>
                                </div>
                                <span class='rel-arrow'></span>
                                <div class='rel-item rel-object' ng-if='data.object.text'>
                                    <div class='rel-item__string'>{{data.object.text}}</div>
                                    <div class='rel-item__caption'>object</div>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <!-- data view -->
                    <!-- <table class="table">
                        <tr ng-repeat='(property, data) in page[$index].data[metric.name].raw'>
                            <td>{{data}}</td>
                        </tr>
                    </table> -->

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