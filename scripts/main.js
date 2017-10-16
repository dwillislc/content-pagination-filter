const $studentList = $('.student-list'); 
const $students = $('.student-item');
const $pagination = $('.pagination'); 
const currentArray = $students.slice(0);  
//Create an array of student names and emails
const $studentNames = $students.find('h3');
const $studentEmails = $students.find('.email');

//Function displays a range of 10 students based on the number inputted in the parameter
function displayStudents (num) {
	$studentList.empty();  

	// If student list less than 10, display them 
	if (currentArray.length < 10) {
		for (let i = 0; i < currentArray.length; i++) {
			$studentList.append(currentArray[i]);
		}
	} else {
		let nextNums = (num - 1) * 10;
		for (let i = nextNums; i < nextNums + 10; i++) {
			$studentList.append(currentArray[i]); 
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

	linkClick(); 
}

//Link to the correct user list
function linkClick () {
	let $link = $pagination.find('a'); 
	$link.on('click', function () {
		let num = parseInt($(this).html());
		//Give link active class
		$('a.active').removeClass("active");
		$(this).addClass("active"); 
		displayStudents(num); 
	});
}



//Display the first ten students when user enters the webpage 
displayStudents(1);
createPagination($students);

/******
Search bar will find names or emails that match user's input. 
If there are no matches, a message will be displayed asking the user to 
try searching again. 
*******/

//Add search bar to HTML 
$('.page-header').append('<form class="student-search"><input type="text"><button type="button">Search</button></form>');  

//Assign search bar to variable
const $userInput = $('.student-search');
const matched = [];  

// Find all students with a name or email that matches search input
function searchList() {
	//Get input value 
	let $input = $userInput.find('input').val();
	currentArray.length = 0;

	//Remove the page link 
	$pagination.empty(); 

	//Return original student list if nothing is searched
	if ($input === ''){
		for (let i = 0; i < $students.length; i++) {
			currentArray.push($students[i]); 
		}
		createPagination(currentArray);
		displayStudents(1); 
		return;
	}

	// Reset matched array  
	matched.length = 0; 

	//Loop through list and input matched searches into the array
	for (let i = 0; i < $studentNames.length; i ++) {
		if ($studentNames[i].innerHTML.includes($input) || $studentEmails[i].innerHTML.includes($input)) {
			matched.push($students[i]); 
		}
	}
	
	//Add matched elements to current array 
	for (let i = 0; i < matched.length; i++) {
			currentArray.push(matched[i]); 
		} 

	// Create pagination if there are more than ten matches  
	if (matched.length === 0){
		$studentList.empty();
		$studentList.append("There were no students that matched your search. Please try again.");
		return; 
	} else if (matched.length < 10) {
		displayStudents(); 
	} else {
		createPagination(matched); 
		displayStudents(1); 
	}
	
}

//Run search function when user clicks search button 
$userInput.find('button').on('click', function () {
	searchList(); 
});



