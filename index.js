var express = require('express')
var path = require('path')
var osu = require('node-os-utils')
const { os } = require('node-os-utils')
var cpu = osu.cpu
var mem = osu.mem
var netstat = osu.netstat
var drive = osu.drive
var count = cpu.count()

app = express()

app.set('port', 637)

var server = app.listen(app.get('port'), function() {

  
	console.log("Server running...")
})

app.get("/", function(req, res){
    cpu.usage().then(cpuPercentage => {
        console.log("CPU Load: " + cpuPercentage + "%") // 10.38
        mem.info().then(meminfo => {
            console.log("Memory Information: " + meminfo.usedMemMb + " used of " + meminfo.totalMemMb)
            netstat.inOut().then(info => {
                console.log(info)
                drive.info().then(drive => {
                    console.log(drive.usedPercentage)
                    
                        var data = [{"cpu_load":cpuPercentage,"memory_used":meminfo.usedMemMb,"memory_capacity":meminfo.totalMemMb,"connection_speed":info.inOut,"drive_used":drive.usedGb, "drive_capacity":drive.totalGb,"hostname":os.hostname()}];
                    res.json(data);
                })

              })
          })
      })

    
    

    
});

app.get("/students.json", function(req, res){
    var data = [{"id":1,"first_name":"Emmy","last_name":"Gradley","grade":29},
    {"id":2,"first_name":"Christean","last_name":"Deeny","grade":41},
    {"id":3,"first_name":"Maxie","last_name":"Goldthorpe","grade":86},
    {"id":4,"first_name":"Free","last_name":"Novkovic","grade":33},
    {"id":5,"first_name":"Alexandros","last_name":"Paliser","grade":32},
    {"id":6,"first_name":"Vannie","last_name":"Bowler","grade":31},
    {"id":7,"first_name":"Cy","last_name":"Cheshire","grade":88},
    {"id":8,"first_name":"Gray","last_name":"Eardley","grade":57},
    {"id":9,"first_name":"Kessiah","last_name":"Breedy","grade":16},
    {"id":10,"first_name":"Wilden","last_name":"Chastaing","grade":65}];
    
    res.json(data);
});