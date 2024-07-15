var fs = require('fs')
var exec = require('child_process').exec;
var cmd = 'python user-view.py'
var files = [
	{
		train: 'ml-1m/training-1.csv',
		test: 'ml-1m/test-1.csv'
	},
	{
		train: 'ml-1m/training-2.csv',
		test: 'ml-1m/test-2.csv'
	},
	{
		train: 'ml-1m/training-3.csv',
		test: 'ml-1m/test-3.csv'
	},
	{
		train: 'ml-1m/training-4.csv',
		test: 'ml-1m/test-4.csv'
	},
	{
		train: 'ml-1m/training-5.csv',
		test: 'ml-1m/test-5.csv'
	}
]

var startFile = 0;
var finishFile = 0;

var curFile = startFile;
var curUser = 0;
var maxUser = 6039;

function next() {
	if (curUser >= maxUser){
		curUser = 1;
		curFile++;
		if (curFile > finishFile){
			return;
		}
	}
	else {
		curUser++;
	}

	var config = JSON.parse(fs.readFileSync(__dirname + '/config.json'))
	config.train_name = files[curFile].train
	config.test_name = files[curFile].test
	config.user_id = curUser
	fs.writeFileSync(__dirname + '/config.json', JSON.stringify(config, null, 4))
	exec(cmd, function (err, stdout, stderr) {
		console.log(curFile + ' : ' + curUser)
		next()
	})
}

next()