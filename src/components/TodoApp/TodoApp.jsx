import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    AddTaskForm,
    TaskList,
    FilterFooter
} from '../index';
import './TodoApp.css';
const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [refresh, setRefresh] = useState(0)
    useEffect(() => {
        setTasks([
            {
                id: uuidv4(),
                title: 'Default Task',
                status: true,//Boolean
            },
            {
                id: uuidv4(),
                title: 'Default Task Number2',
                status: true,//Boolean
            }
        ])
    }, [])

    useEffect (()=>{
        let storedTasks = localStorage.getItem('tasks');
        if(storedTasks){
            storedTasks=JSON.parse(storedTasks);
        }else{
            storedTasks = []
        }
        setTasks(storedTasks);
    },[])
    useEffect(() => {
        // console.log('Filter : ', filter, tasks);
        if (filter === 'all') {
            setFilteredTasks(tasks)
        }
        if (filter === 'completed') {
            const newCompletedFilteredTasks = tasks.filter(task => task.status)
            setFilteredTasks(newCompletedFilteredTasks)
        }
        if (filter === 'active') {
            const newActiveFilteredTasks = tasks.filter(task => !task.status)
            setFilteredTasks(newActiveFilteredTasks)
        }
    }, [filter, tasks, refresh])

    const addTask = (taskTitle) => {
        const newTasks = [
            ...tasks,
            {
                id: uuidv4(),
                title: taskTitle,
                status: false
            }
        ]
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks))
    }

    const deleteTask = (taskId) => {
        let newTaskList = tasks;
        delete newTaskList[tasks.findIndex((task) => task.id === taskId)];
        newTaskList = newTaskList.filter((item) => item);
        setTasks(newTaskList);
        localStorage.setItem('tasks', JSON.stringify(newTaskList))
    }
    const handleChangeStatus = (taskId) => {
        let newTaskList = tasks;
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        newTaskList[taskIndex].status = !newTaskList[taskIndex].status;
        setTasks(newTaskList);
        setRefresh(refresh + 1)
    }
    return (
        <div className="TodoApp">
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={filteredTasks}
                deleteTask={deleteTask}
                handleChangeStatus={handleChangeStatus}
            />
            <FilterFooter tasks={tasks} updateFilter={setFilter} />
        </div>
    )
}

export default TodoApp;