import { Device } from "../../interfaces/device";
import { formatDate } from "../../utils/dateUtils";
import styles from "./DeviceTable.module.css"
interface DeviceTableProps {
	devices: Device[];
	onEdit: (device: Device) => void;
	onDelete: (id: string) => void;
}

function DeviceTable ({ devices, onEdit, onDelete }:DeviceTableProps)  {
	return (
		<table className={styles['device-table']}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Serial Number</th>
					<th>Creation Date</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{devices.map((device) => (
					<tr key={device._id}>
						<td>{device.name}</td>
						<td>{device.serialNumber}</td>
						<td>{formatDate(device.creationDate)}</td>
						<td className={styles['action-buttons']}>
							<button className={styles['edit-button']} onClick={() => onEdit(device)}>
								Edit
							</button>
							<button className={styles['delete-button']} onClick={() => onDelete(device._id)}>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default DeviceTable;