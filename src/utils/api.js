import store from 'store';
import { alertShow } from 'actions/alertActions';

function api () {
    const API_KEY = '26c374c770dc49702c16c6fdf0ac60c9';

    return {
        get
    };

    //////////////
    function get (method, queries) {
        return fetch(`https://api.flickr.com/services/rest/?method=flickr.${method}${queries}&safe_search=1&api_key=${API_KEY}&format=json&nojsoncallback=1`)
        .then(resp => resp.json())
        .then(resp => {
            if (resp.code) {
                store.dispatch(alertShow(resp.message));
            }
            
            return resp;
        })
        .catch((err) => {
            throw new Error(err);
        })
    }
}

export default api();
