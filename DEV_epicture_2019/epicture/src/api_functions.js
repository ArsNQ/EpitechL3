import {HTTP} from './http-common';

export default {
  // Bases

  getProfile: username => {
    return HTTP.get(`/account/${username}`);
  },
  getGallery: filter => {
    return HTTP.get(`/gallery/${filter}`);
  },
  uploadImage: (data, token) => {
    return HTTP.post('/image/', data, {
      headers: {Authorization: 'Bearer ' + token},
    });
  },
  voteImage: (token, imageId, vote) => {
    return HTTP.post(`gallery/image/${imageId}/vote/${vote}`, undefined, {
      headers: {Authorization: 'Bearer ' + token},
    });
  },
  getAccountImages: (username, page) => {
    return HTTP.get(`account/${username}/images/${page}`);
  },
  search: data => {
    return HTTP.get('/gallery/search', {
      params: {q: data.query, page: data.page},
    });
  },
};
