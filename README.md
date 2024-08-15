# Remembering Books

Remembering Books is a Book Remembering website which is built from the scratch and not a clone of any website out there on internet.This will allow users to write about keypoints books that he has read so that in future he can remember about the books. Database is used in this version of the application. 
This is built using **_Public API i.e OpenLibrary, Node.js, Express.js, EJS, PostgresQl, Html, Css, Javascript, Bootstrap_**.

## What is **OpenLibrary Api**?

The Open Library Public API provides access to a vast amount of book data, which is part of the Open Library project, an initiative by the Internet Archive. This API allows developers to interact with Open Library's catalog and retrieve information about books, authors, and other bibliographic data.

### Here are some key features of the Open Library API: ###

**Book Information:** You can retrieve details about books using various identifiers like ISBN, OCLC, and OLID (Open Library ID). This includes information such as the title, author, publication date, and cover images.

**Author Information:** You can get details about authors, including their names, birth and death dates, and the books they've written.

**Search Functionality:** The API supports search queries to find books and authors based on keywords, subjects, or other criteria.

**Edition and Work Data:** The API provides information about different editions of a book and the work it belongs to, including data about editions' availability and locations.

**Borrowing Information:** For some books, you can find information about where they are available for borrowing, particularly from libraries.

## Features:
1. **Write Notes:** Users should be able to write keynotes about the books he has read so that he can remember about the books in future when he visits website.

2. **Storage:** PostgresQl Database is used so that user's data can be stored or persisted.

3. **Sorting:** Books can be Sorted by Recently added and High rating or recommendations.

4. **Update**: User can also update book description and his notes he wrote and can also change rating of the book by his again reading experience.

5. **Delete**: User can also delete any book data from database.

6. **Timing**: User can also see the timing of Book when he last time read on website. 

7. **Data Viewing**: Home Page of website shows all the data abouts books you have read and written about it. 

## How to Start Remembering Books website?

There are some instruction to run this application your local system....

**step-1:** clone this code in your system using `git clone` in your terminal.

**step-2:** open index.js file in your terminal.

**step-3:** run commend `npm install`.

**step-4:** start server using `nodemon index.js`or `node index.js`.

