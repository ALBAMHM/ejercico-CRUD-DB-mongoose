const express = require("express");
const router = express.Router();
const Task = require('../models/task'); 



router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem fetching the tasks' });
    }
});

// GET /id/:_id: Buscar tarea por id
router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem fetching the task' });
    }
});

// PUT /markAsCompleted/:_id: Marcar una tarea como completada /markAsCompleted/664f6643f28d38d47e61d401
router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true },
            { new: true, useFindAndModify: false }
        );
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem marking the task as completed' });
    }
});

// PUT /id/:_id: Actualizar solo el título de una tarea
router.put('/id/:_id', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || typeof title !== 'string') {
            return res.status(400).send({ message: 'Invalid title' });
        }
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { title },
            { new: true, useFindAndModify: false, runValidators: true }
        );
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem updating the task' });
    }
});

// DELETE /id/:_id: Eliminar una tarea
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id, { useFindAndModify: false });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.status(200).send({ message: 'Task successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem deleting the task' });
    }
});


router.post("/create", async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).send(task);
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a task" });
    }
});


module.exports = router;