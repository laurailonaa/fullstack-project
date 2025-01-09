Learn Languages! - Fullstack app README (draft)

This app has been made as a final project of our Backend Development course, using self-made RESTful API, SQLite database and React frontend.
The app is designed for learning vocabulary of different languages by word-pairs, for example in Finnish-English.
There are two views, user and admin. User view is for playing the word-pairs, and in admin view you can add and modify them.
There are also variety of languages and themes(tags) to choose of, and admin can add more of them both.

The app is available in render.com:
https://fullstack-project-app.onrender.com/


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

