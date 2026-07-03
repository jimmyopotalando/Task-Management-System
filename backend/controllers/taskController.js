import Task from '../models/Task.js';

// CREATE TASK
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      user: req.user._id
    });

    res.status(201).json({
      success: true,
      task
    });

  } catch (error) {
    next(error);
  }
};

// GET ALL TASKS
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.json({
      success: true,
      tasks
    });

  } catch (error) {
    next(error);
  }
};

// GET TASK BY ID
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      task
    });

  } catch (error) {
    next(error);
  }
};

// UPDATE TASK
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();

    res.json({
      success: true,
      task: updatedTask
    });

  } catch (error) {
    next(error);
  }
};

// DELETE TASK
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.deleteOne(); // ✅ modern replacement for remove()

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};