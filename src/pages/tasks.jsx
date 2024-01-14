import { Helmet } from 'react-helmet-async';

import { TasksView } from 'src/sections/tasks/view';

// ----------------------------------------------------------------------

export default function TasksPage() {
  return (
    <>
      <Helmet>
        <title> Mes Taches </title>
      </Helmet>

      <TasksView />
    </>
  );
}
