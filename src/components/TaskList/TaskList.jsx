import { TaskItem } from '../';
import './TaskList.css';
const TaskList = ({ tasks, deleteTask,handleChangeStatus }) => {
    return (
        <ul className="TaskList">
            {tasks.map(task => (
                <TaskItem key={`task-${task.id}`} 
                task={task} 
                deleteTask={deleteTask}
                handleChangeStatus={handleChangeStatus}
                />
            ))}
        </ul>
    )
}
export default TaskList