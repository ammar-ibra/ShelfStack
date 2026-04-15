"use strict";
// --- Part A: Library System ---
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Member_balance;
class LibraryItem {
    constructor(id, title, isAvailable = true) {
        this.id = id;
        this.title = title;
        this.isAvailable = isAvailable;
    }
    borrow() { this.isAvailable = false; }
    returnItem() { this.isAvailable = true; }
    describe() { return `Item: ${this.title}`; }
}
class Book extends LibraryItem {
    constructor({ id, title, isbn, author }) {
        super(id, title);
        this.isbn = isbn;
        this.author = author;
    }
    describe() {
        return `Book: ${this.title} by ${this.author}, ISBN: ${this.isbn}`;
    }
}
class Member {
    constructor(name) {
        this.name = name;
        _Member_balance.set(this, 0); // Private field (#)
    }
    deposit(n) { __classPrivateFieldSet(this, _Member_balance, __classPrivateFieldGet(this, _Member_balance, "f") + n, "f"); }
    getBalance() { return __classPrivateFieldGet(this, _Member_balance, "f"); }
}
_Member_balance = new WeakMap();
class LibraryCatalog {
    constructor() {
        this.items = [];
    }
    static makeId(prefix, n) { return `${prefix}-${n}`; }
    addItem(book) { this.items.push(book); }
    registerLoan({ memberId, itemId }) {
        const item = this.items.find(i => i.id === itemId);
        if (item && item.isAvailable)
            item.borrow();
    }
    snapshotStats() {
        return {
            total: this.items.length,
            available: this.items.filter(i => i.isAvailable).length
        };
    }
}
// --- Demo Section ---
const cat = new LibraryCatalog();
// إضافة الكتاب 
cat.addItem(new Book({
    id: "b1",
    title: "Clean Code",
    isbn: "978-0132350884",
    author: "Martin"
}));
// تسجيل الإعارة 
cat.registerLoan({ memberId: "m1", itemId: "b1" });
// Destructuring
const { total, available } = cat.snapshotStats();
//طباعة النتائج 
console.log(`total is number of books: ${total}`);
console.log(`available is how many are not on loan: ${available}`);
// (Override)
console.log(cat.items[0].describe());
