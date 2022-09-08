#!/bin/bash

# works with VS code
code .;

mate-terminal --tab --title="Frontend" -e "bash -c 'cd ./frontend; npm start'" &
mate-terminal --tab --title="Backend" -e "bash -c 'cd ./backend; nodemon'" &
mate-terminal --tab --title="Database" -e "bash -c 'cd ./database; nodemon'"
