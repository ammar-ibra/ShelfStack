// --- Part A: Library System ---

class LibraryItem {
    constructor(public id: string, public title: string, public isAvailable: boolean = true) {}
    
    borrow() { this.isAvailable = false; }
    returnItem() { this.isAvailable = true; }
    describe() { return `Item: ${this.title}`; }
}

class Book extends LibraryItem {
    isbn: string;
    author: string;

    constructor({ id, title, isbn, author }: { id: string, title: string, isbn: string, author: string }) {
        super(id, title);
        this.isbn = isbn;
        this.author = author;
    }

    override describe() {
        return `Book: ${this.title} by ${this.author}, ISBN: ${this.isbn}`;
    }
}

class Member {
    #balance: number = 0; // Private field (#)
    constructor(public name: string) {}
    deposit(n: number) { this.#balance += n; }
    getBalance() { return this.#balance; }
}

class LibraryCatalog {
    items: Book[] = [];
    static makeId(prefix: string, n: number) { return `${prefix}-${n}`; }
    
    addItem(book: Book) { this.items.push(book); }

    registerLoan({ memberId, itemId }: { memberId: string, itemId: string }) {
        const item = this.items.find(i => i.id === itemId);
        if (item && item.isAvailable) item.borrow();
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