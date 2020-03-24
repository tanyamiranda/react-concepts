/*

The purpose of this javascript exercise is to demonstration a few ways to make 
multiple asynchronous calls synchronous using the Promise or Async/Await methods
provided by javascript ES6 and ES7.

To use, copy and paste into browser javascript console and call each function.

Details:

fetch() is an asynchronous global function. Calling fetch() returns a Promise. 
We can then wait for the promise to resolve by passing a handler with the .then() 
method of the promise. That handler receives the return value of the fetch promise, 
a Response object.

In the promiseFunction(), since fetch() returns a promise, we can use the 
.catch() method of the promise to intercept any error occurring during the execution 
of the request, and the processing done in the .then callbacks.

In the asynchFunction(), a try/catch format is used similar to Java. 
The await keyword makes the thread wait for a response/reject from the method call 
to continue to the next line of code. If an error is thrown, it is caught
by the catch portion.

References:

Async/Await Video
https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15046496#overview

Promises Video
https://www.udemy.com/course/complete-react-developer-zero-to-mastery/learn/lecture/15037608#overview

*/

const promiseFunction = () => {

	fetch('https://jsonplaceholder.typicode.com/users')
		.then(userResponse => userResponse.json())
		.then(users => {
			const firstUser = users[0];
			console.log("firstUser=", firstUser);
			return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id);
		})
		.then(postsResponse => postsResponse.json())
		.then(posts => console.log("posts=", posts))
		.catch(error => console.log("ERROR", error));
}

const asyncFunction = async() => {

	try {

		const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
		const user = await userResponse.json();
		const secondUser = user[1];
		console.log("secondUser", secondUser);

		const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + secondUser.id);
		const posts = await postResponse.json();
		console.log("posts=", posts);

	}
	catch (error) {
		console.log("ERROR", error);
	}

}

asyncFunction();