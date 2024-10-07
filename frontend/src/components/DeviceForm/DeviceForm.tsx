import { useState } from 'react';
import { Device } from './../../interfaces/device';
import styles from './DeviceForm.module.css'; // Import css modules stylesheet as styles

interface DeviceFormProps {
	onSave: (device: Pick<Device, 'name' | 'serialNumber' | 'creationDate'>) => void;
	initialData?: Partial<Device>; 
	onClose: () => void;
}

function DeviceForm({ onSave, initialData, onClose }: DeviceFormProps) {
  const [device, setDevice] = useState<Pick<Device, 'name' | 'serialNumber' | 'creationDate'>>({
		name: initialData?.name || '',
		serialNumber: initialData?.serialNumber || '',
		creationDate: initialData?.creationDate ? initialData.creationDate.split('T')[0] : new Date(),
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDevice({ ...device, [name]: value });
	};

  const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(device);
	};



	return (
		<div className={styles.modal}>
			<div className={styles['modal-content']}>
				<span className={styles.close} onClick={onClose}>
					&times;
				</span>
				<h2>{initialData ? 'Edit Device' : 'Add New Device'}</h2>
				<form onSubmit={handleSubmit}>
					<input name="name" value={device.name} onChange={handleChange} placeholder="Name" required />
					<input
						name="serialNumber"
						value={device.serialNumber}
						onChange={handleChange}
						placeholder="Serial Number"
						required
					/>
					<input
						type="date"
						name="creationDate"
						placeholder="MM/DD/YYYY"
						value={device.creationDate}
						onChange={handleChange}
						required
					/>
					<button type="submit">Save</button>
				</form>
			</div>
		</div>
	);
}
export default DeviceForm;
