package com.task.manager;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class TaskService {

	private final TaskRepository taskRepository;

	public TaskService(TaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}

	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	public Task addTask(Task task) {
		return taskRepository.save(task);
	}

	public Task updateTask(Long id, Task taskDetails) {
		return taskRepository.findById(id)
				.map(task -> {
					task.setTitle(taskDetails.getTitle());
					task.setDescription(taskDetails.getDescription());
					task.setCompleted(taskDetails.isCompleted());
					return taskRepository.save(task);
				})
				.orElseThrow(() -> new RuntimeException("Task not found."));
	}
	
	public void deleteTask(Long id) {
		taskRepository.deleteById(id);
	}
}
