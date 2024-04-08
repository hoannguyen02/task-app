import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Task = {
  title: string;
  description: string;
};

type TasksContextValues = {
  tasks: Task[];
  onAdd(task: Task): void;
  reorder(start: number, end: number): void;
};

const TasksContext = createContext<TasksContextValues>({
  tasks: [],
  onAdd(task) {},
  reorder(start, end) {},
});

const TASKS_STORAGE_KEY = 'tasks_key';

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const jsonTasks = localStorage.getItem(TASKS_STORAGE_KEY);
      if (jsonTasks) {
        const newTasks = JSON.parse(jsonTasks);
        setTasks(newTasks || []);
      }
    } catch (error) {}
  }, []);

  const onAdd = useCallback(
    (task: Task) => {
      const newTasks = structuredClone(tasks);
      newTasks.push(task);
      setTasks(newTasks);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
    },
    [tasks]
  );

  const reorder = useCallback(
    (startIndex: number, endIndex: number) => {
      const newTasks = structuredClone(tasks);
      const [removed] = newTasks.splice(startIndex, 1);
      newTasks.splice(endIndex, 0, removed);
      setTasks(newTasks);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
    },
    [tasks]
  );

  const value = useMemo(() => {
    return {
      tasks,
      onAdd,
      reorder,
    };
  }, [onAdd, reorder, tasks]);

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
