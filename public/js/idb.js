// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'budget_tracker' and set it to version 1
const request = indexedDB.open('budget_tracker', 1);
// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
// save a reference to the database 
const db = event.target.result;
// create an object store (table) called `new_withdrawal`, set it to have an auto incrementing primary key of sorts 
db.createObjectStore('new_withdrawal', { autoIncrement: true });
};
db.createObjectStore('new_deposit', { autoIncrement: true });


// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
// open a new transaction with the database with read and write permissions 
const transaction = db.transaction(['new_withdrawal'], 'readwrite');
  
// access the object store for `new_pizza`
const withdrawalObjectStore = transaction.objectStore('new_withdrawal');
  
// add record to your store with add method
withdrawalObjectStore.add(record);
}