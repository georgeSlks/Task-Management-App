# Task Management Application ( STILL IN PROGRESS )
React Js - Fast API - PostgreSQL

A minimalist task management app built with React-Vite, FastAPI and PostgreSQL. This app allows users to add, edit, delete, and manage tasks with functionalities like filtering, priority management, and due date tracking.

## Features

### 1. **Task Creation**
- Users can create new tasks by entering a title, description, due date, and priority (Normal, Important, Urgent).

### 2. **Task Editing**
- Users can edit the task title, description, due date, and priority after creation.

### 3. **Task Deletion**
- Tasks can be deleted from the list when no longer needed.

### 4. **Task Completion Toggle**
- Tasks can be marked as completed. The UI will show a strike-through effect for completed tasks.

### 5. **Search Functionality**
- Users can search for tasks by title using the search bar. The task list updates in real-time based on the search term.

### 6. **Task Grouping by Priority**
- Tasks are grouped into categories based on their priority: 
    - Urgent (pink)
    - Important (orange)
    - Normal (white)

### 7. **Filter Tasks by Priority**
- Users can filter tasks based on their priority using filter buttons (Urgent, Important, Normal). Only tasks of the selected priority are displayed.

### 8. **Task Due Date Handling**
- Tasks that are past their due date are highlighted with a "past-due" class. Users can see overdue tasks (red outline).

### 9. **Local Storage**
- Tasks are saved to the browser's local storage to persist between sessions. Tasks will be automatically loaded and saved when the app is opened and modified.

![image](https://github.com/user-attachments/assets/aaf7299d-4505-418e-8092-f83d2ffcfd81)
![image](https://github.com/user-attachments/assets/03e0b94e-3c4d-448a-8c73-602f4b22f7f9)



