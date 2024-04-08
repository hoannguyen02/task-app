import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { CreateTask } from './CreateTask';
import { TasksContextProvider } from './TasksContextProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';


/**
 * Routing tasks, create-task using react router dom, https://www.npmjs.com/package/react-router-dom
 * Add polaris https://www.npmjs.com/package/@shopify/polaris
 * polaris icons: https://www.npmjs.com/package/@shopify/polaris-icons
 * Tailwind: https://tailwindcss.com/docs/guides/create-react-app
 * Basic UI tasks
 * Add react hook form for create task
 * Add react confetti for  success message
 * Retrieve/mutate data to/from storage 
 * Drag & drop
 * Tour guide
 * Finalize UI if have time

 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/tasks',
    element: <App />,
  },
  {
    path: '/create-task',
    element: <CreateTask />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode> // check later when have time
    <AppProvider i18n={enTranslations}>
      <TasksContextProvider>
        <RouterProvider router={router} />
      </TasksContextProvider>
    </AppProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
