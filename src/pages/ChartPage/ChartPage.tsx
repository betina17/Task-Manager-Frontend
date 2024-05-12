import { useContext } from 'react';
import { tasksContext } from '../../contexts/TasksContext';
import { BarChart } from '@mui/x-charts';
import { Layout } from '../../shared/components/layout/Layout';

export  function ChartPage() {
    const TasksContext = useContext(tasksContext)!;
    const TasksList = TasksContext.tasks;

    const durationMap = new Map<string, number>();

    TasksList.forEach((currentTask) => {
        durationMap.set(currentTask.getDescription(), currentTask.getApproximateDuration());
    });

    console.log(durationMap);

    return (
        <Layout>
            <BarChart
                xAxis={[
                    {
                        id: 'Duration',
                        data: [...durationMap.keys()],
                        scaleType: 'band',
                    },
                ]}
                series={[
                    {
                        data: [...durationMap.values()],
                    },
                ]}
                width={500}
                height={300}
            />
        </Layout>
    );
}