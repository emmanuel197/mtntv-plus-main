// The operators (TVAnywhere "tenants") this app can sign people in under.
// List copied from AfriPlay Ghana (afriplay-ghana-revamp/src/utils/operators.js) — same servers.
// .env.local picks one by name (VITE_OPERATOR_UID); everything else about it comes from here:
//   operator_id      the operator's number on the server
//   operator_uid     its name, sent with every CRM call (?operator_uid=…)
//   username_prefix  put in front of the phone number to make the account name (amngh0244123456)
// MTN TV+ uses AfriPlay MTN Ghana's until the PM gives us MTN TV+'s own — add it here when it comes.
import { env } from './env.js'

const OPERATORS = {
  afriplayglobal: {
    operator_id: '234',
    operator_uid: 'afriplayglobal',
    username_prefix: 'afp',
    country: '',
    api_url: 'https://ott.tvanywhereafrica.com:28182',
  },

  afriplayghana: {
    operator_id: '235',
    operator_uid: 'afriplayghana',
    username_prefix: 'afpgh',
    country: 'Ghana (gh)',
    api_url: 'https://ott.tvanywhereafrica.com:28182',
  },

  afriplaymtnghana: {
    operator_id: '237',
    operator_uid: 'afriplaymtnghana',
    username_prefix: 'amngh',
    country: 'Ghana (gh)',
    api_url: 'https://ott.tvanywhereafrica.com:28182',
  },

  afriplaynigeria: {
    operator_id: '236',
    operator_uid: 'afriplaynigeria',
    username_prefix: 'afpng',
    country: 'Nigeria (ng)',
    api_url: 'https://ott.tvanywhereafrica.com:28182',
  },
}

const DEFAULT_OPERATOR = 'afriplaymtnghana'

if (env.operatorUid && !OPERATORS[env.operatorUid]) {
  console.warn(`Unknown VITE_OPERATOR_UID "${env.operatorUid}" — using ${DEFAULT_OPERATOR}. Add it to app-settings/operators.js.`)
}

// The operator this app runs as
export const operator = OPERATORS[env.operatorUid] ?? OPERATORS[DEFAULT_OPERATOR]

export default OPERATORS
