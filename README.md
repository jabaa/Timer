# Timer
Creates multiple countdown timers

## Requires:
* jquery >= 2.0.3
* bootstrap >= 3.3.4
+ bootstrap-theme

## Usage:
Create a new Timer object and pass a container id as paramter.

## Example:
	<!DOCTYPE html>
	
	<html>
		<head>
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
			<link rel="stylesheet" href="css/Timer.css" type="text/css"/>
		</head>
		<body>
			<div id="container" class="container">
			</div><!-- container -->

			<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
			<script src="js/Timer.js"></script>
			<script>
				$(document).ready(function () {
					new Timer('container');
				});
			</script>
		</body>
	</html>
