import { flushSync } from 'svelte';
import { expect, test } from 'vitest';
import { addTask, removeLast, removeFirst, loadTasks, sortTasks} from './tasks.svelte.js';

// Check the add task function
test('Add Task', () => {
    // Add task to list
	let tasks = ["Task 1"]

    addTask(tasks, "Task 2")

    expect(tasks).toEqual(["Task 1", "Task 2"])

    // Add task to list and sort
    tasks = ["Task 2"]

    addTask(tasks, "Task 1")

    sortTasks(tasks)

    expect(tasks).toEqual(["Task 1", "Task 2"])
});

// Check the function that removes the last element of the list
test('Remove Last', () => {
    // Basic Test
	let tasks = ["Task 1", "Task 2", "Task 3"]

    removeLast(tasks)

    expect(tasks).toEqual(["Task 1", "Task 2"])

    // The empty task check
    tasks = []

    removeLast(tasks)

    expect(tasks).toEqual([])

    // One-item task list
    tasks = ["Task 1"]

    removeLast(tasks)

    expect(tasks).toEqual([])
});

// Check the function that removes the first element of the list
test('Remove First', () => {
	// Check the basic case
    let tasks = ["Task 1", "Task 2", "Task 3"]

    removeFirst(tasks)

    expect(tasks).toEqual(["Task 2", "Task 3"])

    // Empty list
    tasks = []

    removeFirst(tasks)

    expect(tasks).toEqual([])

    // One-item task list
    tasks = ["Task 1"]

    removeFirst(tasks)

    expect(tasks).toEqual([])
});

test('Load Tasks', () => {
	// Basic case, empty list
    let tasks = []

    loadTasks(tasks)

    expect(tasks).toEqual(["Task 1", "Task 2", "Task 3", "Task 4"])

    // List already has items in it
    let tasks = ["Task 1", "Task 2"]

    loadTasks(tasks)

    expect(tasks).toEqual(["Task 1", "Task 2", "Task 3", "Task 4"])
});

test('Sort Tasks', () => {
	// Basic Case
    let tasks = ["Task 2", "Task 1", "Task 3"]

    sortTasks(tasks)

    expect(tasks).toEqual(["Task 1", "Task 2", "Task 3"])

    // Empty list
    let tasks = []

    sortTasks(tasks)

    expect(tasks).toEqual([])

    // Pre-sorted list
    let tasks = ["Task 1", "Task 2", "Task 3"]

    sortTasks(tasks)

    expect(tasks).toEqual(["Task 1", "Task 2", "Task 3"])

});