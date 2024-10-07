import { useState, useEffect } from 'react';
import DeviceTable from '../../components/DeviceTable/DeviceTable';
import DeviceForm from '../../components/DeviceForm/DeviceForm';
import { Device } from './../../interfaces/device';
import axios from 'axios';
import { apis } from '../../conf/constants';
import { cleanUpdateData } from './../../utils/cleanUpdateData';

import styles from './Dashboard.module.css';
function Dashboard() {
	const [devices, setDevices] = useState<Device[]>([]);
	const [editingDevice, setEditingDevice] = useState<Device | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const fetchDevices = async () => {
		try {
			const response = await axios.get(apis.GET_ALL_DEVICE);
			setDevices(response.data);
			setError(null);
		} catch (err) {
			setError('Failed to load devices. Please try again later.' + err.message);
		}
	};

	const handleSave = async (deviceData: Pick<Device, 'name' | 'serialNumber' | 'creationDate'>) => {
		try {
			if (editingDevice?._id) {
				const updatedFields = cleanUpdateData(editingDevice, deviceData);
				await axios.put(apis.UPDATE_DEVICE(editingDevice._id), updatedFields);
			} else {
				await axios.post(apis.CREATE_DEVICE, deviceData);
			}
			setEditingDevice(null);
			setIsModalOpen(false);
			fetchDevices();
		} catch (err) {
			setError('Failed to save the device. Please check the data and try again.' + err.message);
		}
	};
	const openModal = (device?: Device) => {
		setEditingDevice(device || null);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setEditingDevice(null);
		setIsModalOpen(false);
	};

	const handleDelete = async (id: string) => {
		try {
			await axios.delete(apis.DELETE_DEVICE(id));
			fetchDevices();
		} catch (err) {
			setError('Failed to delete the device. Please try again later.' + err.message);
		}
	};

	useEffect(() => {
		fetchDevices();
	}, []);

	return (
		<div className={styles['dashboard-container']}>
			<div className={styles['dashboard-header']}>
				<h1>Device Dashboard</h1>
				<button className={styles['add-device-button']} onClick={() => openModal()}>
					Add New Device
				</button>
			</div>
			{error && <p className={styles['dashboard-error']}>{error}</p>}
			<DeviceTable devices={devices} onEdit={openModal} onDelete={handleDelete} />

			{isModalOpen && <DeviceForm onSave={handleSave} initialData={editingDevice} onClose={closeModal} />}
		</div>
	);
}

export default Dashboard;
