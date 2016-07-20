/**
 * Functions to validate user input.
 */

/*Validates

 - should not be longer than 56 characters.
 - should be email address
    - alphaNumber characters and _ before @
    - alphaNumber characters and _ after @
    - . is present after @ and alphanumberic characeters
    - 3 alphabets after .
*/

function validateUsername( username ) {

    var pattern = /^([a-zA-z0-9_\.]+)@([a-zA-z0-9]+).([a-zA-z]{3})$/,
        currentError = '';

    if( username.length > 56 ||  !pattern.test( username ) ) {
        $('#username').addClass('red');
        $('#validation-failures').removeClass( 'disabled' ).addClass('enabled');
        currentError = document.getElementById( 'validation-failures').innerHTML;

        if ( currentError.indexOf('Username should be an email') === -1 ) {
            document.getElementById('validation-failures').innerHTML = document.getElementById('validation-failures').innerHTML + 'Username should be an email address, with 56 characters max';
        }
        return false;
    }
    return true;
}

/* Checking Password is 6 characters.
 * Confirm Password is not checked because validatePasswordMatch ensures that length restriction is applied to confirmPassword as well
 */
function validatePasswords( password ){
    var currentError;
    if ( password.length < 6) {
        $('#password').addClass('red');
        currentError = document.getElementById( 'validation-failures').innerHTML;
        if ( currentError.indexOf('Password should be atleast 6 characters long') === -1 ) {
            $('#validation-failures').removeClass( 'disabled' ).addClass('enabled');
            document.getElementById('validation-failures').innerHTML = currentError + '<br>Password should be atleast 6 characters long';
        }
        return false;
    }
    return true;
}


/* match Password and match password. */
function validatePasswordMatch( password, confirmPassword ){
    var currentError;
   if( password !== confirmPassword ) {
       currentError = document.getElementById( 'validation-failures').innerHTML;
       $('#password').addClass('red');
       if( currentError.indexOf('Password and confirm password should match') === -1 ) {
           $('#validation-failures').removeClass('disabled').addClass('enabled');
           document.getElementById('validation-failures').innerHTML = currentError + '<br>Password and confirm password should match';
       }
       return false;
   }
   return true;
}

/*Name is only alphabets, max length 50 characters */
function validateName ( name, firstOrLast ) {
    var cleanedName = name.trim();
    var pattern = /^[A-Za-z]+$/g;
    var currentError;

    if( firstOrLast === 'lastname' && name.length === 0 ) {
        return true;
    }
    if ( name.length > 50 || !pattern.test( cleanedName ) ) {
        currentError = document.getElementById( 'validation-failures').innerHTML;
        if( currentError.indexOf('First Name and Last Name should cannot be more than 50 characters') === -1) {
            $('#validation-failures').removeClass('disabled').addClass('enabled');
            document.getElementById('validation-failures').innerHTML = currentError + '<br>First Name and Last Name should cannot be more than 50 characters long and should have only alphabets';
        }
        return false;
    }
    return true;
}

/*
* Age is between 14 years and 150 years.
* */
function validateBirthDate( birthDate ){

    var age = calculateAge( birthDate ),
        currentError;

    if ( age <14 || age >150 ){
        currentError = document.getElementById( 'validation-failures').innerHTML;
        if( currentError.indexOf('Age should betweeen 14 and 150 years' ) === -1 ){
            $('#validation-failures').removeClass('disabled').addClass('enabled');
            document.getElementById('validation-failures').innerHTML = currentError + '<br>Age should be betweeen 14 and 150 years';
        }
        return false;
    }
    return true;
}

function calculateAge ( birthDateText ) {

    var currentDate  = new Date(),
        birthDate = new Date( birthDateText ),
        birthYear = birthDate.getFullYear(),
        birthMonth = birthDate.getMonth(),
        birthDay = birthDate.getDate(),
        currentYear = currentDate.getFullYear(),
        currentMonth = currentDate.getMonth(),
        currentDay = currentDate.getDate(),
        age;

    age =  currentYear - birthYear;

    if ( currentMonth < birthMonth || currentMonth === birthMonth && currentDay < birthDay ){
        age -= 1 ;
    }

    return age;
}

function validateData(){
    var validUserName = validateUsername( document.getElementById( "username" ).value ),
        validFirstName = validateName( document.getElementById( 'firstname' ).value, 'firstname' ),
        validLastName = validateName( document.getElementById('lastname').value, 'lastname' ),
        validPassword = validatePasswords( document.getElementById( 'password').value ),
        validBirthdate = validateBirthDate( document.getElementById( 'birthdate' ).value );
    return validUserName && validFirstName && validLastName && validPassword && validBirthdate;
}

function submitData() {
    if ( validateData() ) {
        //Code to submit data goes here. As of now, showing an alert.
        alert( 'User Successfully Added!!!');
        return true;
    }
    else{
        alert( 'Invalid data. Please correct the errors');
        return false;
    }
}