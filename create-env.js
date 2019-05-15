const fs = require('fs')
fs.writeFileSync(
  './.env',
  `ApiKey=${process.env.ApiKey}
AuthDomain=${process.env.AuthDomain}
DatabaseURL=${process.env.DatabaseURL}
ProjectId=${process.env.ProjectId}
StorageBucket=${process.env.StorageBucket}
MessagingSenderId=${process.env.MessagingSenderId}
`
)
