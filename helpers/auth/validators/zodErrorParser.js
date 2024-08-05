
import {z} from 'zod';

function zodParseErrors(error) {
    return error.errors.map(err => {
      return `Error in ${err.path.join('.')}: ${err.message}`;
    }).join('\n');
  }

export default zodParseErrors