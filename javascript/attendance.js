
//Get Query String
var qString = location.search;
qString = qString.substring(1, qString.length);

//Define List of Employees in Array
var employeesList = ['10061534(M Jawad Khan)', '10146865(Adil Mahmood)', '69440(Zubair Abbas)', '69410(Muhammad Mansoor)', '69409(Abu Bakar Siddique)', '69412(Kumayal Hussain)', '74806(Aftab Paul)', '68655(Shahid Javed)', '68629(Raheel Ahmed)', '70103(Mazhar Mahmood)', '68609(Asif Ghafar)', '68633(Muhammad Farooq Arshad)', '68808(Khuram Javed)', '68651(Ali Kazim Subhani)', '68812(Raqib Irshad)', '68403(Omar Javaid Sheikh)', '70509(Zamurad Khan)', '10196300(Hannan Tariq)', '69639(Asim Fareed)', '69594(Faisal Naeem)', '68613(Adnan Arif)', '88641(Haider Yaseen)', '89595(Javed Iqbal)', '10217862(Muhammad Umer Manzoor)', '101258(Muhammad Atif Tasneem)', 'ZTE1259(Irfan Tahir)', 'ZTE1269(Muhammad Haseeb Khalid)', 'ZTE1291(Muddasar Ahmed)', 'ZTE1255(Muhammad Sumair Mohsin)', 'ZTE1267(Zeeshan Alam)', 'ZTE1300(Muhammad Haroon Malik)', 'ZTE1278(Arslan Shahid)', 'ZTE1303(Muhammad Fahad Zafar)', 'ZTE1252(Arsalan Hafeez)', 'ZTE1260(M. Zeeshan Munawar)', 'ZTE1273(Zahir Shah)', 'ZTE1264(Faiza Nasir)', 'ZTE1272(Hafiz Tajammal Sultan)', 'ZTE1258(Talha Ghulam Rasool)', 'ZTE1275(Talha Najeeb)', 'ZTE1271(Hassan Shahzad)', 'ZTE1240(Asad Bashir)', 'ZTE1305(Hamza Javed Alvi)'];

var officeLocationList = [];

officeLocationList[42] = "CMPAK Office, KotLakhpat";



var validateStatus, nameOfEmployee, officeName, dateOfAttendance, timeOfAttendance;


//alert(Date());
window.onload = function (){

//alert(employeesList[22]);



	var normalString = qString.substring(0, qString.lastIndexOf('_'));

	var encryptedString = qString.substring(qString.lastIndexOf('_') + 1);

	if(normalString.length < 50 && encryptedString.length == 23){

		var nSId = normalString.substring(0, normalString.indexOf('('));

		var nSName = normalString.substring(normalString.indexOf('(') + 1, normalString.indexOf(')'));

	 	var nSDate = normalString.substring(normalString.indexOf(')') + 1, normalString.indexOf('_'));

	 	var nSTime = normalString.substring(normalString.indexOf('_') + 1);
	 
	 	//alert(normalString + "\n" + nSId + "\n" + nSName + "\n" + nSDate + "\n" + nSTime);

	 	//alert(encryptedString);

	 	var displacedIndex = parseInt(nSTime.substring(nSTime.length - 2)) % 23;

	 	//alert(displacedIndex);

	 	var encryptedString = qString.substring(qString.lastIndexOf('_') + 1);

	 	encryptedString = encryptedString.substring(encryptedString.length - displacedIndex) + encryptedString.substring(0, encryptedString.length - displacedIndex);

	    //alert(encryptedString);

	    var attribute1 = parseInt(nSId.substring(nSId.length - 3, nSId.length));

	    var attribute2 = parseInt(nSTime.replace(":", ""));

	    var attribute3 = parseInt(nSDate.substring(0, 2));

	    var nSQCode = (attribute1 + attribute2) * attribute3 * 7;

	    //alert(attribute1 + "\n" + attribute2 + "\n" + attribute3);

	    //alert(nSQCode);

	    //alert((attribute1 + attribute2) * attribute3);

	    var decodedString = validateAttendance(encryptedString, nSQCode.toString());

	    //alert(normalString + "\n" +decodedString);

	    if (normalString == decodedString){

	    	//alert(dateOfAttendance);

	    	var d = new Date();

			var dateToday = getDate2Digit(d.getDate()) + getMonthName(d.getMonth()) +  d.getFullYear() + ", " + getDayName(d.getDay() + 1) ;

	    	//alert(dateToday);

	    	if(dateOfAttendance == dateToday)
	    		validateStatus = 1;
	    	else
	    		validateStatus = 0;


	    	var hBody = document.getElementById('body');
	    	//hContainer.style.color = 'red';

	    	//hContainer.appendChild('<link rel="stylesheet" type="text/css" href="style_valid.js">');

	    	var link = document.createElement('link');
	    	link.rel = 'stylesheet';
	    	link.type = 'text/css';
	    	validateStatus? link.href = 'styles/style_valid.css': link.href = 'styles/style_almost_invalid.css';

	    	hBody.appendChild(link);

	    	//alert('Verified');
	    	
	    	var hValStatus = document.getElementById('validationStatus');
			validateStatus? hValStatus.innerHTML = "STATUS: " + "Valid" : hValStatus.innerHTML = "STATUS: " + "Valid but not marked today";
			//hValStatus.style.color = 'red';

			var hEmpNameID = document.getElementById('employeeName&Id');
			hEmpNameID.innerHTML = "Employee: " + nameOfEmployee;

			var hOfcLocation = document.getElementById('officeLocation');
			hOfcLocation.innerHTML = "Office: " + officeName;

			var hInDate = document.getElementById('checkInDate');

			hInDate.innerHTML = "Date: " + dateOfAttendance;
			validateStatus? {}: hInDate.style.color = 'red';
			var hInTime = document.getElementById('checkInTime');
			hInTime.innerHTML = "In at (Time): " + timeOfAttendance;

			


	    } else {
	    	validateStatus = -1;
	    	var hBody = document.getElementById('body');
	    	//hContainer.style.color = 'red';

	    	//hContainer.appendChild('<link rel="stylesheet" type="text/css" href="style_valid.js">');

	    	var link = document.createElement('link');
	    	link.rel = 'stylesheet';
	    	link.type = 'text/css';
	    	link.href = 'styles/style_invalid.css';

	    	hBody.appendChild(link);

	    	var hValStatus = document.getElementById('validationStatus');
			hValStatus.innerHTML = "STATUS: " + "Invalid";


	    }

	}

   /*
    
	*/
}

