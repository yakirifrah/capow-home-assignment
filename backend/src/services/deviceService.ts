import  { IDevice } from '../models/device';
import  deviceModel  from '../models/device'
export const getAllDevices = async (): Promise<IDevice[]> => {
  return deviceModel.find().lean();
};

export const createDevice = async (deviceData: Partial<IDevice>): Promise<IDevice> => {
  const newDevice = new deviceModel(deviceData);
  return newDevice.save();
};

export const updateDevice = async (id: string, deviceData: Partial<IDevice>): Promise<IDevice | null> => {
  return deviceModel.findByIdAndUpdate(id, deviceData, { new: true });
};

export const deleteDevice = async (id: string): Promise<void> => {
  await deviceModel.findByIdAndDelete(id);
};