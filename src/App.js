/* eslint-disable no-unused-vars */
/** @format */

import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import { useState } from 'react';
import {
	Button,
	Card,
	Checkbox,
	Input,
	List,
	Space,
	Tabs,
	message,
} from 'antd';

function App() {
	const [tasks, setTasks] = useState([]);
	const [taskContent, setTaskContent] = useState('');
  const [tabKey, setTabKey] = useState('');

	const handleAddNewTask = () => {
		if (!taskContent) {
			message.error('What is your task?');
		}

		setTasks([
			...tasks,
			{
				content: taskContent,
				isCompleted: false,
			},
		]);

		setTaskContent('');
	};

	const handleUpdateActiveTask = (item, index) => {
		item.isCompleted = !item.isCompleted;

		const items = [...tasks];

		items[index] = item;

		setTasks(items);
	};

  const handleRemoveTask = (index) => {
    const items = [...tasks]
    items.splice(index, 1)

    setTasks(items)
  }

	const renderTaskItem = (item, index) => (
		<List.Item  extra={tabKey === 'completed' ? <Button onClick={() => handleRemoveTask(index)} type='text'>del</Button> : null}
			key={`task${index}`}
			style={{
				padding: '8px 0',
			}}>
       
          <Checkbox
				onClick={() => handleUpdateActiveTask(item, index)}
				checked={item.isCompleted}>
          
				<p
					style={{
						color: item.isCompleted ? '#e0e0e0' : '#212121',
						margin: 0,
					}}>
					{item.content}
				</p>
			</Checkbox>
        
			
		</List.Item>
	);

	const handleRemoveItemComplted = () => {
		const items = [...tasks];
		const itemsActive = items.filter((element) => !element.isCompleted);

		setTasks(itemsActive);
	};

	const tabs = [
		{
			key: 'all',
			label: 'All',
			children: (
				<>
					<div className='text-center'>
						<Space.Compact>
							<Input
								required
								placeholder='What do you want?'
								style={{ width: '100%' }}
								allowClear
								value={taskContent}
								onChange={(val) => setTaskContent(val.target.value)}
							/>
							<Button onClick={handleAddNewTask} type='primary'>
								Add
							</Button>
						</Space.Compact>
					</div>

					{tasks.length > 0 &&
						tasks.map((item, index) => renderTaskItem(item, index))}
				</>
			),
		},
		{
			key: 'active',
			label: 'Active',
			children: (
				<>
					{tasks.length > 0 &&
						tasks.map(
							(item, index) =>
								item.isCompleted === false && renderTaskItem(item, index)
						)}
				</>
			),
		},
		{
			key: 'completed',
			label: 'Completed',
			children: (
				<>
					{tasks.length > 0 &&
						tasks.map(
							(item, index) => item.isCompleted && renderTaskItem(item, index)
						)}

					<div className='row mt-4'>
						<div className='text-center'>
							<Button type='primary' danger onClick={handleRemoveItemComplted}>
								Clear All
							</Button>
						</div>
					</div>
				</>
			),
		},
	];

	return (
		<div className='container mt-4'>
			<Tabs items={tabs} centered  onChange={val => setTabKey(val)}/>
		</div>
	);
}

export default App;
