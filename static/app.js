$.ajax({
    url: "/students.json"
}).done((data)=>{
    var names = data;
    var sum = 0;
    var lowest = 100;
    var highest = 0;
    names.forEach((student_data)=>{
        var full_name = student_data["first_name"] + " " + student_data["last_name"];
        var id = student_data["id"];
        var grade = student_data["grade"];
        sum += grade;
        if(grade <= lowest){
            lowest = grade;
        }
        if(grade >= highest){
            highest = grade;
        }
        $("#students").append("<li>"+full_name+": " + grade + "</li>");
    });

    var average = sum / names.length;
    $("#lowest").text(lowest);
    $("#highest").text(highest);
});

