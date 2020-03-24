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

*/

export const promiseFunction = () => {

	fetch('https://jsonplaceholder.typicode.com/users')
		.then(userResponse => userResponse.json())
		.then(users => {
			const firstUser = users[3];
			console.log("promiseFunction firstUser=", firstUser);
			return fetch('https://jsonplaceholder.typicode.com/posts?userId=' + firstUser.id);
		})
		.then(postsResponse => postsResponse.json())
		.then(posts => console.log("promiseFunction firstUser posts=", posts))
		.catch(error => console.log("ERROR", error));
}

export const asyncFunction = async() => {

	try {

		const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
		const user = await userResponse.json();
		const secondUser = user[5];
		console.log("asyncFunction secondUser", secondUser);

		const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + secondUser.id);
		const posts = await postResponse.json();
		console.log("asyncFunction secondUser posts=", posts);

	}
	catch (error) {
		console.log("ERROR", error);
	}

}


export const noFunctionSynchronizaton = () => {

		const userResponse =  fetch('https://jsonplaceholder.typicode.com/users');
		console.log("userResponse",userResponse); 
		const user = userResponse.json(); 
		
		// userResponse.json is not a function error will be thrown because
		// promise retured by the fetch() function hasn't completed yet. 
		// In the console you will see:  
		//		userResponse -> Promise {<pending>}

		const thirdUser = user[3];
		console.log("noFunctionSynchronizaton thirdUser", thirdUser);

		const postResponse = fetch('https://jsonplaceholder.typicode.com/posts?userId=' + thirdUser.id);
		const posts = postResponse.json();
		console.log("noFunctionSynchronizaton thirdUser posts=", posts);

}

