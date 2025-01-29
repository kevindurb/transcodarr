import { URLPattern } from 'urlpattern-polyfill';
import '@material/web/all.js';

import './transcodarr-app.js';

// @ts-ignore: Property 'UrlPattern' does not exist
globalThis.URLPattern = URLPattern;
