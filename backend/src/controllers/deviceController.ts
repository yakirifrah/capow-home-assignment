import { Request, Response } from 'express'
import * as DeviceService from '../services/deviceService'
import * as DeviceSchema from '../validators/deviceSchema'
import { IDevice } from '../models/device'

function validateDevice(device: Partial<IDevice>, type: string) {
  let err = null
  switch (type) {
    case 'CREATE': {
      let { error } = DeviceSchema.createDeviceSchema.validate(device)
      err = error
      break
    }
    case 'UPDATE': {
      let { error } = DeviceSchema.updateDeviceSchema.validate(device)
      err = error
      break
    }
    default:
      break
  }
 if (err) {
    throw new Error(err.details[0].message);
  }
}

export const getDevices = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const devices = await DeviceService.getAllDevices()
    return res.json(devices)
  } catch (error: any) {
    return res.status(500).json({ error: error.message, status: 'failed' })
  }
}

export const createDevice = async (req: Request, res: Response): Promise<Response> => {
  try {
    validateDevice(req.body, 'CREATE')
    const newDevice = await DeviceService.createDevice(req.body)
    return res.status(201).json(newDevice)
  } catch (error) {
    return res.status(400).json({ error: error.message, status: 'failed' })
  }
}

export const updateDevice = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    validateDevice(req.body, 'UPDATE')
    const updatedDevice = await DeviceService.updateDevice(id, req.body)
    if (!updatedDevice) {
      return res.status(404).json({ message: 'Device not found', status: 'failed' })
    } else {
      return res.json(updatedDevice)
    }
  } catch (error) {
    return res.status(400).json({ error: error.message, status: 'failed' })
  }
}

export const deleteDevice = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    await DeviceService.deleteDevice(id)
    return res.json({message: `device ${id} deleted`})
  } catch (error) {
    return res.status(500).json({ error: error.message, status: 'failed' })
  }
}
