Hub
=
ROLL is made to run a bunch of tasks concurrently & gracefully, to avoid traffic jam

Example
-
You want to require resource thru http for each item, as parameter, from a given array. It could be such a big array that costs all your handlers if you shoot them together. Also it could take a long time to complete if only one pending request at a time.
Maybe now you're thinking 10 pending requests at a time is a good choice to balance resource & time cost.

Interface
-
* **roll** (Promise)
    1. array or generator, will be enumerated.
    2. execution function, take the item(or item yield) from first parameter as input, return a promise. Suggestion is never reject that returned promise, handle the error in your way.
	3. number of pending request at one time.
	