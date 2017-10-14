const $studentList = $('.student-list'); 
const $students = $('.student-item');
const $pagination = $('.pagination'); 



//Create an array of student names and emails
const $studentNames = $students.find('h3')
const $studentEmails = $students.find('.email')

//Function displays a range of 10 students based on the number inputted in the parameter
function displayStudents (num, array) {
	$studentList.empty(); 
	let studentArray = $students; 
	if (array != null) {
		studentArray = array; 
	} 
	// If student list less than 10, display them 
	if (studentArray.length < 10) {
		for (let i = 0; i < studentArray.length; i++) {
			$studentList.append(studentArray[i]);
		}
	} else {
		let nextNums = (num - 1) * 10;
		for (let i = nextNums; i < nextNums + 9; i++) {
			$studentList.append(studentArray[i]); 
		}		
	}	 
}

//Create a link for every 10 students in the student list 
function createPagination (students) {
	if (students.length < 10) {
		return; 
	}

	let numPages = students.length/10; 
	for (let i = 1; i < Math.ceil(numPages)+1; i++) {
		$pagination.append("<li><a href='#'>"+ i +"</a></li>"); 
	}
}

//Display the first ten students when user enters the webpage 
displayStudents(1) 
createPagination($students)

//Select all links in the pagination div
const $links = $pagination.find('a');

//Display the appropriate range of ten based on the clicked link 
$links.on('click', function () {
	let num = parseInt($(this).html());
	
	//Give link active class
	$('a.active').removeClass("active");
	$(this).addClass("active"); 
	 
	displayStudents(num); 
});


/******
Search bar will find names or emails that match user's input. 
If there are no matches, an alert will be displayed asking the user to 
try searching again. 
*******/

//Add search bar to HTML 
$('.page-header').append('<form class="student-search"><input type="text"><button type="button">Search</button></form>');  

//Assign search bar to variable
const $userInput = $('.student-search');  

// Find all students with a name or email that matches search input
function searchList() {
	//Get input value 
	let $input = $userInput.find('input').val();
	
	//Don't run function if theres no value in search bar
	if ($input == ''){
		displayStudents(null, $students)
	}

	//Remove the page link 
	$pagination.empty(); 

	//Loop through list and input matched searches into the array 
	let matched = [];
	for (let i = 0; i < $studentNames.length; i ++) {
		if ($studentNames[i].innerHTML.includes($input) || $studentEmails[i].innerHTML.includes($input)) {
			matched.push($students[i]); 
		}
	}
	
	//Alert if no matches found 
	if (matched.length == 0){
		$studentList.empty();
		$studentList.append("There were no students that matched your search. Please try again.");
		return; 
	}	

	//Add pagination if over 10 students found
	if (matched.length < 10){
		displayStudents(null, matched); 
	} else {
		createPagination(matched); 
		displayStudents(1, matched); 
	}
}

//Run search function when user clicks search button 
$userInput.find('button').on('click', function () {
	searchList(); 
});

