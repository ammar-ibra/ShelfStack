// --- Part B: Simple Types & Interfaces ---

// 1. استخدام Type Alias
export{};
type BookId = string;

// 2. تعريف Interfaces (مع استخدام readonly)
interface Book {
    readonly id: BookId; // Readonly field as requested
    title: string;
    isbn: string;
    author: string;
}

interface Loan {
    id: string;
    bookId: BookId;
    memberId: string;
}

// 3. Typed Functions (بدون استخدام any)

// اضافة كتابة
function addBook(list: Book[], book: Book): Book[] {
    return [...list, book]; // Spread operator to return a NEW array
}
//البحث 
function findByIsbn(list: Book[], isbn: string): Book | undefined {
    return list.find(b => b.isbn === isbn);
}

// --- Small Demo ---
let myLibrary: Book[] = [];

const book1: Book = {
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
} else {
    console.log("Book not found.");
}