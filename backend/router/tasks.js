const express = require('express');
const router = express.Router();
const connection = require("../db");
const moment = require('moment');

function generateId() {
    const maxId = 999999999;
    const minId = 100000000;
    const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    return id;
}
// Middleware สำหรับการเชื่อมต่อกับฐานข้อมูล
router.use(async (req, res, next) => {
    try {
        // Implement your database connection logic here if needed
        next();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route สำหรับสร้าง Task
router.post('/createTasks', async (req, res) => {
    try {
        const {
            task_id,
            task_name,
            tasks_detail,
            task_status,
            screen_id,
            project_id,
            system_id,
            task_plan_start,
            task_plan_end,
        } = req.body;

        const id = generateId(); // หากใช้ฟังก์ชัน generateId() สำหรับสร้าง ID

        const query =
            'INSERT INTO Tasks (id, task_id, task_name, tasks_detail, task_status, screen_id, project_id, system_id, task_plan_start, task_plan_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

        await new Promise((resolve, reject) => {
            connection.query(
                query,
                [
                    id,
                    task_id,
                    task_name,
                    tasks_detail,
                    task_status,
                    screen_id,
                    project_id,
                    system_id,
                    task_plan_start,
                    task_plan_end,
                ],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });

        res.send('Task created successfully');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const query = 'SELECT * FROM Tasks';

        const results = await new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) reject(err);
                resolve(results.map(task => ({
                    ...task,
                    task_plan_start: moment(task.task_plan_start).format('YYYY-MM-DD'),
                    task_plan_end: moment(task.task_plan_end).format('YYYY-MM-DD'),
                    task_actual_start: moment(task.task_actual_start).format('YYYY-MM-DD HH:mm:ss'),
                    task_actual_end: moment(task.task_actual_end).format('YYYY-MM-DD HH:mm:ss'),
                    task_manday: moment.duration(moment(task.task_plan_end).diff(moment(task.task_plan_start))).asDays()
                })));
            });
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/getOne/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'SELECT * FROM Tasks WHERE id = ?';

        const task = await new Promise((resolve, reject) => {
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });

        if (task.length === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            // Format task_plan_start and task_plan_end
            task[0].task_plan_start = moment(task[0].task_plan_start).format('YYYY-MM-DD');
            task[0].task_plan_end = moment(task[0].task_plan_end).format('YYYY-MM-DD');
            // Format task_actual_start and task_actual_end
            task[0].task_actual_start = moment(task[0].task_actual_start).format('YYYY-MM-DD HH:mm:ss');
            task[0].task_actual_end = moment(task[0].task_actual_end).format('YYYY-MM-DD HH:mm:ss');

            res.json(task[0]);
        }
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Route สำหรับอัปเดตข้อมูล Task
router.put('/updateTasks/:id', async (req, res) => {
    try {
        const {
            task_name,
            task_status,
            tasks_detail,
            task_progress,
            task_plan_start,
            task_plan_end,
            task_actual_start,
            task_actual_end,
        } = req.body;

        const { id } = req.params; // แก้ตรงนี้ให้ใช้ id แทน task_id

        const updatedTaskFields = {};

        // Check and add task_name if provided
        if (task_name !== undefined) {
            updatedTaskFields.task_name = task_name;
        }

        // Check and add task_status if provided
        if (task_status !== undefined) {
            updatedTaskFields.task_status = task_status;
        }

        // Check and add tasks_detail if provided
        if (tasks_detail !== undefined) {
            updatedTaskFields.tasks_detail = tasks_detail;
        }

        // Check and add task_progress if provided
        if (task_progress !== undefined) {
            updatedTaskFields.task_progress = task_progress;
        }

        // Check and add task_plan_start if provided
        if (task_plan_start !== undefined) {
            updatedTaskFields.task_plan_start = task_plan_start;
        }

        // Check and add task_plan_end if provided
        if (task_plan_end !== undefined) {
            updatedTaskFields.task_plan_end = task_plan_end;
        }

        // Check and add task_actual_start if provided
        if (task_actual_start !== undefined) {
            updatedTaskFields.task_actual_start = task_actual_start;
        }

        // Check and add task_actual_end if provided
        if (task_actual_end !== undefined) {
            updatedTaskFields.task_actual_end = task_actual_end;
        }

        if (Object.keys(updatedTaskFields).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        const query = 'UPDATE Tasks SET ? WHERE id = ?'; // แก้ SQL query ให้ใช้ id แทน task_id

        await new Promise((resolve, reject) => {
            connection.query(query, [updatedTaskFields, id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('Task updated successfully');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Route สำหรับลบ Task
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM Tasks WHERE id = ?';

        await new Promise((resolve, reject) => {
            connection.query(query, [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        res.send('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;