function validateAttendance(eString, qCode){

	
	var decoder = [['+', 'w', 's', 'c', 'u', 'o', '-', 'n', 'y', 'v'], ['-', 'd', 't', 'v', 'n', '+', 'a', 'q', 'o', 'g'], ['p', 'i', 'r', 'q', 'e', 'w', 'x', '+', 's', '-'], ['d', 'g', '+', 't', '-', 'y', 'z', 'e', 'i', 'j'], ['j', 'q', 'f', 'x', 'b', 't', 'w', 'p', '+', 'r'], ['l', 'b', '-', 'j', 'r', 's', '+', 'c', 'a', 't'], ['v', 'e', 'y', 'g', 'k', 'j', 'm', '-', 'f', 'u'], ['z', 'o', 'w', '-', '+', 'd', 'p', 'b', 'e', 'f'], ['c', 'k', 'n', 'h', 'f', '-', 'o', 't', 'q', '+'], ['q', 'm', 'd', '+', 'a', 'x', 'l', 'k', '-', 'e']];

	//alert("eString: " + eString);
	var ij = parseInt(qCode.charAt(0))
	//alert("qCode: " + decoder[0][ij]);

	var dString = "";
	var index1, index2;
	for (index1 = 0; index1 < eString.length; )
		for (index2 = 0; index2 < qCode.length ; index2++) {
			for (var i = 0; i <= 9; i++) {
				//console.log(eString.charAt(index1) + "\n" + decoder[i][parseInt(qCode.charAt(index2))]);
				if(eString.charAt(index1) == decoder[i][parseInt(qCode.charAt(index2))]){
					dString = dString + i;
					break;

					}
				}
			index1++;
		}
	
	//alert(dString);
	var eSIdName = employeesList[parseInt(dString.substring(0, 6))];
	//alert(eSIdName);
	//Initialize Name of Employee
	nameOfEmployee = eSIdName.substring(eSIdName.indexOf('(') + 1, eSIdName.indexOf(')')) + " (" + eSIdName.substring(0, eSIdName.indexOf('(')) + ")";

	//alert(nameOfEmployee);

	//alert(parseInt(dString.substring(6, 10)));

	var eSOffice = officeLocationList[parseInt(dString.substring(6, 10))];

	//alert(eSOffice);

	officeName = eSOffice;

	var eSDay = getDayName(parseInt(dString.substring(18, 19)));

	//alert(eSDay);

	//var eSName = normalString.substring(normalString.indexOf('(') + 1, normalString.indexOf(')'));

 	var eSDate = dString.substring(16, 18) + getMonthName(parseInt(dString.substring(14, 16))) + dString.substring(10, 14);

 	//alert(eSDate);

 	dateOfAttendance = eSDate + ", " + eSDay;

 	var eSTime = dString.substring(19,21) + ":" +dString.substring(21);

 	//alert(eSTime);

 	timeOfAttendance = eSTime;

	//alert(dString);

	return eSIdName.replace(" ", "") + eSDate + "_" + eSTime;

}

function getMonthName(eMonth){

	switch (eMonth){
		case 0: return "Jan";

		case 1: return "Feb";

		case 2: return "Mar";

		case 3: return "Apr";

		case 4: return "May";

		case 5: return "Jun";

		case 6: return "Jul";

		case 7: return "Aug";

		case 8: return "Sep";

		case 9: return "Oct";

		case 10: return "Nov";

		case 11: return "Dec"
	}

}

function getDayName(day){

	switch(day){
		case 1: return "Sunday";

		case 2: return "Monday";

		case 3: return "Tuesday";

		case 4: return "Wednesday";

		case 5: return "Thursday";

		case 6: return "Friday";

		case 7: return "Saturday";	
	}

}

function getDate2Digit(date){

	switch(date){
		case 1: return "01";

		case 2: return "02";

		case 3: return "03";

		case 4: return "04";

		case 5: return "05";

		case 6: return "06";

		case 7: return "07";	

		case 8: return "08";

		case 9: return "09";

		default: return date;
	}
}
