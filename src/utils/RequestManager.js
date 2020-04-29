import { uploadImage } from '../components/ServiceManager/ServiceManager';

class RequestManager {

	uploadFiles = async(file) => {
		return await uploadImage(file)
	}

	fileUploading = async(files) => {
		let newFiles = files.map( async (value, index) => {
			if(typeof value == 'string'){
				return value;
			}
			return await this.uploadFiles(value)
		})

		return Promise.all(newFiles)
	}

	assignFiles = (files) => {
		let ans = {}, variables = {}
		ans = Object.keys(files).map ( async(key, index) => {
			return await this.fileUploading(files[key])
		})
		return Promise.all(ans)
	}
}

export const manager = new RequestManager()