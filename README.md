Learn Languages! - Fullstack app README

DESCRIPTION

This app has been made as a final project of our Backend Development course, using self-made RESTful API, SQLite database and React frontend.
The app is designed for learning vocabulary of different languages by word-pairs, for example in Finnish-English. User can
also learn vocabulary in reverse order, i.e English-Finnish.
There are two views, user and admin. User view is for playing the word-pairs, and in admin view you can add and modify them.
There are also variety of languages and themes(tags) to choose of, and admin can add more of them both.

The app is available in render.com:
https://fullstack-project-app.onrender.com/

Link to the screencast:
https://www.youtube.com/watch?v=khb6gw8mISs 

INSTALLATION GUIDE

* Download the source.zip directory from the release's assets
* Compile the zip directory into desired place, i.e Desktop
* Open the directory in code editor, such as Visual Studio Code
* For starting the frontend, navigate to the frontend directory and use npm run dev

cd frontend

npm run dev

When done correctly, it should look like this:

![image](https://github.com/user-attachments/assets/e90bb202-0759-4c77-a6cd-819ca891a4d1)

The frontend is now accessible through localhost:5173

* For starting the backend, open up a new terminal, navigate to the backend directory and use node index.js

cd backend

node index.js

When done correctly, it should look like this:

![image](https://github.com/user-attachments/assets/a0a1b575-4b7c-4b7d-9c92-31106f28a76a)


INTRODUCING THE FULLSTACK-APP

Default view of the app, it starts from user view:

![Näyttökuva 2025-01-08 101107](https://github.com/user-attachments/assets/acf4d45a-e675-44cc-8da0-9367e0afa3f4)


Admin view:

![Näyttökuva 2025-01-08 101256](https://github.com/user-attachments/assets/13ca7051-e965-4a47-9acd-0aa132580b5a)

Admin can delete and update existing words:

![Näyttökuva 2025-01-08 101351](https://github.com/user-attachments/assets/3c66644c-9057-4064-a985-f5385899cbc1)

In both views, there is also filtering possibility, where the app's user can change the desired language and theme of the words.
For example, if they want to learn/or modify Swedish words in color theme, they can change the visible words in the option bar:

![Näyttökuva 2025-01-08 101555](https://github.com/user-attachments/assets/6985d0f5-1b3c-4d8b-8562-ff39687656e2)

Then it will show exactly those words in the frontend:

![Näyttökuva 2025-01-08 101645](https://github.com/user-attachments/assets/6800d516-1d9e-490a-889d-9b7d9f94d66f)

and in user view:

![Näyttökuva 2025-01-08 101718](https://github.com/user-attachments/assets/ddfca500-cf5a-4216-afa6-df5a751ba9b2)

User can also check how many of the words they got correct. When user clicks 'Start quiz'-button, after they've answered to the words pairs by their knowledge,
they can check their total score and/or retry the quiz again.

![Näyttökuva 2025-01-08 101933](https://github.com/user-attachments/assets/27cb2d84-4c68-4cc6-80bf-9217161da931)

After pressing the check button, computer will alert how many words were correct. After that it will show which ones were correct and which were not by coloring the
word-pairs in either green or red. When user presses the retry button, the site will reload and user can play the quiz again.

![Näyttökuva 2025-01-08 102110](https://github.com/user-attachments/assets/69c4b694-553a-4c8f-91d2-52edcd304f1d)

![Näyttökuva 2025-01-08 102131](https://github.com/user-attachments/assets/fb0e2b80-7211-40cc-8b17-105d0b00470b)


CODE EXAMPLE OF ADDING A NEW WORD

The project uses self-made RESTful API with a SQLite database in memory. In the frontend's admin view, admin can make a
POST http-request into the backend to add a new word-pair into the database.

In frontend:

Adding a new word into the English - animals category:

![image](https://github.com/user-attachments/assets/6804a67a-3857-4213-aff3-715375f50b7a)

When clicking the add word -button, it shows the new word in the word list below:

![image](https://github.com/user-attachments/assets/c1d88621-d838-4172-82c5-8d6c319d8d30)

In the frontend's code:

![image](https://github.com/user-attachments/assets/ea123df5-b7c6-4648-834c-5fae07a1f156)

There are two input fields which will save it's content into specific data, in this case, to the database's foreign_word

and finnish_word columns in the specific language and tag categories. When the add word button is clicked, it will toggle
the postWord function which looks like this:

![image](https://github.com/user-attachments/assets/becd942a-d289-46ed-b1d2-90679f9fef60)

which makes the post request to the backend.

In the backend's code it will look like this:

![image](https://github.com/user-attachments/assets/d2b381ed-15dc-4c3f-b210-5a32699e4809)

wordsRouter has default route of /api/words so it will automatically add new words to the right path

router also has precise error handling regarding of the task which shows on the console when a request has been
made correctly or if there has been an error

![image](https://github.com/user-attachments/assets/ca2fec91-571f-4943-9b8f-307a8dc84eee)

The request goes from the router into the database's functions which look like this:

![image](https://github.com/user-attachments/assets/253c5b77-d165-4fe3-bd4f-f672895b0f6f)

It uses SQL queries to fetch/save/delete/patch desired data from the SQL database efficiently. When everything is done

correctly, it will resolve with the new word that will reflect on the frontend list.

AI TOOLS

ChatGPT has been consulted few times with the React-part of the project, mainly with the filtering and state-forming problems, which
are clearly commented in the code. Backend-portion of the project is done on my own. I have asked AI to give me some tips from my own thoughts, about how to implement something or if there is a similar way to do it. When AI has given
me an example, I have consulted it more to explain why some parts has to be made specific way and/or if my version of the
code would work itself OR if there is another way to do it, based on my own code and ideas.

I also made AI to explain state changes and other React basics for me due the lack of explanation and help on our own
React course, which was the reason the whole frontend-part of this project was very time-consuming and in some parts confusing to do.





© Laura Shemeikka 2025

