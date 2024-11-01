# Task Tracker

Sample solution for the task-tracker challenge from roadmap.sh.

## How to run

Clone the repository and run the following command:

```
git clone https://github.com/yohanetifier/backend-projects.git
cd backend-projects/TaskTracker
```

## Run the following command to build and run the project

### Install all dependencies

you can check the version of node with node -v

version required: node 18

if you have not node please check the docs nodejs.org/en to install it

Otherwise use nvm to update your node version

When node is ready run yarn to install all the dependencies

## To add a task

npx ts-node task add "Buy groceries"

## To update a task

npx ts-node task update 1 "Buy groceries and cook dinner"

## To delete a task

npx ts-node task delete 1

## To mark a task as in progress/done/todo

npx ts-node task mark-in-progress 1

npx ts-node task mark-done 1

npx ts-node task mark-todo 1

## To list all tasks

npx ts-node task list

npx ts-node task list done

npx ts-node task list todo

npx ts-node task list in-progress