require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('./models/User');
const Book     = require('./models/Book');
const Borrow   = require('./models/Borrow');

// ── Sample Data ───────────────────────────────────────────

const users = [
  // Librarians
  { name: 'Admin Librarian',  email: 'librarian@library.com', password: '123456', role: 'librarian' },
  { name: 'Sara Khan',        email: 'sara@library.com',      password: '123456', role: 'librarian' },

  // Students
  { name: 'John Doe',         email: 'john@student.com',      password: '123456', role: 'student' },
  { name: 'Ayesha Raza',      email: 'ayesha@student.com',    password: '123456', role: 'student' },
  { name: 'Rahul Sharma',     email: 'rahul@student.com',     password: '123456', role: 'student' },
  { name: 'Emily Watson',     email: 'emily@student.com',     password: '123456', role: 'student' },
  { name: 'Ali Hassan',       email: 'ali@student.com',       password: '123456', role: 'student' },
];

const books = [
  { title: 'The Alchemist',                  author: 'Paulo Coelho' },
  { title: 'To Kill a Mockingbird',          author: 'Harper Lee' },
  { title: '1984',                           author: 'George Orwell' },
  { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' },
  { title: 'The Great Gatsby',               author: 'F. Scott Fitzgerald' },
  { title: 'Pride and Prejudice',            author: 'Jane Austen' },
  { title: 'The Catcher in the Rye',         author: 'J.D. Salinger' },
  { title: 'Brave New World',                author: 'Aldous Huxley' },
  { title: 'The Hobbit',                     author: 'J.R.R. Tolkien' },
  { title: 'Atomic Habits',                  author: 'James Clear' },
  { title: 'Rich Dad Poor Dad',              author: 'Robert Kiyosaki' },
  { title: 'Clean Code',                     author: 'Robert C. Martin' },
  { title: 'The Pragmatic Programmer',       author: 'Andrew Hunt' },
  { title: 'Deep Work',                      author: 'Cal Newport' },
  { title: 'Sapiens',                        author: 'Yuval Noah Harari' },
];

// ── Seeder Function ───────────────────────────────────────

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    await User.deleteMany();
    await Book.deleteMany();
    await Borrow.deleteMany();
    console.log('🗑️  Cleared existing data');

    // Hash passwords manually (pre-save hook won't run on insertMany)
    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      }))
    );

    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`👤 Seeded ${createdUsers.length} users`);

    const createdBooks = await Book.insertMany(books);
    console.log(`📚 Seeded ${createdBooks.length} books`);

    // Create some sample borrow records
    const students   = createdUsers.filter(u => u.role === 'student');
    const borrowData = [
      { student: students[0]._id, book: createdBooks[0]._id, returned: false },   // John  → Alchemist
      { student: students[1]._id, book: createdBooks[2]._id, returned: false },   // Ayesha → 1984
      { student: students[2]._id, book: createdBooks[4]._id, returned: true,
        returnedAt: new Date() },                                                  // Rahul → Great Gatsby (returned)
      { student: students[3]._id, book: createdBooks[7]._id, returned: false },   // Emily → Brave New World
      { student: students[4]._id, book: createdBooks[9]._id, returned: true,
        returnedAt: new Date() },                                                  // Ali → Atomic Habits (returned)
    ];

    // Mark borrowed books as unavailable
    const borrowedBookIds = borrowData
      .filter(b => !b.returned)
      .map(b => b.book);
    await Book.updateMany({ _id: { $in: borrowedBookIds } }, { available: false });

    await Borrow.insertMany(borrowData);
    console.log(`📋 Seeded ${borrowData.length} borrow records`);

    console.log('\n🎉 Database seeded successfully!\n');
    console.log('─────────────────────────────────────────');
    console.log('🔑 Login Credentials (all passwords: 123456)');
    console.log('─────────────────────────────────────────');
    console.log('LIBRARIANS:');
    console.log('  librarian@library.com  →  123456');
    console.log('  sara@library.com       →  123456');
    console.log('\nSTUDENTS:');
    console.log('  john@student.com       →  123456');
    console.log('  ayesha@student.com     →  123456');
    console.log('  rahul@student.com      →  123456');
    console.log('  emily@student.com      →  123456');
    console.log('  ali@student.com        →  123456');
    console.log('─────────────────────────────────────────\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder error:', err);
    process.exit(1);
  }
};

seedDB();
