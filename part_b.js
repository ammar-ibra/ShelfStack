"use strict";
// --- Part B: Simple Types & Interfaces ---
Object.defineProperty(exports, "__esModule", { value: true });
// 3. Typed Functions (بدون استخدام any)
// اضافة كتابة
function addBook(list, book) {
    return [...list, book]; // Spread operator to return a NEW array
}
//البحث 
function findByIsbn(list, isbn) {
    return list.find(b => b.isbn === isbn);
}
// --- Small Demo ---
let myLibrary = [];
const book1 = {
    id: "B-99",
    title: "TypeScript Essentials",
    isbn: "111-222",
    author: "Focal X"
};
// إضافة الكتاب وتحديث المصفوفة
myLibrary = addBook(myLibrary, book1);
// البحث عن الكتاب
const result = findByIsbn(myLibrary, "111-222");
console.log("=== Part B Results ===");
if (result) {
    console.log(`Book Found: ${result.title} by ${result.author}`);
}
else {
    console.log("Book not found.");
}
