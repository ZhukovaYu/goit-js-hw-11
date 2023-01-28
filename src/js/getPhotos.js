import axios from 'axios';

export class ImagesApiService {
    static BASE_URL = `https://pixabay.com`;
    static KEY = '33171544-cc8bca5976e4efd67e6c1a08b';

    constructor() {
        // this.query = '';
        // this.page = 1;
        // this.per_page = 40;
        // this.loadedImages = 0;
    }
            
    async getPhotos(keyWord) {
        const options = {
            params: {
                key: ImagesApiService.KEY,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                pretty: 'true',
                page: this.page,
                per_page: this.per_page,
            },
        }
        try {
            const response = await axios.get(`${ImagesApiService.BASE_URL}/api/?q=${keyWord}`, options);
            return response;
            }
        catch (error) {
            console.error(error);
        }
    }
}