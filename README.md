# Task Management Board

Task management board is an Angular application designed to help users manage their tasks efficiently. It provides a user-friendly interface with features such as task creation, drag-and-drop functionality, filtering, and more. This app is implemented by utilizing Angular's new reactive primitive, Angular Signals.

Production deployed app: [Task Management Board](https://task-management-board-tskobic.vercel.app/)

## Installing dependencies

Run `npm install` to fetch and install all the required libraries and project dependencies.

## Development server

Run `npm run start` or `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `npm run test` or `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `npm run build` or `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Legend
:white_check_mark: Implemented feature

:warning: Features that are not implemented

## Project Requirements

### Objective
Develop a task management board that allows users to manage tasks across different statuses. The board should include features such as drag-and-drop functionality, task creation, editing, and filtering.

### Project Features
1. **Task Board Layout:** :white_check_mark:
   - Create a task management board with multiple columns representing different task statuses, such as "To Do," "In Progress," and "Completed."

2. **Drag-and-Drop Functionality:** :white_check_mark: (Angular directives implemented as a wrapper for native HTML Drag and Drop API)
   - Implement drag-and-drop functionality to allow users to move tasks between different columns on the task board.
   - Use HTML5's native Drag and Drop API. 

3. **Add New Tasks:** :white_check_mark:
   - Enable users to add new tasks to the task board by providing an input field or a modal dialog.
   - When a task is added, it should appear in the appropriate column based on its status. 

4. **Edit and Delete Tasks:** :white_check_mark:
   - Allow users to edit task details, such as the task title or description, by clicking on the task.
   - Implement a delete option to remove tasks from the task board entirely.

5. **Task Details:** :white_check_mark:
   - Display additional information for each task, such as due date, priority, assigned team member, or any other relevant details. 
   - Include options to view the task details in a modal or an expanded view. 

6. **Task Filtering:** :white_check_mark:
   - Add filtering options to the task board to help users focus on specific tasks. 
   - Implement filters based on criteria like assigned team member, due date, or priority level.

7. **Local Storage:** :white_check_mark: (Angular storage service implemented that is using the 'typed-local-store' library, a lightweight wrapper for localStorage to provide type safe access)
   - Persist the task board data using the browser's local storage ( :white_check_mark: ) or IndexedDB. 
   - This will allow users to retrieve their task board even after closing or refreshing the page.

8. **Responsiveness:** :white_check_mark:
   - Ensure that the task management board is responsive and works well on different screen sizes and devices.
   - Use CSS media queries and flexible layouts to adapt to different viewports.

9. **Styling:** :white_check_mark:
   - Apply CSS styles to enhance the visual appeal of the task management board.
   - Use appropriate colors, typography, and layout techniques to create an intuitive and visually pleasing interface.

10. **Error Handling:** :white_check_mark:
    - Handle potential errors, such as invalid inputs or failed data storage, by providing appropriate error messages and fallback mechanisms.
    - Validate user inputs and handle any edge cases to ensure a smooth user experience.

11. **Accessibility:** :white_check_mark:
    - Consider accessibility guidelines by providing appropriate alt text for images, keyboard navigation support, and ensuring sufficient color contrast ( :warning: ) for users with visual impairments.

12. **Testing:** :white_check_mark: (Jasmine testing framework and Karma test runner)
    - Write automated tests using a testing framework like Mocha and Jasmine ( :white_check_mark: ) or a framework of your choice to verify the functionality of critical components.
    - Test task creation, drag-and-drop functionality, and data persistence to ensure the reliability of the task management board.
