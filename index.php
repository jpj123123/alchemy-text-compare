<!DOCTYPE html>
<html lang='en-gb' ng-app='alchemy'>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Goog Product Table</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel='stylesheet' href='public/css/app.min.css' />
    <link rel='stylesheet' href='/boom/global/public/css/app.min.css' />
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

        <article class='metric-row row' ng-repeat='metric in metrics'>
            <h4 class='metric-row__name col-xs-12'>{{metric.name | capitalize}}</h4>
            <section ng-repeat='i in getNumber(nPages) track by $index' class='metric-row__set data-output col-sm-6'>
                <ul class='metric-row__list'>
                    <li class='metric-row__item' ng-repeat='(property, data) in page[$index].data[metric.name]'>
                        {{data}}
                    </li>
                </ul>
            </section>
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