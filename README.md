1) What is the difference between null and undefined?
ans: Undefined is something in javascript like error or not defined, it's not known or given before. and Null is like the value is given but nothing. Null can be empty value, where if the host wishes can put it value less.

2) What is the use of the map() function in JavaScript? How is it different from forEach()?
and: Map() is a a funtion in Javascript, which one can create a list and use them by conditional rendering. while we have need pick some items from an array with conditions or demanded , we use map() func. So that we don't have to create a new array of lists/objects. it can return a list by modifying or from a another list/array.
and on the other side te forEach() function can just shout out and order the array or lists to provide updated value, it can't provide a new array like map() function.

3) What is the difference between == and ===?
ans: 'a==b' this means the value of both item a and b is same. they could be str or int. the == operator finds the value equale. exm- '3' == 3 is true. They are same.
but while the '===' tripple equales come, that means the both ans has to be very same. they can't stay str or float or int. They have to be same same. exm- '45 === 45' true, and 32 ==='32' is not true.

4) What is the significance of async/await in fetching API data?
ans: asynch/await makes the order of fetching data properly with roleplay or serial. it does the work of fetch 'url' --> .then(()=>{}). But by maintaining serial. They commands the api to bring data step by step. it makes api call one time but bring data synchronously. await is used for synchronous data processing, but asynch does the opposite thing, It makes the code more workable and bug free. also efficient.

5) Explain the concept of Scope in JavaScript (Global, Function, Block).
ans: There are 3 scope (global, function, and block)
the Global scope is free for all, means any from the outside or inside can access data from.
but the Function scope has limited access. it only works in function.
the Block scope is limited in {} this. it only could be access in this curly bracket. exm- const
